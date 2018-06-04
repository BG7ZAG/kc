import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import api from './api'
import path from 'path'
const app = express()
const session = require("express-session")
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.set('port', port)

// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nanadmin');
const db = mongoose.connection;
db.once('open', function (callback) {
  console.log("数据库成功打开");
});

// 设置静态文件目录
app.use('/uploads',express.static('uploads')); // 上传文件目录

// session 中间件
app.use(session({
    name: 'config.session.key', // 设置 cookie 中保存 session id 的字段名称
    secret: 'config.session.secret', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: 604800000// 过期时间，过期后 cookie 中的 session id 自动删除
    }
    // store: new MongoStore({// 将 session 存储到 mongodb
    //     url: config.mongodb// mongodb 地址
    // })
}))
// 验证是否登录
app.use('/admin', function (req, res, next) {
	if (req.path == '/login') {
        next();
        return;
    }
    if(req.session.login != 1){
        res.redirect('/admin/login')
        return;
    }
    next();
})
// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express

app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
