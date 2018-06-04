const mongoose = require('mongoose')

// 分类
let CategorieSchema = new mongoose.Schema({
  'name': String,
  'img': String,
  'goods_num': Number,
  'createTime': {
    type: Date,
    default: Date.now
  },
  'updateTime': {
    type: Date,
    default: Date.now
  }
}, {timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }})
CategorieSchema.index({'name': 1})

// 分页
CategorieSchema.statics = {
  fetch (id, limit, cb) {
    if (id) {
      return this.find({'_id': {'$lt': id}})
        .limit(limit)
        .sort({'_id': -1})
        .exec(cb)
    } else {
      return this.find({})
        .limit(limit)
        .sort({'_id': -1})
        .exec(cb)
    }
  }
}

// 商品
let GoodsSchema = new mongoose.Schema({
  'name': String,
  'img': Array,
  'hot': Number,
  'content': String,
  'categoryId': String,
  'createTime': {
    type: Date,
    default: Date.now
  },
  'updateTime': {
    type: Date,
    default: Date.now
  }
}, {timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }})
GoodsSchema.index({'name': 1, 'categoryId': 1})

// 轮播
let SwiperSchema = new mongoose.Schema({
  'name': String,
  'img': String,
  'createTime': {
    type: Date,
    default: Date.now
  },
  'updateTime': {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

// 关于我
let AboutSchema = new mongoose.Schema({
  'banner': String,
  'introduce': String,
  'phone': Number,
  'telephone': Number,
  'wechat': String,
  'name': String,
  'address': String,
  'longitude': Number,
  'latitude': Number,
  'createTime': {
    type: Date,
    default: Date.now
  },
  'updateTime': {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

// 配置
let ConfigSchema = new mongoose.Schema({
  'name': String,
  'password': String,
  'phone': Number,
  'rpassword': String,
  'email': String,
  'stmp_email': String,
  'stmp_epassword': String,
  'stmp': String,
  'stmp_port': Number,
  'appid': String,
  'appsecret': String,
  'createTime': {
    type: Date,
    default: Date.now
  },
  'updateTime': {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})
// model
let n_categorie = mongoose.model('n_categorie', CategorieSchema)
let n_goods = mongoose.model('n_goods', GoodsSchema)
let n_swiper = mongoose.model('n_swiper', SwiperSchema)
let n_about = mongoose.model('n_about', AboutSchema)
let n_config = mongoose.model('n_config', ConfigSchema)


exports.n_categorie = n_categorie
exports.n_goods = n_goods
exports.n_swiper = n_swiper
exports.n_about = n_about
exports.n_config = n_config
