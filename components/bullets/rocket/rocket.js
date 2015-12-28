


var img = new Image();
img.src = __uri('rocket.png');

var dWidth = 48;
var dHeight = 24;

var velocityX = 600;

var particleGenerator = require('assets/js/module/particleGenerator.js')({
  numPerFrame: 0.5,
  radius: 5,
  velocityMinX: -1.5,
  velocityMaxX: 0,
  velocityMinY: -0.05,
  velocitymaxY: 0.05,
  fillColor: "rgba(251, 88, 0, 0.85)",
  strokeColor: "rgba(255, 255, 255, 0.9)",
  strokeSize: 8
});

var particleX = 5;
var particleY = 12;

var shapes = require('/assets/js/module/shapes.js');

function rocket (x, y) {
  this.x = x;
  this.y = y;
  var pointY = y + 5;
  this.shape = shapes.initPolygon([{x: x, y: pointY}, {x: x, y: pointY + 10}, {x: x + 40, y: pointY + 10}, {x: x + 40, y: pointY}]);
}

rocket.prototype.update = function(context, fps, stageWidth, stageHeight) {
  var dx = (0.5 + velocityX / fps) << 0;
  this.x += dx;
  this.shape.move(dx, 0);
  particleGenerator.update(this.x + particleX, this.y + particleY);
}

rocket.prototype.paint = function(ctx, stageWidth, stageHeight) {
  ctx.drawImage(img, this.x, this.y, dWidth, dHeight);
  particleGenerator.paint(ctx);
  // this.shape.stroke(ctx);
  // this.shape.fill(ctx);
}

function create(x, y) {
  return new rocket(x, y);
}

module.exports = {
  create: create
};