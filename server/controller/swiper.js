const Router = require('express')
const formidable = require('formidable')
const router = Router()
const db = require('../model/db.js')

// 获取轮播列表
router.get('/swiper', function (req, res, next) {
  db.n_swiper.find().sort({'_id': -1}).exec((err, result) => {
    if (err) {
      res.json({code: 500, data: err, msg: '服务器错误'})
      return
    }
    let list = []
    let tempJson = {}
    result.forEach((v, i) => {
      tempJson = {}
      tempJson['url'] = 'http://' + req.headers.host + '/' + result[i].img
      tempJson['img'] = '../' + result[i].img
      tempJson['name'] = result[i].name
      tempJson['updateTime'] = result[i].updateTime
      tempJson['createTime'] = result[i].createTime
      tempJson['__v'] = result[i].__v
      tempJson['_id'] = result[i]._id
      list[i] = tempJson
    })

    res.json({code: 200, data: list, msg: '获取轮播成功'})
  })
})

// 添加轮播
router.post('/swiper', function (req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({code: 500, data: err, msg: '服务器错误'})
      return
    }
    // console.log(fields)
    if (!fields.name) {
      res.json({code: 400, data: 'name参数缺少', msg: 'name参数缺少'})
      return
    }
    if (!fields.img) {
      res.json({code: 400, data: 'img参数缺少', msg: 'img参数缺少'})
      return
    }
    let name = fields.name
    let img = fields.img
    new db.n_swiper({'name': name, 'img': img}).save(function (err) {
      if (err) {
        res.json({code: 500, data: err, msg: '服务器错误'})
        return
      }
      res.json({code: 200, msg: '添加轮播成功', data: '添加轮播成功'})
    })
  })
})

// 修改轮播
router.put('/swiper', function (req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({code: 500, data: err, msg: '服务器错误'})
      return
    }
    // console.log(fields)
    if (!fields.id) {
      res.json({code: 400, data: '缺少参数:id', msg: '缺少参数:id'})
      return
    }
    if (!fields.name) {
      res.json({code: 400, data: '缺少参数:name', msg: '缺少参数:name'})
      return
    }
    if (!fields.img) {
      res.json({code: 400, data: '缺少参数:img', msg: '缺少参数:img'})
      return
    }
    let name = fields.name
    let img = fields.img
    let id = fields.id
    db.n_swiper.update({ '_id': id }, {$set: {'name': name, 'img': img}}, function (err, result) {
      if (err) {
        res.json({code: 500, data: err, msg: '服务器错误'})
        return
      }
      // console.log(result)
      res.json({code: 200, data: '修改成功', msg: '修改成功'})
    })
  })
})

router.delete('/swiper', function (req, res, next) {
  if (!req.query.id) {
    res.json({code: 400, data: '参数缺少: id', msg: '参数缺少: id'})
    return
  }
  let ids = req.query.id
  for (let i of ids) {
    db.n_swiper.remove({'_id': i}, function (err, result) {
      if (err) {
        res.json({code: 500, data: err, msg: '服务器错误'})
        return
      }
    })
  }
  res.json({code: 200, data: '删除成功', msg: '删除成功'})
})
module.exports = router
