/*
 * 为导出的文件生成md5
 */

var fs = require('fs');
var crypto = require('crypto');
var path = '../output/Zombie/';
var md5File = 'md5conf.json';
var trimStr = 'Zombie';
var removeReg = new RegExp('\/' + trimStr + '\/', 'g');

var files = fs.readdirSync(path);
var md5Info = {};
// 替换path
files.forEach(function(elem, i) {
  var filePath = path + elem;
  var data = fs.readFileSync(filePath, 'utf8');
  if (/^.*\.(css|js|html)/.test(elem)) {
    console.log('replace', elem);
    var newData = data.replace(removeReg, '');
    fs.writeFileSync(filePath, newData, 'utf8');
  }
});
// 计算md5
files.forEach(function(elem, i) {
  var data = fs.readFileSync(path + elem);
  md5Info[elem] = crypto.createHash('md5').update(data).digest('hex');
});
fs.writeFile(path + md5File, JSON.stringify(md5Info));
