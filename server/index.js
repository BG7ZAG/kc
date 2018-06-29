const express = require('express')
const api = require('./controller')
const path = require('path')
const history =  require('connect-history-api-fallback')
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
//allow custom header and CORS
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
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
// app.use('/admin', function (req, res, next) {
// 	if (req.path == '/login') {
//         next();
//         return;
//     }
//     if(req.session.login != 1){
//         res.redirect('/admin/login')
//         return;
//     }
//     next();
// })
app.use('/api', api)

// app.use(history({
//     index: '/admin/index.html'
// }));

app.use(express.static('view')); // 后台文件目录


// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
