var img = new Image();
img.src = __uri('pea.png');

var velocity = 1500;
// 相对绘图句柄Y轴的点
var relativeY = -13;

// var GRAVITY_FORCE = 9.81; // 9.81 m/s / s
// var velocityY = ;
var explosion = particleGenerator.initExplosion({
  radius: 55,
  velocityMinX: -5,
  velocityMaxX: 5,
  velocityMinY: -5,
  velocitymaxY: 5,
  fillColor: "rgb(255, 255, 255)",
  strokeColor: "rgba(255, 79, 0, 0.23)",
  strokeSize: 45,
  num: 10,
  scaleRate: function() {
    return 0.85;
  }
});
var explosionX = 32;
var explosionY = 5;

var shapes = require('/assets/js/module/shapes.js');

function rocket(x, y, sin, cos, rotate) {
  this.x = x;
  this.y = y;
  this.rotate = rotate;
  this.sin = sin;
  this.cos = cos;
  this.gVelocity = 0;

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

  this.shape = shapes.initPolygon([destP1, destP2, destP3, destP4]);
}

rocket.prototype.collisiontRemoveCb = function() {
  // console.log('collisiontRemoveCb');
  var explosionPoint = caculatePoint(this.x, this.y, explosionX, explosionY, this.rotate);
  explosion.excute(explosionPoint.x, explosionPoint.y);
}
rocket.prototype.missCb = function() {
  // console.log('outStageRemoveCb');
  // explosion.excute(this.x + 30, this.y + 5);
  document.dispatchEvent(new Event('gameOver'));
}

rocket.prototype.update = function(context, fps, stageWidth, stageHeight) {
  this.gVelocity += GRAVITY_FORCE * 1 / fps * pixelsPerMeter;
  var dx = velocity * this.cos / fps;
  var dy = (this.gVelocity + velocity * this.sin) / fps;
  this.x += dx;
  this.y += dy;
  this.rotate = Math.atan2(dy, dx);
  this.shape.move(dx, dy);
  // console.log('rotate', this.rotate);
  this.shape.update(this.x, this.y, this.rotate);
  particle.update(this.x, this.y);
}

rocket.prototype.paint = function(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotate);
  ctx.drawImage(img, 0, relativeY, dWidth, dHeight);
  ctx.restore();
  this.shape.stroke(ctx);
  this.shape.fill(ctx);
}

function create(x, y, sin, cos, rotate) {
  return new rocket(x, y, sin, cos, rotate);
}

module.exports = {
  create: create
};
