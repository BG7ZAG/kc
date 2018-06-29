const Router = require('express')
const formidable = require('formidable')

const router = Router()
const db = require('../model/db.js')

/* 后台分类列表 listing. */
router.get('/category', function (req, res, next) {
  let limit = req.query.limit || 10
  let current_page = req.query.current_page || 1
  current_page -= 1
  let data = {}
  // 获取分类数量
  db.n_categorie.find().count().exec((err, count) => {
    if (err) {
      res.json({code: 500, data: err, msg: '服务器错误'})
      return
    }
    data.total = count
    data.limit = limit

    // 获取分类列表
    db.n_categorie.find().sort({'_id': -1}).exec((err, result) => {
      if (err) {
        res.json({code: 500, data: err, msg: '服务器错误'})
        return
      }
      // console.log(result)
      if (result.length === 0) {
        res.json({code: 400, data: '没有数据', msg: '没有数据'})
        return
      }
      let len = result.length - 1
      let results = result

      // 获取分类商品条数
      categorieNumber(len)
      function categorieNumber (i) {
        db.n_goods.find({'categoryId': result[i]._id}, function (err, result1) {
          if (err) {
            res.json({code: 500, data: err, msg: '服务器错误'})
            return
          }
          results[i].goods_num = result1.length
          results[i].img = '../' + results[i].img
          if (i != 0) {
            i--
            categorieNumber(i)
          } else {
            data.category = results
            data.current_page = current_page + 1
            res.json({code: 200, data: data, msg: '获取列表成功'})
          }
        })
      }
    })
  })

})

// 添加、编辑分类
router.post('/addCategory', function (req, res, next) {
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
    if (fields.id) {
      let id = fields.id
      // 更新分类
      db.n_categorie.update({ '_id': id }, {$set: {'name': name, 'img': img}}, function (err, result) {
        if (err) {
          res.json({code: 500, data: err, msg: '服务器错误'})
          return
        }
        // console.log(result)
        res.json({code: 200, data: '修改成功', msg: '修改成功'})
      })
    } else {
      // 判断分类名是否重复
      db.n_categorie.find({'name': name}, function (err, result) {
        if (err) {
          res.json({code: 500, data: err, msg: '服务器错误'})
          return
        }
        if (result.length > 0) {
          res.json({code: 400, data: '分类名已存在', msg: '分类名已存在'})
          return
        }
        // 创建分类
        new db.n_categorie({'name': name, 'img': img}).save(function (err) {
          if (err) {
            res.json({code: 500, data: err, msg: '服务器错误'})
            return
          }
          res.json({code: 200, msg: '添加分类成功', data: '添加分类成功'});
        })
      })
    }
  })
})

// 删除分类
router.delete('/delCategory', function (req, res, next) {
  if (!req.query.id) {
    res.json({code: 400, data: '参数缺少: id', msg: '参数缺少: id'})
    return
  }
  let ids = req.query.id
  for (let i of ids) {
    db.n_categorie.remove({'_id': i}, function (err, result) {
      if (err) {
        res.json({code: 500, data: err, msg: '服务器错误'})
        return
      }
    })
  }
  res.json({code: 200, data: '删除成功', msg: '删除成功'})
})
module.exports = router
