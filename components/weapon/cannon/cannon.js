

var cannon = new Image();
cannon.src = __uri('cannon.png');
var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(100, AnimationTimer.makeEaseOut(2));


var offsetX;
var offsetY;
// 相对绘图句柄Y轴的点
var relativeY = -25;
var fireRelativeY = -9;
var dWidth = 73;
var dHeight = 32;

var bulletsX = 75;

var velocityX = -150;
var moveDistantX = 0;
var lastTime;
// 发射准备
var fireReady = true;

var bullets = require('/components/bullets/bullets.js');
var rocket = require('/components/bullets/rocket/rocket.js');

var particleGenerator = require('assets/js/module/particleGenerator.js');
var fireExplosion = particleGenerator.initExplosion({
  radius: 25,
  velocityMinX: -0.8,
  velocityMaxX: 0.8,
  velocityMinY: -0.8,
  velocitymaxY: 0.8,
  fillColor: "rgb(255, 255, 255)",
  strokeColor: "rgba(255, 79, 0, 0.23)",
  strokeSize: 10,
  num: 5,
  scaleRate: function() {
    return 0.85;
  }
});
// var exposionX = 70;
// var exposionY = 0;

function updatePositon(context, _offsetX, _offsetY) {
  if(animationTimer.isRunning) {
    var elapsedTime = animationTimer.getElapsedTime();
    if(animationTimer.isOver()) {
      if(moveDistantX < 0) {
        moveDistantX += 1;
      } else {
        moveDistantX = 0;
        fireReady = true;
      }
      animationTimer.stop();
    } else {
      moveDistantX += (0.5 + velocityX * (elapsedTime - lastTime) / 1000) << 0;
    }
    lastTime = elapsedTime;
  }

  offsetX = _offsetX + moveDistantX;
  // console.log('offsetX', offsetX, _offsetY);
  offsetY = _offsetY;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  // ctx.rotate(-45 * Math.PI / 180);
  ctx.drawImage(cannon, 0, relativeY, dWidth, dHeight);
  ctx.restore();
}

function fire() {
  if(fireReady) {
    var fireX = offsetX + bulletsX;
    var fireY = offsetY + fireRelativeY;
    fireExplosion.excute(fireX, fireY);
    bullets.add(rocket.create(fireX, fireY));
    animationTimer.start();
    fireReady = false;
  }
}

function rotate () {
  
}

module.exports = {
  paint: paint,
  updatePositon: updatePositon,
  fire: fire,
  rotate: rotate
};