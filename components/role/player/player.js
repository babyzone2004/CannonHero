
var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(800, AnimationTimer.makeElastic(1));

var player = new Image();
player.src = __uri('player.png');

// 出场位置
var fisrtY = 800;
var offsetX = 80;
var offsetY;
// 源尺寸
var sWidth = 140;
var sHeight = 98;
// 目标尺寸
var dWidth = 140;
var dHeight = 98;
var globalAlpha = 0;

// 运动的移动距离
var moveDistantY = 0;
var velocityY = 15;
var lastTime;
animationTimer.start();

// 武器相对位置
var weapon = {
  updatePositon: function() {},
  fire: function() {},
  paint: function() {}
};
var weaponX = 25;
var weaponY = 25;

var particleGenerator = require('assets/js/module/particleGenerator.js').initParticle({
  numPerFrame: 0.2,
  radius: 5,
  velocityMinX: -1.5,
  velocityMaxX: 0,
  velocityMinY: -0.05,
  velocitymaxY: 0.05,
  fillColor: "rgba(255, 255, 255, 0.8)",
  strokeColor: "rgba(251, 88, 0, 0.15)"
});
var particleX = 18;
var particleY = 50;

function update(context, fps, stageWidth, stageHeight) {
  var elapsedTime = animationTimer.getElapsedTime();
  // if(lastTime) {
  //   if(animationTimer.isOver()) {
  //     velocityY = -velocityY;
  //     animationTimer.start();
  //     elapsedTime = null;
  //   } else {
  //     moveDistantY += velocityY * (elapsedTime - lastTime) / 1000;
  //   }
  // }
  offsetY = fisrtY + moveDistantY;
  // console.log('offsetY', offsetY);
  weapon.updatePositon(context, offsetX + weaponX, offsetY + weaponY);
  particleGenerator.update(offsetX + particleX, offsetY + particleY);
  lastTime = elapsedTime;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.drawImage(player, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.drawImage(player, 0, 127, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.restore();

  weapon.paint(ctx, stageWidth, stageHeight);
}

function equip(_weapon) {
  weapon = _weapon;
}

document.addEventListener('touchend', function() {
  weapon && weapon.fire();
});
document.addEventListener('touchstart', function() {
  weapon.rotateStart();
});
document.addEventListener('touchcancle', function() {
  weapon.stopRoate();
});
document.addEventListener('touchend', function() {
  weapon.stopRoate();
});

module.exports = {
  paint: paint,
  update: update,
  visible: true,
  equip: equip
};