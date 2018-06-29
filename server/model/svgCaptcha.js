// 获取验证码
const svgCaptcha = require('svg-captcha');

module.exports = callback => {
    let codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 45
    }
    let captcha = svgCaptcha.create(codeConfig);
    let sessionCaptcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    let codeData = {
        img:captcha.data
    }
    callback(sessionCaptcha,codeData);
}