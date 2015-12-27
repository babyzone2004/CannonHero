


var img = new Image();
img.src = __uri('rocket.png');

var dWidth = 48;
var dHeight = 24;

var velocityX = 800;

function rocket (x, y) {
  this.x = x;
  this.y = y;
}

rocket.prototype.update = function(context, fps, stageWidth, stageHeight) {
  this.x += (0.5 + velocityX / fps) << 0;
}

rocket.prototype.paint = function(ctx, stageWidth, stageHeight) {
  ctx.drawImage(img, this.x, this.y, dWidth, dHeight);
}

function create(x, y) {
  return new rocket(x, y);
}

module.exports = {
  create: create
};