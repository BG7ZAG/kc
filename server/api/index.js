import { Router } from 'express'

import info from './info'
import users from './users'
import categorys from './category'
import goods from  './goods'
import swiper from  './swiper'
import upload from '../model/upload'
const router = Router()

// Add USERS Routes
router.use(info) // 首页信息
router.use(users)
router.use(categorys) // 分类
router.use(goods) // 商品
router.use(swiper) // 轮播
router.use('/upload', upload)
export default router
