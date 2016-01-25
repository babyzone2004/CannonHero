var img = new Image();
img.src = __uri('bullet-pea.png');

var velocity = -1800;
// 相对绘图句柄Y轴的点
var relativePoint = -8;

var particleGenerator = require('assets/js/module/particleGenerator.js');
var particle = particleGenerator.initParticle({
  numPerFrame: 5,
  radius: 3,
  velocityMinX: -0,
  velocityMaxX: 0,
  velocityMinY: -0,
  velocitymaxY: 0,
  fillColor: "rgba(57, 59, 2, 0.5)",
  strokeColor: "rgba(57, 59, 2, 0.5)",
  strokeSize: 9,
  scaleRate: function() {
    return 0.9;
  }
});
var explosion = particleGenerator.initExplosion({
  radius: 85,
  velocityMinX: -5,
  velocityMaxX: 5,
  velocityMinY: -5,
  velocitymaxY: 5,
  fillColor: "rgb(255, 255, 255)",
  strokeColor: "rgba(255, 79, 0, 0.23)",
  strokeSize: 55,
  num: 10,
  scaleRate: function() {
    return 0.85;
  }
});
var explosionX = 32;
var explosionY = 5;

var shapes = require('/assets/js/module/shapes.js');

function rocket(x, y, sin, cos) {
  this.x = x;
  this.y = y;
  this.sin = sin;
  this.cos = cos;
  this.shape = shapes.initPolygon([{
    x: x - relativePoint,
    y: y - relativePoint
  }, {
    x: x - relativePoint,
    y: y + relativePoint
  }, {
    x: x + relativePoint,
    y: y + relativePoint
  }, {
    x: x + relativePoint,
    y: y - relativePoint
  }]);
}

rocket.prototype.collisiontRemoveCb = function() {
  explosion.excute(this.x, this.y);
}

rocket.prototype.update = function(context, fps, stageWidth, stageHeight) {
  var dx = velocity * this.cos / fps;
  var dy = velocity * this.sin / fps;
  this.x += dx;
  this.y += dy;

  this.shape.move(dx, dy);
  particle.update(this.x, this.y);
  // console.log('rotate', this.rotate);
}

rocket.prototype.paint = function(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.drawImage(img, relativePoint, relativePoint);
  ctx.restore();
  // this.shape.stroke(ctx);
  // this.shape.fill(ctx);
}
rocket.prototype.missCb = function() {
  console.log('missCb');
}

function create(x, y, sin, cos) {
  return new rocket(x, y, sin, cos);
}

module.exports = {
  create: create
};
