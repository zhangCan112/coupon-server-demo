var crypto = require('crypto'); //加载加密文件


const md5_32 = function(str) { //暴露出md5s方法
  var md5 = crypto.createHash('md5');
  md5.update(str);
  let  md5_32 = md5.digest('hex');
  return md5_32
}

const md5_16 = function(str) { //暴露出md5s方法
  let md5_16 = md5_32(str).slice(8, 24)
  return md5_16
}

module.exports = {
  md5_32,
  md5_16,
}
