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

    var a = data.replace(new RegExp('sounder.js', 'g'), 'a.js');
    var b = data.replace(new RegExp('modal.js', 'g'), 'b.js');
    var c = data.replace(new RegExp('request.js', 'g'), 'c.js');
    var d = data.replace(new RegExp('brand.js', 'g'), 'd.js');
    var e = data.replace(new RegExp('gameEngine.js', 'g'), 'e.js');
    var f = data.replace(new RegExp('bullets.js', 'g'), 'f.js');
    var g = data.replace(new RegExp('score.js', 'g'), 'g.js');
    var h = data.replace(new RegExp('stopwatch.js', 'g'), 'h.js');
    var i = data.replace(new RegExp('animationTimer.js', 'g'), 'i.js');
    var j = data.replace(new RegExp('caculatePoint.js', 'g'), 'j.js');
    var k = data.replace(new RegExp('shapes.js', 'g'), 'k.js');
    var l = data.replace(new RegExp('player.js', 'g'), 'l.js');
    var m = data.replace(new RegExp('bullet-pea.js', 'g'), 'm.js');
    var n = data.replace(new RegExp('devil.js', 'g'), 'n.js');
    var o = data.replace(new RegExp('barrier.js', 'g'), 'o.js');
    var p = data.replace(new RegExp('rocket.js', 'g'), 'p.js');
    var q = data.replace(new RegExp('cannon.js', 'g'), 'q.js');
    var r = data.replace(new RegExp('fps.js', 'g'), 'r.js');
    var s = data.replace(new RegExp('result.js', 'g'), 's.js');
    var t = data.replace(new RegExp('index.js', 'g'), 't.js');


    fs.writeFileSync(filePath, newData, 'utf8');
    fs.writeFileSync(filePath, a, 'utf8');
    fs.writeFileSync(filePath, b, 'utf8');
    fs.writeFileSync(filePath, c, 'utf8');
    fs.writeFileSync(filePath, d, 'utf8');
    fs.writeFileSync(filePath, e, 'utf8');
    fs.writeFileSync(filePath, f, 'utf8');
    fs.writeFileSync(filePath, g, 'utf8');
    fs.writeFileSync(filePath, h, 'utf8');
    fs.writeFileSync(filePath, i, 'utf8');
    fs.writeFileSync(filePath, j, 'utf8');
    fs.writeFileSync(filePath, k, 'utf8');
    fs.writeFileSync(filePath, l, 'utf8');
    fs.writeFileSync(filePath, m, 'utf8');
    fs.writeFileSync(filePath, n, 'utf8');
    fs.writeFileSync(filePath, o, 'utf8');
    fs.writeFileSync(filePath, p, 'utf8');
    fs.writeFileSync(filePath, q, 'utf8');
    fs.writeFileSync(filePath, r, 'utf8');
    fs.writeFileSync(filePath, s, 'utf8');
    fs.writeFileSync(filePath, t, 'utf8');
  }
});
// 计算md5
files.forEach(function(elem, i) {
  var data = fs.readFileSync(path + elem);
  md5Info[elem] = crypto.createHash('md5').update(data).digest('hex');
});
fs.writeFile(path + md5File, JSON.stringify(md5Info));
