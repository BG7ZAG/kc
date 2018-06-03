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
// model
let n_categorie = mongoose.model('n_categorie', CategorieSchema)
let n_goods = mongoose.model('n_goods', GoodsSchema)
let n_swiper = mongoose.model('n_swiper', SwiperSchema)

exports.n_categorie = n_categorie
exports.n_goods = n_goods
exports.n_swiper = n_swiper
