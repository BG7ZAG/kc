import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import api from './api'
import path from 'path'

const app = express()

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

app.use('/uploads',express.static('uploads')); // 上传文件目录
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
