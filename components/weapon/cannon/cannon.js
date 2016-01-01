

var cannon = new Image();
cannon.src = __uri('cannon.png');
var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(100, AnimationTimer.makeEaseOut(2));


var offsetX;
var offsetY;
// 相对绘图句柄Y轴的点
var relativeY = -16;
var fireRelativeY = 0;
var dWidth = 73;
var dHeight = 32;
var rotageAngle = 0;
var isRoate = false;
var sin = 1;
var cos = 1;

var bulletsX = 75;

var velocityX = -150;
var moveDistantX = 0;
var moveDistantY = 0;
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
      if(moveDistantX < 0 || moveDistantY > 0) {
        moveDistantX < 0? moveDistantX += 1 * cos : 0;
        moveDistantY > 0? moveDistantY += 1 * sin : 0;
      } else {
        fireReady = true;
      }
      animationTimer.stop();
    } else {
      var distant = (0.5 + velocityX * (elapsedTime - lastTime) / 1000) << 0
      moveDistantX += distant * cos;
      moveDistantY += distant * sin;
      console.log(distant * cos, distant * sin, distant);
    }
    lastTime = elapsedTime;
  }
  if(isRoate && rotageAngle >= -90) {
    rotageAngle--
  }
  offsetX = _offsetX + moveDistantX;
  // console.log('offsetX', offsetX, _offsetY);
  offsetY = _offsetY + moveDistantY;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.rotate(rotageAngle * Math.PI / 180);
  ctx.drawImage(cannon, 0, relativeY, dWidth, dHeight);
  ctx.restore();
}

function fire() {
  if(fireReady) {
    sin = Math.sin(rotageAngle * Math.PI / 180);
    cos = Math.cos(rotageAngle * Math.PI / 180);
    console.log(rotageAngle, sin, cos);
    var fireX = offsetX + bulletsX * cos;
    var fireY = offsetY + fireRelativeY + bulletsX * sin;
    fireExplosion.excute(fireX, fireY);
    // bullets.add(rocket.create(fireX, fireY));
    animationTimer.start();
    fireReady = false;
  }
}

function rotateStart () {
  isRoate = true;
  console.log('isRoate', isRoate);
}
function stopRoate () {
  isRoate = false;
  fire();
  console.log('isRoate', isRoate);
}

module.exports = {
  paint: paint,
  updatePositon: updatePositon,
  fire: fire,
  rotateStart: rotateStart,
  stopRoate: stopRoate
};