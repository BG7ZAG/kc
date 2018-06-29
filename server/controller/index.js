const Router = require('express')
const info = require('./info')
const users = require('./users')
const categorys = require('./category')
const goods = require('./goods')
const swiper = require('./swiper')
const upload = require('../model/upload')
const about = require('./about')
const config = require('./config')
const code = require('./code')
const login = require('./login')
const contact = require('./contact')

const router = Router()

// Add USERS Routes
router.use(info) // 首页信息
router.use(users)
router.use(categorys) // 分类
router.use(goods) // 商品
router.use(swiper) // 轮播
router.use(about) // 关于我们
router.use(config) // 配置
router.use(code) // 获取验证码
router.use(login) // 登录
router.use(contact) // 留言
router.use('/upload', upload)
module.exports = router