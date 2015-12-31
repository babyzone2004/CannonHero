

var cannon = new Image();
cannon.src = __uri('cannon.png');
var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(100, AnimationTimer.makeEaseOut(2));


var offsetX;
var offsetY;
var dWidth = 73;
var dHeight = 32;

var bulletsX = 60;

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
  scaleRate: 0.85
});
var exposionX = 70;
var exposionY = 15;

function updatePositon(context, _offsetX, _offsetY) {
  var elapsedTime = animationTimer.getElapsedTime();
  if(lastTime) {
    if(animationTimer.isOver()) {
      if(moveDistantX < 0) {
        moveDistantX += 1;
      } else {
        moveDistantX = 0;
        fireReady = true;
        animationTimer.stop();
      }
    } else {
      moveDistantX += (0.5 + velocityX * (elapsedTime - lastTime) / 1000) << 0;
    }
  }
  lastTime = elapsedTime;

  offsetX = _offsetX + moveDistantX;
  // console.log('offsetX', offsetX, _offsetY);
  offsetY = _offsetY;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.drawImage(cannon, offsetX, offsetY, dWidth, dHeight);
}

function fire() {
  if(fireReady) {
    bullets.add(rocket.create(offsetX + bulletsX, offsetY));
    animationTimer.start();
    fireReady = false;
    fireExplosion.excute(offsetX + exposionX, offsetY + exposionY);
  }
}


module.exports = {
  paint: paint,
  updatePositon: updatePositon,
  fire: fire
};