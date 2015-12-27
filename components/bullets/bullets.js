/*
 * 子弹工厂
*/

var bullets = [];
var buffer = 500;
var left;
var right;
var top;
var bottom;

function update(context, fps, stageWidth, stageHeight) {
  // 循环遍历子弹
  bullets = bullets.filter(function(bullet) {
    var bulletX = bullet.x;
    var bulletY = bullet.y;
    if(bulletX < left || bulletX > right || bulletY < top || bulletY > bottom) {
      return false;
    } else {
      bullet.update(context, fps, stageWidth, stageHeight);
      return true;
    }
  });
}

function paint(ctx, stageWidth, stageHeight) {
  // 循环遍历子弹
  for(var i = 0, ii = bullets.length; i < ii; i++) {
    bullets[i].paint(ctx, stageWidth, stageHeight);
  }
}

function add(bullet) {
  bullets.push(bullet);
}
function init (stageWidth, stageHeight) {
  left = 0 - buffer;
  right = stageWidth + buffer;
  top = 0 - buffer;
  bottom = stageHeight + buffer;
}

module.exports = {
  init: init,
  paint: paint,
  update: update,
  add: add,
  visible: true
};