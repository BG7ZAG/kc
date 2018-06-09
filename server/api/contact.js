import { Router } from 'express'
const router = Router()
const db = require('../model/db.js')
const moment = require('moment')
moment.locale('zh-cn')

router.get('/contact', function(req, res, next) {
 let limit = req.query.limit || 2
  let current_page = req.query.current_page || 1
  current_page -= 1
  let data = {}
  // 获取分类数量
  db.n_contact.find().count().exec((err, count) => {
    if (err) {
      res.json({code: 500, data: err, msg: '服务器错误'})
      return
    }
    data.total = count
    data.limit = limit

    // 获取列表
    db.n_contact.find().sort({'_id': -1}).skip(current_page * limit).limit(limit).exec((err, result) => {
      if (err) {
        res.json({code: 500, data: err, msg: '服务器错误'})
        return
      }
      // if (result.length === 0) {
      //   res.json({code: 400, data: '没有数据', msg: '没有数据'})
      //   return
      // }
      let list = []
      let tempJson = {}
      result.forEach((v, i) => {
        tempJson = {}
        tempJson['createTime'] = moment(result[i].createTime).format('YYYY-MM-DD HH:mm:ss')
        tempJson['_id'] = result[i]._id
        tempJson['name'] = result[i].name
        tempJson['phone'] = result[i].phone
        tempJson['content'] = result[i].content
        tempJson['updateTime'] = result[i].updateTime
        tempJson['__v'] = result[i].__v
        list[i] = tempJson
      })
      data.current_page = current_page + 1
      data.data = list
      res.json({code: 200, data: data, msg: '获取留言列表成功'})

    })
  })

})

// 删除留言
router.delete('/contact', function (req, res, next) {
  if (!req.query.id) {
    res.json({code: 400, data: '参数缺少: id', msg: '参数缺少: id'})
    return
  }
  let ids = req.query.id
  for (let i of ids) {
    db.n_contact.remove({'_id': i}, function (err, result) {
      if (err) {
        res.json({code: 500, data: err, msg: '服务器错误'})
        return
      }
    })
  }
  res.json({code: 200, data: '删除成功', msg: '删除成功'})
})

export default router
