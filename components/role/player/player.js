
var animationTimer = require('/assets/js/animationTimer.js')(500, 'makeElastic');

var player = new Image();
player.src = __uri('player.png');

var offsetX = 80;
var offsetY = 800;
var sWidth = 140;
var sHeight = 98;
var dWidth = 140;
var dHeight = 98;
var globalAlpha = 0;

var moveDistantY = 0;
var velocityY = 15;
var lastTime;
animationTimer.start();

function update(context, fps, stageWidth, stageHeight) {
  var elapsedTime = animationTimer.getElapsedTime();
  if(lastTime) {
    if(!animationTimer.isOver()) {
      moveDistantY += velocityY * (elapsedTime - lastTime) / 1000;
    } else {
      velocityY = -velocityY;
      animationTimer.start();
      elapsedTime = null;
    }
  }
  lastTime = elapsedTime;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY + moveDistantY);
  ctx.globalAlpha = 0.5;
  ctx.drawImage(player, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.globalAlpha = 1;
  ctx.drawImage(player, 0, 127, sWidth, sHeight, 0, 0, dWidth, dHeight);
  if(globalAlpha !== 0) {
    ctx.globalAlpha = globalAlpha;
    ctx.drawImage(player, 0, 250, sWidth, sHeight, 0, 0, dWidth, dHeight);
  }
  ctx.restore();
}


module.exports = {
  paint: paint,
  update: update,
  visible: true
};