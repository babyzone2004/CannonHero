var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(800, AnimationTimer.makeElastic(1));

var player = new Image();
player.src = __uri('player.png');


  // 源尺寸
var sWidth = player.width;
var sHeight = player.height;
// 目标尺寸
var dWidth = player.width;
var dHeight = player.height;

// 出场位置
var firstY;
var firstX;
var offsetPoint = {
    x: 0,
    y: 0
  };
// 运动的移动距离
var moveDistantY;
var moveDistantX;
var gVelocity;
var velocityY;

// 目标是否存在
var isLive;
var lastTime;
function init() {
  firstY = 1300;
  firstX = 80;
  offsetPoint.x = 0;
  offsetPoint.y = 0;
  moveDistantY = 0;
  moveDistantX = 0;
  gVelocity = 0;
  velocityY = 15;
  isLive = true;
  lastTime = 0;
}
init();


animationTimer.start();
// 武器相对位置
var weapon;
var weaponX = 56;
var weaponY = 58;

var particleGenerator = require('assets/js/module/particleGenerator.js').initParticle({
  numPerFrame: 0.2,
  radius: 5,
  velocityMinX: -0.5,
  velocityMaxX: -0.6,
  velocityMinY: 1.5,
  velocitymaxY: 1.6,
  strokeSize: 4,
  fillColor: "rgba(245, 245, 12, 0.80)",
  strokeColor: "rgba(255, 66, 0, 0.5)"
});
var particleX = 20;
var particleY = 105;

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
  if (isLive) {
    if (animationTimer.isOver()) {
      velocityY = -velocityY;
      animationTimer.start();
      elapsedTime = null;
    } else {
      dy = velocityY * (elapsedTime - lastTime) / 1000;
      moveDistantY += dy;
    }
    offsetPoint.x = firstX + moveDistantX + weapon.moveDistant.x / 2;
    offsetPoint.y = firstY + moveDistantY + weapon.moveDistant.y / 2;
    // console.log('offsetPoint.y', offsetPoint.y);
    weapon.updatePositon(context, offsetPoint.x + weaponX, offsetPoint.y + weaponY);
    particleGenerator.update(offsetPoint.x + particleX, offsetPoint.y + particleY);
    shape.move(0, dy);
    lastTime = elapsedTime;
  } else {
    gVelocity += GRAVITY_FORCE * 1 / fps * pixelsPerMeter;
    moveDistantX -= 25;
    moveDistantY = moveDistantY - 60 + gVelocity;
    offsetPoint.x = firstX + moveDistantX;
    offsetPoint.y = firstY + moveDistantY;
    weapon.update(fps);
    // console.log('offsetPoint.y', offsetPoint.y);
  }
}

function paint(ctx, stageWidth, stageHeight) {
  weapon && weapon.paint(ctx, stageWidth, stageHeight);
  ctx.save();
  ctx.translate(offsetPoint.x, offsetPoint.y);
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
  isLive = false;
  weapon.destroy();
  setTimeout(function() {
    document.dispatchEvent(new Event('gameOver'));
  }, 800);
}

function reset() {
  addEvent();
  init();
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
  destroy: destroy,
  point: offsetPoint
};
