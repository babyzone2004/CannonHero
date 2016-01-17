var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(800, AnimationTimer.makeElastic(1));

var player = new Image();
player.src = __uri('player.png');

// 出场位置
var firstY = 1200;
var firstX = 80;
var offsetX;
var offsetY;
// 源尺寸
var sWidth = player.width;
var sHeight = player.height;
// 目标尺寸
var dWidth = player.width;
var dHeight = player.height;

// 运动的移动距离
var moveDistantY = 0;
var velocityY = 15;
var lastTime;
animationTimer.start();

// 武器相对位置
var weapon;
var weaponX = 25;
var weaponY = 68;

var particleGenerator = require('assets/js/module/particleGenerator.js').initParticle({
  numPerFrame: 0.2,
  radius: 5,
  velocityMinX: -0.5,
  velocityMaxX: -0.6,
  velocityMinY: 1.5,
  velocitymaxY: 1.6,
  fillColor: "rgba(255, 255, 255, 0.8)",
  strokeColor: "rgba(251, 88, 0, 0.15)"
});
var particleX = 10;
var particleY = 135;

var shapes = require('/assets/js/module/shapes.js');
var pointX = firstX + 25;
var pointy = firstY + 30;
var shape = shapes.initPolygon([{
  x: pointX,
  y: pointy
}, {
  x: pointX,
  y: pointy + 135
}, {
  x: pointX + 55,
  y: pointy + 45
}, {
  x: pointX + 55,
  y: pointy
}]);

function update(context, fps, stageWidth, stageHeight) {
  var elapsedTime = animationTimer.getElapsedTime();
  var dy = 0;
  if (lastTime) {
    if (animationTimer.isOver()) {
      velocityY = -velocityY;
      animationTimer.start();
      elapsedTime = null;
    } else {
      dy = velocityY * (elapsedTime - lastTime) / 1000;
      moveDistantY += dy;
    }
  }
  offsetY = firstY + moveDistantY;
  offsetX = firstX;
  // console.log('offsetY', offsetY);
  weapon && weapon.updatePositon(context, offsetX + weaponX, offsetY + weaponY);
  particleGenerator.update(offsetX + particleX, offsetY + particleY);
  shape.move(0, dy);
  lastTime = elapsedTime;
}

function paint(ctx, stageWidth, stageHeight) {
  weapon && weapon.paint(ctx, stageWidth, stageHeight);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.drawImage(player, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.restore();
  // shape.stroke(ctx);
// shape.fill(ctx);

}

function equip(_weapon) {
  weapon = _weapon;
}

function destroy() {
  // sHited.play();
  document.dispatchEvent(new Event('gameOver'));
}

function reset() {
  addEvent();
}

var bullets = require('/components/bullets/bullets.js');
var isReload = true;
// var isReload = false;
// var touchStart = false;

function addEvent() {
  document.addEventListener('touchend', fire);
  document.addEventListener('touchcancle', fire);
  document.addEventListener('touchstart', reload);
}

function removeEvent() {
  document.removeEventListener('touchend', fire);
  document.removeEventListener('touchcancle', fire);
  document.removeEventListener('touchstart', reload);
}

function fire(e) {
  if (bullets.getBullets().length === 0 && weapon && isReload) {
    weapon.stopRoate();
    weapon.fire();
  }
  // isReload = touchStart = false;
}

function reload(e) {
  touchStart = true;
  if (bullets.getBullets().length === 0) {
    // 需要填单后才能发射逻辑
    // if(isReload) {
    //   weapon.rotateStart();
    // } else {
    //   weapon.reloadBullet(function() {
    //     console.log('reload end');
    //     isReload = true
    //     touchStart && weapon.rotateStart();
    //   });
    // }
    weapon.reloadBullet();
    weapon.rotateStart();
  }
  e.preventDefault();
}

module.exports = {
  paint: paint,
  update: update,
  visible: true,
  shape: shape,
  equip: equip,
  addEvent: addEvent,
  removeEvent: removeEvent,
  reset: reset,
  destroy: destroy
};
