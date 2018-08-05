const Router = require('express')
const formidable = require('formidable')
const moment = require('moment')
moment.locale('zh-cn')
const router = Router()
const db = require('../model/db.js')

// 商品查询
router.get('/goods', function (req, res, next) {
  let limit = req.query.limit || 10
  let current_page = req.query.current_page || 1
  let categoryId = {}
  if (req.query.categoryId) {
    categoryId['categoryId'] = req.query.categoryId
  }
  current_page -= 1
  let data = {}
  // 查询总数
  db.n_goods.find(categoryId).count().exec((err, count) => {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' })
      return
    }
    data.total = count
    data.limit = limit
    // 获取列表
    db.n_goods.find(categoryId).sort({ '_id': -1 }).skip(current_page * limit).limit(limit).exec((err, result) => {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' })
        return
      }

      let list = []
      let tempJson = {}
      result.forEach((v, i) => {
        tempJson = {}
        tempJson['createTime'] = moment(result[i].createTime).format('YYYY-MM-DD HH:mm:ss')
        tempJson['_id'] = result[i]._id
        tempJson['name'] = result[i].name
        tempJson['img'] = result[i].img
        tempJson['content'] = result[i].content
        tempJson['hot'] = result[i].hot
        tempJson['categoryId'] = result[i].categoryId
        tempJson['updateTime'] = result[i].updateTime
        tempJson['__v'] = result[i].__v
        list[i] = tempJson
      })
      data.current_page = current_page + 1
      data.data = list
      res.json({ code: 200, data: data, msg: '获取商品列表成功' })

    })
  })
})

// 小程序端商品筛选
router.get('/wxgoods', function (req, res, next) {
  let limit = req.query.limit*1 || 10
  let current_page = req.query.current_page*1 || 1
  let hot = req.query.hot || 0
  let _id = req.query.time || 0
  let categoryId = {}
  if (req.query.categoryId) {
    categoryId['categoryId'] = req.query.categoryId
  }
  let sort = { '_id': -1 }
  let data = {}

  if (hot) {
    sort = { hot }
  } else if (_id) {
    sort = { _id }
  }

  db.n_goods.find(categoryId).sort(sort).skip((current_page - 1) * limit).limit(limit).exec((err, result) => {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' })
      return
    }
    let list = []
    let tempJson = {}
    if (result.length > 0) {
      result.forEach((v, i) => {
        tempJson = {}
        tempJson['createTime'] = moment(result[i].createTime).format('YYYY-MM-DD HH:mm:ss')
        tempJson['_id'] = result[i]._id
        tempJson['name'] = result[i].name
        tempJson['img'] = result[i].img
        tempJson['content'] = result[i].content
        tempJson['hot'] = result[i].hot
        tempJson['categoryId'] = result[i].categoryId
        tempJson['updateTime'] = result[i].updateTime
        tempJson['__v'] = result[i].__v
        list[i] = tempJson
      })
    }

    data.current_page = current_page
    data.limit = limit
    data.data = list
    res.json({ code: 200, data: data, msg: '获取商品列表成功' })

  })
})

// 添加商品
router.post('/goods', function (req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' })
      return
    }
    console.log(fields)
    console.log(files)
    if (!fields.name) {
      res.json({ code: 400, data: '缺少参数:name', msg: '缺少参数:name' })
      return
    }
    if (!fields.img) {
      res.json({ code: 400, data: '缺少参数:img', msg: '缺少参数:img' })
      return
    }
    if (!fields.content) {
      res.json({ code: 400, data: '缺少参数:content', msg: '缺少参数:content' })
      return
    }
    if (!fields.categoryId) {
      res.json({ code: 400, data: '缺少参数:categoryId', msg: '缺少参数:categoryId' })
      return
    }
    let name = fields.name
    let img = JSON.parse(fields.img)
    let content = fields.content
    let categoryId = fields.categoryId
    console.log(img)
    // 验证名字是否一样
    db.n_goods.find({ 'name': name }).count().exec((err, count) => {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' })
        return
      }
      if (count !== 0) {
        res.json({ code: 400, data: '商品名称重复', msg: '商品名称重复' })
        return
      }
      // 创建商品
      new db.n_goods({ 'name': name, 'img': img, 'content': content, 'hot': 0, 'categoryId': categoryId }).save(function (err) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' })
          return
        }
        res.json({ code: 200, msg: '添加商品成功', data: '添加商品成功' })
      })
    })
  })
})

// 修改商品
router.put('/goods', function (req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' })
      return
    }
    // console.log(fields)
    if (!fields.id) {
      res.json({ code: 400, data: '缺少参数:id', msg: '缺少参数:id' })
      return
    }
    if (!fields.name) {
      res.json({ code: 400, data: '缺少参数:name', msg: '缺少参数:name' })
      return
    }
    if (!fields.img) {
      res.json({ code: 400, data: '缺少参数:img', msg: '缺少参数:img' })
      return
    }
    if (!fields.content) {
      res.json({ code: 400, data: '缺少参数:content', msg: '缺少参数:content' })
      return
    }
    if (!fields.categoryId) {
      res.json({ code: 400, data: '缺少参数:categoryId', msg: '缺少参数:categoryId' })
      return
    }
    let name = fields.name
    let img = fields.img
    let content = fields.content
    let categoryId = fields.categoryId
    let id = fields.id
    db.n_goods.update({ '_id': id }, { $set: { 'name': name, 'img': img, 'content': content, 'categoryId': categoryId } }, function (err, result) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' })
        return
      }
      // console.log(result)
      res.json({ code: 200, data: '修改成功', msg: '修改成功' })
    })
  })
})

// 删除商品
router.delete('/goods', function (req, res, next) {
  if (!req.query.id) {
    res.json({ code: 400, data: '参数缺少: id', msg: '参数缺少: id' })
    return
  }
  let ids = req.query.id
  console.log(req.query)
  for (let i of ids) {
    db.n_goods.remove({ '_id': i }, function (err, result) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' })
        return
      }
    })
  }
  res.json({ code: 200, data: '删除成功', msg: '删除成功' })
})

// 获取商品详情
router.get('/goods/detail', function (req, res, next) {
  let id = req.query.id
  if (!id) {
    res.json({ code: 400, data: '缺少参数:id', msg: '缺少参数:id' })
    return
  }

  db.n_goods.find({ '_id': id }, function (err, result) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' })
      return
    }
    res.json({ code: 200, data: result, msg: '商品详情获取成功' })
    db.n_goods.update({ '_id': id }, { $set: { hot: result[0].hot + 1 } }, function (err1, result1) { })
  })
})
module.exports = router
