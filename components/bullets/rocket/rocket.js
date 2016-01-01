


var img = new Image();
img.src = __uri('rocket.png');

var dWidth = 48;
var dHeight = 24;

var velocity = 600;
// 相对绘图句柄Y轴的点
var relativeY =  -13;

var particleGenerator = require('assets/js/module/particleGenerator.js');
var particle = particleGenerator.initParticle({
  numPerFrame: 0.5,
  radius: 5,
  velocityMinX: -0.05,
  velocityMaxX: 0.05,
  velocityMinY: -0.02,
  velocitymaxY: 0.02,
  fillColor: "rgba(251, 88, 0, 0.85)",
  strokeColor: "rgba(255, 255, 255, 0.9)",
  strokeSize: 8
});

var explosion = particleGenerator.initExplosion({
  radius: 5,
  velocityMinX: -1,
  velocityMaxX: 1,
  velocityMinY: -1,
  velocitymaxY: 1,
  fillColor: "rgba(251, 88, 0, 0.85)",
  strokeColor: "rgba(255, 255, 255, 0.9)",
  strokeSize: 8,
  gravity: 0.1,
  num: 20
});
var explosionX = 30;
var explosionY = 5;

var shapes = require('/assets/js/module/shapes.js');

function rocket (x, y, sin, cos, rotate) {
  this.x = x;
  this.y = y;
  this.rotate = rotate;
  this.sin = sin;
  this.cos = cos;

  var px = 8;
  var py = -5;
  var p1 = this.p1 = {
    x: 0 + px,
    y: 0 + py
  };
  var p2 = this.p2 = {
    x: 0 + px,
    y: 10 + py
  };
  var p3 = this.p3 = {
    x: 35 + px,
    y: 10 + py
  };
  var p4 = this.p4 = {
    x: 35 + px,
    y: 0 + py
  };

  var p1Rotate = Math.atan2(p1.y, p1.x) + rotate;
  var p1Lenght = Math.sqrt(p1.x * p1.x + p1.y * p1.y);
  var destP1 = {
    x: x + p1Lenght * Math.cos(p1Rotate),
    y: y + p1Lenght * Math.sin(p1Rotate)
  };
  console.log('destP1', p1Lenght * Math.cos(p1Rotate), p1Lenght * Math.sin(p1Rotate));

  var p2Rotate = Math.atan2(p2.y, p2.x) + rotate;
  var p2Lenght = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
  var destP2 = {
    x: x + p2Lenght * Math.cos(p2Rotate),
    y: y + p2Lenght * Math.sin(p2Rotate)
  };
  console.log('destP2', p2Lenght * Math.cos(p2Rotate) , p2Lenght * Math.sin(p2Rotate));

  var p3Rotate = Math.atan2(p3.y, p3.x) + rotate;
  var p3Lenght = Math.sqrt(p3.x * p3.x + p3.y * p3.y);
  var destP3 = {
    x: x + p3Lenght * Math.cos(p3Rotate),
    y: y + p3Lenght * Math.sin(p3Rotate)
  };
  console.log('destP3', p3Lenght * Math.sin(p3Rotate), p3Lenght * Math.cos(p3Rotate));

  var p4Rotate = Math.atan2(p4.y, p4.x) + rotate;
  var p4Lenght = Math.sqrt(p4.x * p4.x + p4.y * p4.y);
  var destP4 = {
    x: x + p4Lenght * Math.cos(p4Rotate),
    y: y + p4Lenght * Math.sin(p4Rotate)
  };
  console.log('destP4', p4Lenght * Math.cos(p4Rotate), p4Lenght * Math.sin(p4Rotate));
  // console.log();
  this.shape = shapes.initPolygon([destP1, destP2, destP3, destP4]);
}

rocket.prototype.collisiontRemoveCb = function () {
  // console.log('collisiontRemoveCb');
  explosion.excute(this.x + 50, this.y + 5);
}
rocket.prototype.outStageRemoveCb = function () {
  // console.log('outStageRemoveCb');
  // explosion.excute(this.x + 30, this.y + 5);
}

rocket.prototype.update = function(context, fps, stageWidth, stageHeight) {
  var dx = Math.round(velocity * this.cos / fps);
  var dy = Math.round(velocity * this.sin / fps);
  this.x += dx;
  this.y += dy;
  this.shape.move(dx, dy);
  // this.shape = shapes.update([]);
  particle.update(this.x, this.y);
}

rocket.prototype.paint = function(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotate);
  ctx.drawImage(img, 0, relativeY, dWidth, dHeight);
  ctx.restore();
  // this.shape.stroke(ctx);
  // this.shape.fill(ctx);
}

function create(x, y, sin, cos, rotate) {
  return new rocket(x, y, sin, cos, rotate);
}

module.exports = {
  create: create
};