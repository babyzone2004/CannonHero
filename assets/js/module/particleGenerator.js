
/*
 * @descrition 粒子生成器
*/

var angle =  2 * Math.PI;

function randomRange(min, max) {
  return ((Math.random() * (max - min)) + min);
}
function createParticle(x, y, opt){
  var particle = {};
  particle.x = x;
  particle.y = y;
  particle.xSpeed = randomRange(opt.velocityMinX, opt.velocityMaxX);
  particle.ySpeed = randomRange(opt.velocityMinY , opt.velocitymaxY);
  particle.radius  = randomRange(5, opt.radius);
  particle.strokeSize = opt.strokeSize || 13;

  return particle;
}

function ParticleGenerator(opt) {
  this.opt = opt;
  this.COLOR = opt.fillColor || "rgba(255, 255, 255, 0.8)";
  this.STROKE_COLOR = opt.strokeColor || "rgba(251, 88, 0, 0.15)";
  // 每秒生成粒子数
  this.num = this.numPerFrame = opt.numPerFrame || 1;
  this.radius = opt.radius;
  this.VELOCITY = opt.velocity;
  this.strokeSize = opt.strokeSize;

  this.particleArray = [];
}

ParticleGenerator.prototype.update = function(offsetX, offsetY) {
  var numPerFrame = this.numPerFrame;
  var num = this.num;
  var particleArray = this.particleArray;
  var radius = this.radius;
  var strokeSize = this.strokeSize;
  var opt = this.opt;

  var rate = 1 / num;
  if(rate > 1) {
    this.num = num + this.numPerFrame;
  } else {
    this.num = this.numPerFrame;
  }

  for(var i = 1; i <= num; i++) {
    particleArray.push(createParticle(offsetX, offsetY, opt));
  }

  this.particleArray = particleArray.filter(function (particle, i) {
    particle.x = particle.x + particle.xSpeed;
    particle.y = particle.y + particle.ySpeed;
    var scaleRate = (0.92 + (randomRange(1, 8) / 100));
    particle.radius = particle.radius * scaleRate;
    particle.strokeSize = particle.strokeSize * scaleRate;

    return  particle.radius > 1
  })
  // console.log(this.particleArray.length);
}

ParticleGenerator.prototype.paint = function(ctx) {
  var particleArray = this.particleArray;
  var COLOR = this.COLOR;
  var STROKE_COLOR = this.STROKE_COLOR;

  for(var i = 0, ii = particleArray.length; i < ii; i++){
    var particle = particleArray[i];
    ctx.beginPath();
    ctx.lineWidth = particle.strokeSize;
    ctx.fillStyle = COLOR;
    ctx.strokeStyle = STROKE_COLOR;
    ctx.arc(particle.x, particle.y, particle.radius, 0, angle, false);
    ctx.fill();
    ctx.stroke();
  }
  ctx.closePath();
}

function init (opt) {
  return new ParticleGenerator(opt);
}

module.exports = init;