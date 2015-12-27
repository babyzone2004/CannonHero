
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
var weaponX = 18;
var weaponY = 0;

var particleGenerator = require('assets/js/module/particleGenerator.js')(20, 5, 1);
var particleX = 25;
var particleY = 50;

function update(context, fps, stageWidth, stageHeight) {
  var elapsedTime = animationTimer.getElapsedTime();
  if(lastTime) {
    if(animationTimer.isOver()) {
      velocityY = -velocityY;
      animationTimer.start();
      elapsedTime = null;
    } else {
      moveDistantY += velocityY * (elapsedTime - lastTime) / 1000;
    }
  }
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
  if(globalAlpha !== 0) {
    ctx.globalAlpha = globalAlpha;
    ctx.drawImage(player, 0, 250, sWidth, sHeight, 0, 0, dWidth, dHeight);
  }
  ctx.restore();

  weapon.paint(ctx, stageWidth, stageHeight);
  particleGenerator.paint(ctx);
}

function equip(_weapon) {
  weapon = _weapon;
}

document.addEventListener('touchend', function() {
  weapon && weapon.fire();
});

module.exports = {
  paint: paint,
  update: update,
  visible: true,
  equip: equip
};