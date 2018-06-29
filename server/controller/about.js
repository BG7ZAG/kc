const Router = require('express')
const router = Router()
const db = require('../model/db.js')
const formidable = require('formidable')

router.get('/about', function(req, res, next) {
  db.n_about.find({ '_id': '5b153849af117421350babee' }, function(err, result) {
    if (err) return res.json({ code: 500, data: err, msg: '服务器错误' })
    let list = []
      let tempJson = {}
      result.forEach((v, i) => {
        tempJson = {}
        if (!result[i].banner == '') {
        	tempJson['banner'] = '../' + result[i].banner
        	tempJson['url'] = '/' + result[i].banner
        }
        tempJson['createTime'] = result[i].createTime
        tempJson['updateTime'] = result[i].updateTime
        tempJson['_id'] = result[i]._id
        tempJson['introduce'] = result[i].introduce
        tempJson['phone'] = result[i].phone
        tempJson['telephone'] = result[i].telephone
        tempJson['wechat'] = result[i].wechat
        tempJson['name'] = result[i].name
        tempJson['address'] = result[i].address
        tempJson['__v'] = result[i].__v
        list[i] = tempJson
      })
    res.json({ code: 200, data: list, msg: '获取关于成功' })
  })
})

router.post('/about', function(req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' })
      return
    }
    // console.log(fields)
    let data = {}
    if (fields.banner) {
      data.banner = fields.banner // 顶部banner图
    }
    if (fields.introduce) {
      data.introduce = fields.introduce // 企业简介
    }
    if (fields.phone) {
      data.phone = fields.phone // 手机号

    }
    if (fields.telephone) {
      data.telephone = fields.telephone // 电话号

    }
    if (fields.wechat) {
      data.wechat = fields.wechat // 微信号

    }
    if (fields.name) {
      data.name = fields.name // 定位名称号

    }
    if (fields.address) {
      data.address = fields.address // 定位地址号

    }
    db.n_about.update({ '_id': '5b153849af117421350babee' }, {$set: data}, function (err, result) {
    	if (err) {
	      res.json({ code: 500, data: err, msg: '服务器错误' })
	      return
	    }
	    res.json({code: 200, data: result, msg: '更新成功'})
    })

  })
})

module.exports = router
