
var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(800, AnimationTimer.makeElastic(1));

var player = new Image();
player.src = __uri('pea.png');

var sounder = require('/assets/js/module/sounder.js');
var sHited = new Howl({
  urls: [__uri('/assets/sounds/coin.wav')]
});

// 出场位置
var firstY = 780;
var firstX = 800;
var offsetX;
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
var moveDistantX = 0;
var velocityY = 15;
var velocityX = 150;
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

var particleGenerator = require('assets/js/module/particleGenerator.js');
var particle = particleGenerator.initParticle({
  numPerFrame: 0.2,
  radius: 5,
  velocityMinX: 0,
  velocityMaxX: 1.5,
  velocityMinY: -0.05,
  velocitymaxY: 0.05,
  fillColor: "rgba(255, 255, 255, 0.8)",
  strokeColor: "rgba(251, 88, 0, 0.15)"
});
var particleX = 121;
var particleY = 50;

var explosion = particleGenerator.initExplosion({
  radius: 10,
  velocityMinX: -2.5,
  velocityMaxX: 2.5,
  velocityMinY: -2.5,
  velocitymaxY: 2.5,
  fillColor: "rgba(251, 88, 0, 0.85)",
  strokeColor: "rgba(255, 255, 255, 0.9)",
  strokeSize: 18,
  gravity: 0.1,
  num: 30
});
var explosionX = 60;
var explosionY = 50;

var shapes = require('/assets/js/module/shapes.js');

var pointX = firstX + 30;
var pointy = firstY + 30;
var shape = shapes.initPolygon([{x: pointX, y: pointy}, {x: pointX - 15, y: pointy + 38}, {x: pointX + 80, y: pointy + 38}, {x: pointX + 100, y: pointy}]);

function resetShape() {
  pointX = firstX + moveDistantX + 30;
  pointy = firstY + moveDistantY + 30;
  shape.points = [{x: pointX, y: pointy}, {x: pointX - 15, y: pointy + 38}, {x: pointX + 80, y: pointy + 38}, {x: pointX + 100, y: pointy}];
}


function update(context, fps, stageWidth, stageHeight) {
  var elapsedTime = animationTimer.getElapsedTime();
  var dy = 0;
  if(lastTime) {
    if(animationTimer.isOver()) {
      velocityY = -velocityY;
      animationTimer.start();
      elapsedTime = null;
    } else {
      dy = velocityY * (elapsedTime - lastTime) / 1000;
      moveDistantY += dy;
    }
  }
  var dx = 0;
  if(moveDistantX > 0) {
    dx = -velocityX / fps
    moveDistantX += dx;
  } else {
    document.dispatchEvent(new Event('enemyReady'));
  }
  offsetY = firstY + moveDistantY;
  offsetX = firstX + moveDistantX;
  // console.log('offsetY', offsetY);
  weapon.updatePositon(context, offsetX + weaponX, offsetY + weaponY);
  particle.update(offsetX + particleX, offsetY + particleY);
  shape.move(dx, dy);
  lastTime = elapsedTime;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.drawImage(player, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.drawImage(player, 0, 127, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.restore();

  weapon.paint(ctx, stageWidth, stageHeight);
  // shape.stroke(ctx);
  // shape.fill(ctx);
}

function equip(_weapon) {
  weapon = _weapon;
}

var score = require('/components/score/score.js');
function destroy (bingo) {
  sHited.play();
  // 如果是致命一击
  if(bingo) {
    console.log('bingo');
    score.add(3);
  } else {
    score.add(1);
  }
  document.dispatchEvent(new Event('destroyEnemy'));
}

function reset() {
  moveDistantX = 0;
  moveDistantY = randomRange(-250, 200);
  resetShape();
}

function create() {
  moveDistantX = 500;
  moveDistantY = randomRange(-250, 200);
  resetShape();
  explosion.excute(offsetX + explosionX, offsetY + explosionY);
}

function randomRange(min, max) {
  return ((Math.random() * (max - min)) + min);
}

module.exports = {
  paint: paint,
  update: update,
  visible: true,
  shape: shape,
  equip: equip,
  create: create,
  reset: reset,
  destroy: destroy
};