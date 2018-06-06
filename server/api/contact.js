import { Router } from 'express'
const router = Router()
const db = require('../model/db.js')
const formidable = require('formidable')

router.get('/contact', function(req, res, next) {
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
      data.current_page = current_page + 1
      data.result = result

	    res.json({code: 200, data: data, msg: '获取成功'})
    })
  })

})

export default router
