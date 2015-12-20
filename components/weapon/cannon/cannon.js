

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
      moveDistantX += velocityX * (elapsedTime - lastTime) / 1000;
    }
  }
  lastTime = elapsedTime;

  offsetX = _offsetX + moveDistantX;
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
  }
}


module.exports = {
  paint: paint,
  updatePositon: updatePositon,
  fire: fire
};