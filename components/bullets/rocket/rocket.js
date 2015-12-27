


var img = new Image();
img.src = __uri('rocket.png');

var dWidth = 48;
var dHeight = 24;

var velocityX = 600;

var particleGenerator = require('assets/js/module/particleGenerator.js')({
	numPerFrame: 0.5,
	radius: 5,
	velocity: 1,
	fillColor: "rgba(247, 67, 2, 0.5)",
	strokeColor: "rgba(255, 255, 255, 0.9)",
	strokeSize: 8
});
var particleX = 5;
var particleY = 12;

function rocket (x, y) {
  this.x = x;
  this.y = y;
}

rocket.prototype.update = function(context, fps, stageWidth, stageHeight) {
  this.x += (0.5 + velocityX / fps) << 0;
  particleGenerator.update(this.x + particleX, this.y + particleY);
}

rocket.prototype.paint = function(ctx, stageWidth, stageHeight) {
  ctx.drawImage(img, this.x, this.y, dWidth, dHeight);
  particleGenerator.paint(ctx);
}

function create(x, y) {
  return new rocket(x, y);
}

module.exports = {
  create: create
};