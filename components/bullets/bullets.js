/*
 * 子弹工厂
 */

var bullets = [];
var targets = [];
var buffer = 50;
var left;
var right;
var top;
var bottom;

function update(context, fps, stageWidth, stageHeight) {
  // 循环遍历子弹
  bullets = bullets.filter(function(bullet) {
    var bulletX = bullet.x;
    var bulletY = bullet.y;

    var isCollision = false;
    var isTouchBottom = false;
    for (var i = 0, ii = targets.length; i < ii; i++) {
      var target = targets[i];
      // 碰到实体
      isCollision = bullet.shape.collidesWith(target.shape);
      // 着地
      isTouchBottom = bulletY >= bottom;
      if (isCollision) {
        bullet.collisiontRemoveCb();
        target.destroy(bullet.rotate > 1);
        break;
      }
      if (isTouchBottom) {
        bullet.collisiontRemoveCb();
        break;
      }
    }
    if (isCollision) {
      !target.isEnemy && bullet.missCb();
      console.log('isCollision', isCollision);
      return false;
    }

    var isOutStage = bulletX < left || bulletX > right || bulletY < top;
    if (isOutStage || isTouchBottom) {
      console.log('isTouchBottom', isTouchBottom);
      console.log('isOutStage', isOutStage);
      bullet.missCb();
      return false;
    }

    bullet.update(context, fps, stageWidth, stageHeight);
    return true;
  });
}

function paint(ctx, stageWidth, stageHeight) {
  // 循环遍历子弹
  for (var i = 0, ii = bullets.length; i < ii; i++) {
    bullets[i].paint(ctx, stageWidth, stageHeight);
  }
}

function add(bullet) {
  bullets.push(bullet);
}

function addTarget(target) {
  targets.push(target);
}

function init(stageWidth, stageHeight) {
  left = 0 - buffer;
  right = stageWidth + buffer;
  top = 0 - buffer;
  bottom = stageHeight - buffer;
}

function getBullets() {
  return bullets;
}

module.exports = {
  init: init,
  paint: paint,
  update: update,
  add: add,
  addTarget: addTarget,
  visible: true,
  getBullets: getBullets
};
