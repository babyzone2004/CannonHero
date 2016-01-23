var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(800, AnimationTimer.makeElastic(1));

var player = new Image();
player.src = __uri('pea.png');

var sounder = require('/assets/js/module/sounder.js');
var sHited = new Howl({
  urls: [__uri('/assets/sounds/coin.mp3'), __uri('/assets/sounds/coin.wav')]
});

// 出场位置
var firstY = 1080;
var firstX = 800;
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
var moveDistantX = 0;
var velocityY = 5;
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
var particleOpt = {
  numPerFrame: 0.03,
  radius: 5,
  strokeSize: 1,
  velocityMinX: 0,
  velocityMaxX: 0,
  velocityMinY: 0,
  velocitymaxY: 3,
  fillColor: "#31d7e8",
  strokeColor: "rgba(19, 31, 29, 0.75)"
};

var particle2Opt = clone(particleOpt);
particle2Opt.numPerFrame = 0.01;
var particle2 = particleGenerator.initParticle(particle2Opt);
var particle2X = 14;
var particle2Y = 225;

var particle1Opt = clone(particleOpt);
particle1Opt.numPerFrame = 0.02;
var particle1 = particleGenerator.initParticle(particle1Opt);
var particle1X = 31;
var particle1Y = 230;


var particle = particleGenerator.initParticle(particleOpt);
var particleX = 57;
var particleY = 237;

var particle3 = particleGenerator.initParticle(particle2Opt);
var particle3X = 93;
var particle3Y = 232;

var particle4 = particleGenerator.initParticle(particle1Opt);
var particle4X = 112;
var particle4Y = 224;

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
var shape = shapes.initPolygon(getPoints(firstX + 30, firstY + 30));

function getPoints(x, y) {
  return [{
    x: x,
    y: y
  }, {
    x: x - 18,
    y: y + 68
  }, {
    x: x + 10,
    y: y + 88
  }, {
    x: x + 75,
    y: y - 18
  }];
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function resetShape() {
  pointX = firstX + moveDistantX + 30;
  pointy = firstY + moveDistantY + 30;
  shape.points = getPoints(pointX, pointy);
}


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
  var dx = 0;
  if (moveDistantX > 0) {
    dx = -velocityX / fps
    moveDistantX += dx;
  } else {
    document.dispatchEvent(new Event('enemyReady'));
  }
  // offsetY = firstY;
  offsetY = firstY + moveDistantY;
  offsetX = firstX + moveDistantX;
  // console.log('offsetY', offsetY);
  weapon.updatePositon(context, offsetX + weaponX, offsetY + weaponY);
  particle.update(offsetX + particleX, offsetY + particleY);
  particle1.update(offsetX + particle1X, offsetY + particle1Y);
  particle2.update(offsetX + particle2X, offsetY + particle2Y);
  particle3.update(offsetX + particle3X, offsetY + particle3Y);
  particle4.update(offsetX + particle4X, offsetY + particle4Y);
  shape.move(dx, dy);
  lastTime = elapsedTime;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.drawImage(player, 0, 0);
  ctx.restore();

  weapon.paint(ctx, stageWidth, stageHeight);
  // shape.lineWidth = 1;
  // shape.stroke(ctx);
  // shape.fill(ctx);
}

function equip(_weapon) {
  weapon = _weapon;
}

var score = require('/components/score/score.js');

function destroy(bingo) {
  // sHited.play();
  // 如果是致命一击
  if (bingo) {
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
