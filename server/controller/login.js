const Router = require('express')
const router = Router()
const db = require('../model/db.js')
const md5 = require('../model/md5.js')
const formidable = require('formidable')

router.post('/login', function (req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' })
      return
    }
    // console.log(fields)
    if (!fields.code) {
        res.json({ code: 400, data: '请输入验证码', msg: '请输入验证码' })
        return
    }
    if (!fields.name) {
        res.json({ code: 400, data: '请输入账户', msg: '请输入账户' })
        return
    }
    if (!fields.password) {
        res.json({ code: 400, data: '请输入密码', msg: '请输入密码' })
        return
    }
    if(fields.code.toLowerCase() != req.session.captcha){
        res.json({ code: 400, data: '请输入验证码错误', msg: '请输入验证码错误' })
        return
    }
    let data = {
        name: fields.name,
        password: fields.password
    }
    db.n_config.find({'_id': '5b154983a0c11b3686ccb5af'}, function (err, result) {
        if (err) {
            res.json({ code: 500, data: err, msg: '服务器错误' })
            return
        }
        if (result[0].name != fields.name) {
            res.json({ code: 400, data: err, msg: '账号错误' })
            return
        }
        if (result[0].password != md5(fields.password)) {
            res.json({ code: 400, data: err, msg: '密码错误' })
            return
        }
        req.session.login = 1
      res.json({ code: 200, data: '登录成功', msg: '登录成功' })
    })
  })
})

// 注销登录
router.get('/logout', function (req, res, next) {
    req.session.login = -1
    res.json({ code: 200, data: '退出成功', msg: '退出成功' })
})
module.exports = router
