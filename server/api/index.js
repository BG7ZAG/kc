import { Router } from 'express'

import info from './info'
import users from './users'
import categorys from './category'
import goods from  './goods'
import swiper from  './swiper'
import upload from '../model/upload'
import about from './about'
import config from './config'
import code from './code'
import login from './login'
import contact from './contact'
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
export default router
