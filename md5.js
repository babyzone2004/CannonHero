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

    data = data.replace(new RegExp('assets/js/module/sounder.js', 'g'), 'a.js');
    data = data.replace(new RegExp('components/layout/modal/modal.js', 'g'), 'b.js');
    data = data.replace(new RegExp('assets/js/request.js', 'g'), 'c.js');
    data = data.replace(new RegExp('components/brand/brand.js', 'g'), 'd.js');
    data = data.replace(new RegExp('assets/js/gameEngine.js', 'g'), 'e.js');
    data = data.replace(new RegExp('components/bullets/bullets.js', 'g'), 'f.js');
    data = data.replace(new RegExp('components/score/score.js', 'g'), 'g.js');
    data = data.replace(new RegExp('assets/js/stopwatch.js', 'g'), 'h.js');
    data = data.replace(new RegExp('assets/js/animationTimer.js', 'g'), 'i.js');
    data = data.replace(new RegExp('assets/js/module/caculatePoint.js', 'g'), 'j.js');
    data = data.replace(new RegExp('assets/js/module/shapes.js', 'g'), 'k.js');
    data = data.replace(new RegExp('components/role/player/player.js', 'g'), 'l.js');
    data = data.replace(new RegExp('components/bullets/bullet-pea/bullet-pea.js', 'g'), 'm.js');
    data = data.replace(new RegExp('components/role/enemy/devil/devil.js', 'g'), 'n.js');
    data = data.replace(new RegExp('components/role/barrier/barrier.js', 'g'), 'o.js');
    data = data.replace(new RegExp('components/bullets/rocket/rocket.js', 'g'), 'p.js');
    data = data.replace(new RegExp('components/weapon/cannon/cannon.js', 'g'), 'q.js');
    data = data.replace(new RegExp('components/fps/fps.js', 'g'), 'r.js');
    data = data.replace(new RegExp('components/layout/result.js', 'g'), 's.js');
    data = data.replace(new RegExp('views/index/index.js', 'g'), 't.js');
    data = data.replace(new RegExp('components/layout/login/login.js', 'g'), 'u.js');
    data = data.replace(new RegExp('assets/js/module/render.js', 'g'), 'v.js');
    data = data.replace(new RegExp('components/loading/loading.js', 'g'), 'w.js');
    data = data.replace(new RegExp('components/layout/user/user.js', 'g'), 'x.js');
    data = data.replace(new RegExp('components/layout/rank/rank.js', 'g'), 'y.js');
    data = data.replace(new RegExp('components/layout/about/about.js', 'g'), 'z.js');
    data = data.replace(new RegExp('components/nav/nav.js', 'g'), '1.js');
    data = data.replace(new RegExp('components/overlay/overlay.js', 'g'), '2.js');
    data = data.replace(new RegExp('assets/js/module/loader.js', 'g'), '3.js');
    data = data.replace(new RegExp('components/load/load.js', 'g'), '4.js');
    data = data.replace(new RegExp('components/load/load.js', 'g'), '4.js');
    data = data.replace(new RegExp('assets/js/module/particleGenerator.js', 'g'), '5.js');
    data = data.replace(new RegExp('components/bg/bg.js', 'g'), '6.js');


    fs.writeFileSync(filePath, data, 'utf8');
  }
});
// 计算md5
files.forEach(function(elem, i) {
  var data = fs.readFileSync(path + elem);
  md5Info[elem] = crypto.createHash('md5').update(data).digest('hex');
});
fs.writeFile(path + md5File, JSON.stringify(md5Info));
