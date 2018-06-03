import { Router } from 'express'
const router = Router()
const os = require('os')
const timeStamp = require('../model/timeStamp.js')
/* GET info. */
router.get('/info', function (req, res, next) {
  let info = {
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
  }
  res.json({code: 200, msg: '获取成功', data: info})
})

export default router
