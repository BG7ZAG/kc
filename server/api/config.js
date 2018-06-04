import { Router } from 'express'
const router = Router()
const db = require('../model/db.js')
const md5 = require('../model/md5.js')
const formidable = require('formidable')

router.get('/config', function(req, res, next) {
  db.n_config.find({ '_id': '5b154983a0c11b3686ccb5af' }, function(err, result) {
    if (err) return res.json({ code: 500, data: err, msg: '服务器错误' })
    res.json({ code: 200, data: result, msg: '获取成功' })
  })
})

router.post('/config', function(req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' })
      return
    }
    if (!fields.code) {
      res.json({ code: 400, data: '缺少参数：code', msg: '缺少参数：code' })
      return
    }
    if (!fields.old_password) {
      res.json({ code: 400, data: '缺少参数：old_password', msg: '缺少参数：old_password' })
      return
    }
    if (fields.code.toLowerCase() != req.session.captcha) {
      res.json({ code: 400, data: '验证码错误', msg: '验证码错误' })
      return
    }
    let password = md5(fields.old_password)
    db.n_config.find({ '_id': '5b154983a0c11b3686ccb5af' }, function(err, result) {
      if (err) return res.json({ code: 500, data: err, msg: '服务器错误' })
      if (password != result[0].password) {
        res.json({ code: 400, data: '密码错误', msg: '密码错误' })
        return
      }
      // console.log(fields)
      let data = {}
      if (fields.name) {
        data.name = fields.name // 账号
      }
      if (fields.password) {
        data.password = md5(fields.password) // 密码
      }

      if (fields.email) {
        data.email = fields.email // 管理员邮箱地址

      }
      if (fields.stmp_email) {
        data.stmp_email = fields.stmp_email // STMP邮箱地址

      }
      if (fields.stmp_epassword) {
        data.stmp_epassword = fields.stmp_epassword // STMP密码

      }
      if (fields.stmp) {
        data.stmp = fields.stmp // STMP地址
      }
      if (fields.stmp_port) {
        data.stmp_port = fields.stmp_port // STMP端口
      }
      if (fields.appid) {
        data.appid = fields.appid // AppId
      }
      if (fields.appsecret) {
        data.appsecret = fields.appsecret // APPSecret
      }
      db.n_config.update({ '_id': '5b154983a0c11b3686ccb5af' }, { $set: data }, function(err, result) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' })
          return
        }
        res.json({ code: 200, data: result, msg: '更新成功' })
      })

    })


  })
})

export default router
