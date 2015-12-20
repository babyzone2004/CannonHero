/*
 * 子弹工厂
*/

var bullets = [];

function update(context, fps, stageWidth, stageHeight) {
  // 循环遍历子弹
  bullets = bullets.filter(function(bullet) {
    var bulletX = bullet.x;
    var bulletY = bullet.y;
    if(bulletX < 0 || bulletX > stageWidth || bulletY < 0 || bulletY > stageHeight) {
      console.log('destroy bullet');
      return false;
    } else {
      bullet.update(context, fps, stageWidth, stageHeight);
      return true;
    }
  });
console.log(fps);
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

module.exports = {
  paint: paint,
  update: update,
  add: add,
  visible: true
};