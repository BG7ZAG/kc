const formidable = require('formidable')
const fs = require('fs')

module.exports = function (req, res, next) {

  let form = new formidable.IncomingForm()
  form.uploadDir = 'uploads'
  form.keepExtensions = true // 保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024 // 文件大小
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({code: 400, data: err, msg: err})
      return
    }
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let t = date.getTime()
    let oldPath = files.file.path // 原始文件
    let type = /\.[^\.]+$/.exec(oldPath)[0] // 获取文件后缀名
    let newPath = 'uploads/' + y + '/' + m + '/' + t + type

    // 判断目录是否存在，不存在就新建
    if (!fs.existsSync('uploads/' + y)) {
      fs.mkdirSync('uploads/' + y)
    }
    if (!fs.existsSync('uploads/' + y + '/' + m)) {
      fs.mkdirSync('uploads/' + y + '/' + m)
    }
    // 移动，重命名文件
    let rename = fs.renameSync(oldPath, newPath)
    if (!rename) {
      res.json({code: 200, msg: '文件上传成功', data: {'img': newPath, url: req.headers.origin + '/' + newPath}})
    } else {
      res.json({code: 400, msg: '文件上传失败', data: '文件上传失败'})
    }
  })
}
