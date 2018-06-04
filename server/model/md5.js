const crypto = require("crypto");

module.exports = function(pwd){
    function m(e) {
        return crypto.createHash('md5').update(e).digest('base64');
    }

    let password = m(m(pwd) + '@Jason' + m(pwd));
    return password;
}