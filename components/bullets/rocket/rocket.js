


var img = new Image();
img.src = __uri('rocket.png');

var dWidth = 48;
var dHeight = 24;

var velocityX = 300;

function rocket (x, y) {
  this.x = x;
  this.y = y;
}

rocket.prototype.update = function(context, fps, stageWidth, stageHeight) {
  this.x += velocityX / fps;
}

rocket.prototype.paint = function(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.drawImage(img, this.x, this.y, dWidth, dHeight);
  ctx.restore();
}

function create(x, y) {
  return new rocket(x, y);
}

module.exports = {
  create: create
};