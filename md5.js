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
    data = data.replace(removeReg, '');

    data = data.replace(new RegExp('sounder.js', 'g'), 'a.js');
    data = data.replace(new RegExp('modal.js', 'g'), 'b.js');
    data = data.replace(new RegExp('request.js', 'g'), 'c.js');
    data = data.replace(new RegExp('brand.js', 'g'), 'd.js');
    data = data.replace(new RegExp('gameEngine.js', 'g'), 'e.js');
    data = data.replace(new RegExp('bullets.js', 'g'), 'f.js');
    data = data.replace(new RegExp('score.js', 'g'), 'g.js');
    data = data.replace(new RegExp('stopwatch.js', 'g'), 'h.js');
    data = data.replace(new RegExp('animationTimer.js', 'g'), 'i.js');
    data = data.replace(new RegExp('caculatePoint.js', 'g'), 'j.js');
    data = data.replace(new RegExp('shapes.js', 'g'), 'k.js');
    data = data.replace(new RegExp('player.js', 'g'), 'l.js');
    data = data.replace(new RegExp('bullet-pea.js', 'g'), 'm.js');
    data = data.replace(new RegExp('devil.js', 'g'), 'n.js');
    data = data.replace(new RegExp('barrier.js', 'g'), 'o.js');
    data = data.replace(new RegExp('rocket.js', 'g'), 'p.js');
    data = data.replace(new RegExp('cannon.js', 'g'), 'q.js');
    data = data.replace(new RegExp('fps.js', 'g'), 'r.js');
    data = data.replace(new RegExp('result.js', 'g'), 's.js');
    data = data.replace(new RegExp('index.js', 'g'), 't.js');


    fs.writeFileSync(filePath, data, 'utf8');
  }
});
// 计算md5
files.forEach(function(elem, i) {
  var data = fs.readFileSync(path + elem);
  md5Info[elem] = crypto.createHash('md5').update(data).digest('hex');
});
fs.writeFile(path + md5File, JSON.stringify(md5Info));
