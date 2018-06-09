require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("formidable");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(3);

// 分类
var CategorieSchema = new mongoose.Schema({
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
}, { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } });
CategorieSchema.index({ 'name': 1 });

// 分页
CategorieSchema.statics = {
  fetch: function fetch(id, limit, cb) {
    if (id) {
      return this.find({ '_id': { '$lt': id } }).limit(limit).sort({ '_id': -1 }).exec(cb);
    } else {
      return this.find({}).limit(limit).sort({ '_id': -1 }).exec(cb);
    }
  }
};

// 商品
var GoodsSchema = new mongoose.Schema({
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
}, { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } });
GoodsSchema.index({ 'name': 1, 'categoryId': 1 });

// 轮播
var SwiperSchema = new mongoose.Schema({
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
});

// 关于我
var AboutSchema = new mongoose.Schema({
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
});

// 配置
var ConfigSchema = new mongoose.Schema({
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
});

// 留言
var ContactSchema = new mongoose.Schema({
  'name': String,
  'phone': Number,
  'content': String,
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
});

// model
var n_categorie = mongoose.model('n_categorie', CategorieSchema);
var n_goods = mongoose.model('n_goods', GoodsSchema);
var n_swiper = mongoose.model('n_swiper', SwiperSchema);
var n_about = mongoose.model('n_about', AboutSchema);
var n_config = mongoose.model('n_config', ConfigSchema);
var n_contact = mongoose.model('n_contact', ContactSchema);

exports.n_categorie = n_categorie;
exports.n_goods = n_goods;
exports.n_swiper = n_swiper;
exports.n_about = n_about;
exports.n_config = n_config;
exports.n_contact = n_contact;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var crypto = __webpack_require__(20);

module.exports = function (pwd) {
    function m(e) {
        return crypto.createHash('md5').update(e).digest('base64');
    }

    var password = m(m(pwd) + '@Jason' + m(pwd));
    return password;
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);




var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
var session = __webpack_require__(27);
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;
app.set('port', port);

// 连接数据库
var mongoose = __webpack_require__(3);
mongoose.connect('mongodb://localhost:27017/nanadmin');
var db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

// 设置静态文件目录
app.use('/uploads', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static('uploads')); // 上传文件目录

// session 中间件
app.use(session({
    name: 'config.session.key', // 设置 cookie 中保存 session id 的字段名称
    secret: 'config.session.secret', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: 604800000 // 过期时间，过期后 cookie 中的 session id 自动删除

        // store: new MongoStore({// 将 session 存储到 mongodb
        //     url: config.mongodb// mongodb 地址
        // })
    } }));
// 验证是否登录
app.use('/admin', function (req, res, next) {
    if (req.path == '/login') {
        next();
        return;
    }
    if (req.session.login != 1) {
        res.redirect('/admin/login');
        return;
    }
    next();
});
// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */]);

// Import and Set Nuxt.js options
var config = __webpack_require__(28);
config.dev = !("development" === 'production');

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
    var builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
    builder.build();
}

// Give nuxt middleware to express

app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__info__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__category__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__goods__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__swiper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_upload__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__model_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__about__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__code__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__contact__ = __webpack_require__(25);













var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__info__["a" /* default */]); // 首页信息
router.use(__WEBPACK_IMPORTED_MODULE_2__users__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_3__category__["a" /* default */]); // 分类
router.use(__WEBPACK_IMPORTED_MODULE_4__goods__["a" /* default */]); // 商品
router.use(__WEBPACK_IMPORTED_MODULE_5__swiper__["a" /* default */]); // 轮播
router.use(__WEBPACK_IMPORTED_MODULE_7__about__["a" /* default */]); // 关于我们
router.use(__WEBPACK_IMPORTED_MODULE_8__config__["a" /* default */]); // 配置
router.use(__WEBPACK_IMPORTED_MODULE_9__code__["a" /* default */]); // 获取验证码
router.use(__WEBPACK_IMPORTED_MODULE_10__login__["a" /* default */]); // 登录
router.use(__WEBPACK_IMPORTED_MODULE_11__contact__["a" /* default */]); // 留言
router.use('/upload', __WEBPACK_IMPORTED_MODULE_6__model_upload___default.a);
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var os = __webpack_require__(9);
var timeStamp = __webpack_require__(10);
/* GET info. */
router.get('/info', function (req, res, next) {
  var info = {
    arch: os.arch(), // 获取cpu(处理器架构)
    cpus: os.cpus(), // 获取cpu信息
    endianness: os.endianness(), // 字节顺序 高位优先返回BE,低位优先的返回LE
    freemem: Math.round(os.freemem() / 1048576), // 空闲内存字节
    homedir: os.homedir(), // 当前登录用户的根目录
    hostname: os.hostname(), // 操作系统主机名
    networkInterfaces: os.networkInterfaces(), // 网络配置列表
    platform: os.platform(), // 操作系统类型,返回值有'darwin', 'freebsd', 'linux', 'sunos' , 'win32'
    release: process.version, // node版本
    tmpdir: os.tmpdir(), // 操作系统临时文件的默认目录
    totalmem: Math.round(os.totalmem() / 1048576), // 系统总内存
    uptime: timeStamp.ddhhmm(os.uptime()) // 计算机正常运行时间
  };
  res.json({ code: 200, msg: '获取成功', data: info });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

exports.ddhhmm = function (second_time) {
  var time = parseInt(second_time) + '秒';
  if (parseInt(second_time) > 60) {
    var second = parseInt(second_time) % 60;
    var min = parseInt(second_time / 60);
    // time = min + "分钟" + second + "秒";
    time = min + '分钟';

    if (min > 60) {
      min = parseInt(second_time / 60) % 60;
      var hour = parseInt(parseInt(second_time / 60) / 60);
      // time = hour + "小时" + min + "分" + second + "秒";
      time = hour + '小时' + min + '分钟';

      if (hour > 24) {
        hour = parseInt(parseInt(second_time / 60) / 60) % 24;
        var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
        // time = day + "天" + hour + "小时" + min + "分" + second + "秒";
        time = day + '天' + hour + '小时' + min + '分钟';
      }
    }
  }
  return time;
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Mock Users
var users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users);
});

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var formidable = __webpack_require__(1);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var db = __webpack_require__(2);

/* 后台分类列表 listing. */
router.get('/category', function (req, res, next) {
  var limit = req.query.limit || 10;
  var current_page = req.query.current_page || 1;
  current_page -= 1;
  var data = {};
  // 获取分类数量
  db.n_categorie.find().count().exec(function (err, count) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    data.total = count;
    data.limit = limit;

    // 获取分类列表
    db.n_categorie.find().sort({ '_id': -1 }).exec(function (err, result) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' });
        return;
      }
      // console.log(result)
      if (result.length === 0) {
        res.json({ code: 400, data: '没有数据', msg: '没有数据' });
        return;
      }
      var len = result.length - 1;
      var results = result;

      // 获取分类商品条数
      categorieNumber(len);
      function categorieNumber(i) {
        db.n_goods.find({ 'categoryId': result[i]._id }, function (err, result1) {
          if (err) {
            res.json({ code: 500, data: err, msg: '服务器错误' });
            return;
          }
          results[i].goods_num = result1.length;
          results[i].img = '../' + results[i].img;
          if (i != 0) {
            i--;
            categorieNumber(i);
          } else {
            data.category = results;
            data.current_page = current_page + 1;
            res.json({ code: 200, data: data, msg: '获取列表成功' });
          }
        });
      }
    });
  });
});

// 添加、编辑分类
router.post('/addCategory', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    // console.log(fields)
    if (!fields.name) {
      res.json({ code: 400, data: 'name参数缺少', msg: 'name参数缺少' });
      return;
    }
    if (!fields.img) {
      res.json({ code: 400, data: 'img参数缺少', msg: 'img参数缺少' });
      return;
    }
    var name = fields.name;
    var img = fields.img;
    if (fields.id) {
      var id = fields.id;
      // 更新分类
      db.n_categorie.update({ '_id': id }, { $set: { 'name': name, 'img': img } }, function (err, result) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' });
          return;
        }
        // console.log(result)
        res.json({ code: 200, data: '修改成功', msg: '修改成功' });
      });
    } else {
      // 判断分类名是否重复
      db.n_categorie.find({ 'name': name }, function (err, result) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' });
          return;
        }
        if (result.length > 0) {
          res.json({ code: 400, data: '分类名已存在', msg: '分类名已存在' });
          return;
        }
        // 创建分类
        new db.n_categorie({ 'name': name, 'img': img }).save(function (err) {
          if (err) {
            res.json({ code: 500, data: err, msg: '服务器错误' });
            return;
          }
          res.json({ code: 200, msg: '添加分类成功', data: '添加分类成功' });
        });
      });
    }
  });
});

// 删除分类
router.delete('/delCategory', function (req, res, next) {
  if (!req.query.id) {
    res.json({ code: 400, data: '参数缺少: id', msg: '参数缺少: id' });
    return;
  }
  var ids = req.query.id;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      db.n_categorie.remove({ '_id': i }, function (err, result) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' });
          return;
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  res.json({ code: 200, data: '删除成功', msg: '删除成功' });
});
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var formidable = __webpack_require__(1);
var moment = __webpack_require__(14);
moment.locale('zh-cn');
var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var db = __webpack_require__(2);

// 商品查询
router.get('/goods', function (req, res, next) {
  var limit = req.query.limit || 10;
  var current_page = req.query.current_page || 1;
  var categoryId = {};
  if (req.query.categoryId) {
    categoryId['categoryId'] = req.query.categoryId;
  }
  current_page -= 1;
  var data = {};
  // 查询总数
  db.n_goods.find(categoryId).count().exec(function (err, count) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    data.total = count;
    data.limit = limit;
    // 获取列表
    db.n_goods.find(categoryId).sort({ '_id': -1 }).skip(current_page * limit).limit(limit).exec(function (err, result) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' });
        return;
      }

      var list = [];
      var tempJson = {};
      result.forEach(function (v, i) {
        tempJson = {};
        tempJson['createTime'] = moment(result[i].createTime).format('YYYY-MM-DD HH:mm:ss');
        tempJson['_id'] = result[i]._id;
        tempJson['name'] = result[i].name;
        tempJson['img'] = result[i].img;
        tempJson['content'] = result[i].content;
        tempJson['hot'] = result[i].hot;
        tempJson['categoryId'] = result[i].categoryId;
        tempJson['updateTime'] = result[i].updateTime;
        tempJson['__v'] = result[i].__v;
        list[i] = tempJson;
      });
      data.current_page = current_page + 1;
      data.data = list;
      res.json({ code: 200, data: data, msg: '获取商品列表成功' });
    });
  });
});

// 添加商品
router.post('/goods', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    // console.log(fields)
    if (!fields.name) {
      res.json({ code: 400, data: '缺少参数:name', msg: '缺少参数:name' });
      return;
    }
    if (!fields.img) {
      res.json({ code: 400, data: '缺少参数:img', msg: '缺少参数:img' });
      return;
    }
    if (!fields.content) {
      res.json({ code: 400, data: '缺少参数:content', msg: '缺少参数:content' });
      return;
    }
    if (!fields.categoryId) {
      res.json({ code: 400, data: '缺少参数:categoryId', msg: '缺少参数:categoryId' });
      return;
    }
    var name = fields.name;
    var img = fields.img;
    var content = fields.content;
    var categoryId = fields.categoryId;
    // 验证名字是否一样
    db.n_goods.find({ 'name': name }).count().exec(function (err, count) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' });
        return;
      }
      if (count !== 0) {
        res.json({ code: 400, data: '商品名称重复', msg: '商品名称重复' });
        return;
      }
      // 创建商品
      new db.n_goods({ 'name': name, 'img': img, 'content': content, 'hot': 0, 'categoryId': categoryId }).save(function (err) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' });
          return;
        }
        res.json({ code: 200, msg: '添加商品成功', data: '添加商品成功' });
      });
    });
  });
});

// 修改商品
router.put('/goods', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    // console.log(fields)
    if (!fields.id) {
      res.json({ code: 400, data: '缺少参数:id', msg: '缺少参数:id' });
      return;
    }
    if (!fields.name) {
      res.json({ code: 400, data: '缺少参数:name', msg: '缺少参数:name' });
      return;
    }
    if (!fields.img) {
      res.json({ code: 400, data: '缺少参数:img', msg: '缺少参数:img' });
      return;
    }
    if (!fields.content) {
      res.json({ code: 400, data: '缺少参数:content', msg: '缺少参数:content' });
      return;
    }
    if (!fields.categoryId) {
      res.json({ code: 400, data: '缺少参数:categoryId', msg: '缺少参数:categoryId' });
      return;
    }
    var name = fields.name;
    var img = fields.img;
    var content = fields.content;
    var categoryId = fields.categoryId;
    var id = fields.id;
    db.n_goods.update({ '_id': id }, { $set: { 'name': name, 'img': img, 'content': content, 'categoryId': categoryId } }, function (err, result) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' });
        return;
      }
      // console.log(result)
      res.json({ code: 200, data: '修改成功', msg: '修改成功' });
    });
  });
});

// 删除商品
router.delete('/goods', function (req, res, next) {
  if (!req.query.id) {
    res.json({ code: 400, data: '参数缺少: id', msg: '参数缺少: id' });
    return;
  }
  var ids = req.query.id;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      db.n_goods.remove({ '_id': i }, function (err, result) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' });
          return;
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  res.json({ code: 200, data: '删除成功', msg: '删除成功' });
});

// 获取商品详情
router.get('/goods/detail', function (req, res, next) {
  var id = req.query.id;
  if (!id) {
    res.json({ code: 400, data: '缺少参数:id', msg: '缺少参数:id' });
    return;
  }
  db.n_goods.find({ '_id': id }, function (err, result) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    res.json({ code: 200, data: result, msg: '商品详情获取成功' });
  });
});
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var formidable = __webpack_require__(1);
var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var db = __webpack_require__(2);

// 获取轮播列表
router.get('/swiper', function (req, res, next) {
  db.n_swiper.find().sort({ '_id': -1 }).exec(function (err, result) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    var list = [];
    var tempJson = {};
    result.forEach(function (v, i) {
      tempJson = {};
      tempJson['url'] = 'http://' + req.headers.host + '/' + result[i].img;
      tempJson['img'] = '../' + result[i].img;
      tempJson['name'] = result[i].name;
      tempJson['updateTime'] = result[i].updateTime;
      tempJson['createTime'] = result[i].createTime;
      tempJson['__v'] = result[i].__v;
      tempJson['_id'] = result[i]._id;
      list[i] = tempJson;
    });

    res.json({ code: 200, data: list, msg: '获取轮播成功' });
  });
});

// 添加轮播
router.post('/swiper', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    // console.log(fields)
    if (!fields.name) {
      res.json({ code: 400, data: 'name参数缺少', msg: 'name参数缺少' });
      return;
    }
    if (!fields.img) {
      res.json({ code: 400, data: 'img参数缺少', msg: 'img参数缺少' });
      return;
    }
    var name = fields.name;
    var img = fields.img;
    new db.n_swiper({ 'name': name, 'img': img }).save(function (err) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' });
        return;
      }
      res.json({ code: 200, msg: '添加轮播成功', data: '添加轮播成功' });
    });
  });
});

// 修改轮播
router.put('/swiper', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    // console.log(fields)
    if (!fields.id) {
      res.json({ code: 400, data: '缺少参数:id', msg: '缺少参数:id' });
      return;
    }
    if (!fields.name) {
      res.json({ code: 400, data: '缺少参数:name', msg: '缺少参数:name' });
      return;
    }
    if (!fields.img) {
      res.json({ code: 400, data: '缺少参数:img', msg: '缺少参数:img' });
      return;
    }
    var name = fields.name;
    var img = fields.img;
    var id = fields.id;
    db.n_swiper.update({ '_id': id }, { $set: { 'name': name, 'img': img } }, function (err, result) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' });
        return;
      }
      // console.log(result)
      res.json({ code: 200, data: '修改成功', msg: '修改成功' });
    });
  });
});

router.delete('/swiper', function (req, res, next) {
  if (!req.query.id) {
    res.json({ code: 400, data: '参数缺少: id', msg: '参数缺少: id' });
    return;
  }
  var ids = req.query.id;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      db.n_swiper.remove({ '_id': i }, function (err, result) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' });
          return;
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  res.json({ code: 200, data: '删除成功', msg: '删除成功' });
});
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var formidable = __webpack_require__(1);
var fs = __webpack_require__(17);

module.exports = function (req, res, next) {

  var form = new formidable.IncomingForm();
  form.uploadDir = 'uploads';
  form.keepExtensions = true; // 保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 400, data: err, msg: err });
      return;
    }
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var t = date.getTime();
    var oldPath = files.file.path; // 原始文件
    var type = /\.[^\.]+$/.exec(oldPath)[0]; // 获取文件后缀名
    var newPath = 'uploads/' + y + '/' + m + '/' + t + type;

    // 判断目录是否存在，不存在就新建
    if (!fs.existsSync('uploads/' + y)) {
      fs.mkdirSync('uploads/' + y);
    }
    if (!fs.existsSync('uploads/' + y + '/' + m)) {
      fs.mkdirSync('uploads/' + y + '/' + m);
    }
    // 移动，重命名文件
    var rename = fs.renameSync(oldPath, newPath);
    if (!rename) {
      res.json({ code: 200, msg: '文件上传成功', data: { 'img': newPath, url: req.headers.origin + '/' + newPath } });
    } else {
      res.json({ code: 400, msg: '文件上传失败', data: '文件上传失败' });
    }
  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var db = __webpack_require__(2);
var formidable = __webpack_require__(1);

router.get('/about', function (req, res, next) {
  db.n_about.find({ '_id': '5b153849af117421350babee' }, function (err, result) {
    if (err) return res.json({ code: 500, data: err, msg: '服务器错误' });
    var list = [];
    var tempJson = {};
    result.forEach(function (v, i) {
      tempJson = {};
      if (!result[i].banner == '') {
        tempJson['banner'] = '../' + result[i].banner;
        tempJson['url'] = 'http://' + req.headers.host + '/' + result[i].banner;
      }
      tempJson['createTime'] = result[i].createTime;
      tempJson['updateTime'] = result[i].updateTime;
      tempJson['_id'] = result[i]._id;
      tempJson['introduce'] = result[i].introduce;
      tempJson['phone'] = result[i].phone;
      tempJson['telephone'] = result[i].telephone;
      tempJson['wechat'] = result[i].wechat;
      tempJson['name'] = result[i].name;
      tempJson['address'] = result[i].address;
      tempJson['__v'] = result[i].__v;
      list[i] = tempJson;
    });
    res.json({ code: 200, data: list, msg: '获取关于成功' });
  });
});

router.post('/about', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    // console.log(fields)
    var data = {};
    if (fields.banner) {
      data.banner = fields.banner; // 顶部banner图
    }
    if (fields.introduce) {
      data.introduce = fields.introduce; // 企业简介
    }
    if (fields.phone) {
      data.phone = fields.phone; // 手机号
    }
    if (fields.telephone) {
      data.telephone = fields.telephone; // 电话号
    }
    if (fields.wechat) {
      data.wechat = fields.wechat; // 微信号
    }
    if (fields.name) {
      data.name = fields.name; // 定位名称号
    }
    if (fields.address) {
      data.address = fields.address; // 定位地址号
    }
    db.n_about.update({ '_id': '5b153849af117421350babee' }, { $set: data }, function (err, result) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' });
        return;
      }
      res.json({ code: 200, data: result, msg: '更新成功' });
    });
  });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var db = __webpack_require__(2);
var md5 = __webpack_require__(4);
var formidable = __webpack_require__(1);

router.get('/config', function (req, res, next) {
  db.n_config.find({ '_id': '5b154983a0c11b3686ccb5af' }, function (err, result) {
    if (err) return res.json({ code: 500, data: err, msg: '服务器错误' });
    res.json({ code: 200, data: result, msg: '获取成功' });
  });
});

router.post('/config', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    if (!fields.code) {
      res.json({ code: 400, data: '缺少参数：code', msg: '缺少参数：code' });
      return;
    }
    if (!fields.old_password) {
      res.json({ code: 400, data: '缺少参数：old_password', msg: '缺少参数：old_password' });
      return;
    }
    if (fields.code.toLowerCase() != req.session.captcha) {
      res.json({ code: 400, data: '验证码错误', msg: '验证码错误' });
      return;
    }
    var password = md5(fields.old_password);
    db.n_config.find({ '_id': '5b154983a0c11b3686ccb5af' }, function (err, result) {
      if (err) return res.json({ code: 500, data: err, msg: '服务器错误' });
      if (password != result[0].password) {
        res.json({ code: 400, data: '密码错误', msg: '密码错误' });
        return;
      }
      // console.log(fields)
      var data = {};
      if (fields.name) {
        data.name = fields.name; // 账号
      }
      if (fields.password) {
        data.password = md5(fields.password); // 密码
      }

      if (fields.email) {
        data.email = fields.email; // 管理员邮箱地址
      }
      if (fields.stmp_email) {
        data.stmp_email = fields.stmp_email; // STMP邮箱地址
      }
      if (fields.stmp_epassword) {
        data.stmp_epassword = fields.stmp_epassword; // STMP密码
      }
      if (fields.stmp) {
        data.stmp = fields.stmp; // STMP地址
      }
      if (fields.stmp_port) {
        data.stmp_port = fields.stmp_port; // STMP端口
      }
      if (fields.appid) {
        data.appid = fields.appid; // AppId
      }
      if (fields.appsecret) {
        data.appsecret = fields.appsecret; // APPSecret
      }
      db.n_config.update({ '_id': '5b154983a0c11b3686ccb5af' }, { $set: data }, function (err, result) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' });
          return;
        }
        res.json({ code: 200, data: result, msg: '更新成功' });
      });
    });
  });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var getCode = __webpack_require__(22);

router.get('/code', function (req, res, next) {
  getCode(function (code, img) {
    //存session用于验证接口获取文字码
    req.session.captcha = code;
    var data = {};
    if (code && img) {
      data = {
        code: 200,
        msg: '获取成功',
        data: img
      };
    } else {
      data = {
        code: 400,
        msg: '获取失败',
        data: img
      };
    }

    res.json(data);
  });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 获取验证码
var svgCaptcha = __webpack_require__(23);

module.exports = function (callback) {
    var codeConfig = {
        size: 5, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 45
    };
    var captcha = svgCaptcha.create(codeConfig);
    var sessionCaptcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    var codeData = {
        img: captcha.data
    };
    callback(sessionCaptcha, codeData);
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("svg-captcha");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var db = __webpack_require__(2);
var md5 = __webpack_require__(4);
var formidable = __webpack_require__(1);

router.post('/login', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.json({ code: 500, data: err, msg: '服务器错误' });
            return;
        }
        // console.log(fields)
        if (!fields.code) {
            res.json({ code: 400, data: '请输入验证码', msg: '请输入验证码' });
            return;
        }
        if (!fields.name) {
            res.json({ code: 400, data: '请输入账户', msg: '请输入账户' });
            return;
        }
        if (!fields.password) {
            res.json({ code: 400, data: '请输入密码', msg: '请输入密码' });
            return;
        }
        if (fields.code.toLowerCase() != req.session.captcha) {
            res.json({ code: 400, data: '请输入验证码错误', msg: '请输入验证码错误' });
            return;
        }
        var data = {
            name: fields.name,
            password: fields.password
        };
        db.n_config.find({ '_id': '5b154983a0c11b3686ccb5af' }, function (err, result) {
            if (err) {
                res.json({ code: 500, data: err, msg: '服务器错误' });
                return;
            }
            if (result[0].name != fields.name) {
                res.json({ code: 400, data: err, msg: '账号错误' });
                return;
            }
            if (result[0].password != md5(fields.password)) {
                res.json({ code: 400, data: err, msg: '密码错误' });
                return;
            }
            req.session.login = 1;
            res.json({ code: 200, data: '登录成功', msg: '登录成功' });
        });
    });
});

// 注销登录
router.get('/logout', function (req, res, next) {
    req.session.login = -1;
    res.json({ code: 200, data: '退出成功', msg: '退出成功' });
});
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var db = __webpack_require__(2);
var moment = __webpack_require__(14);
moment.locale('zh-cn');

router.get('/contact', function (req, res, next) {
  var limit = req.query.limit || 2;
  var current_page = req.query.current_page || 1;
  current_page -= 1;
  var data = {};
  // 获取分类数量
  db.n_contact.find().count().exec(function (err, count) {
    if (err) {
      res.json({ code: 500, data: err, msg: '服务器错误' });
      return;
    }
    data.total = count;
    data.limit = limit;

    // 获取列表
    db.n_contact.find().sort({ '_id': -1 }).skip(current_page * limit).limit(limit).exec(function (err, result) {
      if (err) {
        res.json({ code: 500, data: err, msg: '服务器错误' });
        return;
      }
      // if (result.length === 0) {
      //   res.json({code: 400, data: '没有数据', msg: '没有数据'})
      //   return
      // }
      var list = [];
      var tempJson = {};
      result.forEach(function (v, i) {
        tempJson = {};
        tempJson['createTime'] = moment(result[i].createTime).format('YYYY-MM-DD HH:mm:ss');
        tempJson['_id'] = result[i]._id;
        tempJson['name'] = result[i].name;
        tempJson['phone'] = result[i].phone;
        tempJson['content'] = result[i].content;
        tempJson['updateTime'] = result[i].updateTime;
        tempJson['__v'] = result[i].__v;
        list[i] = tempJson;
      });
      data.current_page = current_page + 1;
      data.data = list;
      res.json({ code: 200, data: data, msg: '获取留言列表成功' });
    });
  });
});

// 删除留言
router.delete('/contact', function (req, res, next) {
  if (!req.query.id) {
    res.json({ code: 400, data: '参数缺少: id', msg: '参数缺少: id' });
    return;
  }
  var ids = req.query.id;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      db.n_contact.remove({ '_id': i }, function (err, result) {
        if (err) {
          res.json({ code: 500, data: err, msg: '服务器错误' });
          return;
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  res.json({ code: 200, data: '删除成功', msg: '删除成功' });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '康诚机电',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0' }, { hid: 'description', name: 'description', content: '康诚机电' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css', 'element-ui/lib/theme-chalk/index.css', 'quill/dist/quill.snow.css', 'quill/dist/quill.bubble.css', 'quill/dist/quill.core.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },

  styleResources: {
    scss: ' ./ assets / variables.scss ',
    less: ' ./assets /* . less ',
    // sass：...，
    // scss：...
    options: {
      //参见https://github.com/yenshih/style-resources-loader#options
      //除`patterns`属性外
    }
  },

  vender: ['element-ui'],
  babel: {
    "plugins": [["component", [{
      "libraryName": "element-ui",
      "styleLibraryName": "theme-default"
    }, 'transform-async-to-generator', 'transform-runtime']]],
    comments: true
  },
  plugins: [{ src: '~plugins/element-ui', ssr: true }, { src: '~plugins/nuxt-quill-plugin.js', ssr: false }]

};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map