const Router = require('express')
const router = Router()
const getCode = require('../model/svgCaptcha.js')

router.get('/code', function(req, res, next) {
  getCode(function(code, img) {
    //存session用于验证接口获取文字码
    req.session.captcha = code
    let data = {}
    if (code && img) {
      data = {
        code: 200,
        msg: '获取成功',
        data: img
      }
    } else {
      data = {
        code: 400,
        msg: '获取失败',
        data: img
      }
    }

    res.json(data)
  })

})

module.exports = router
