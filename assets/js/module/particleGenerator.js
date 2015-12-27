
/*
 * @descrition 粒子生成器
*/

var angle =  2 * Math.PI;

function randomRange(min, max) {
  return ((Math.random() * (max - min)) + min);
}
function createParticle(radius, velocity, x, y){
  var particle = {};
  particle.x = x;
  particle.y = y;
  particle.xSpeed = randomRange(-1.5 * velocity , 0);
  particle.ySpeed = randomRange(-0.05 , 0.05);
  particle.radius  = randomRange(5, radius);
  particle.strokeSize  = 13;

  return particle;
}

function ParticleGenerator(particles, radius, velocity) {
  this.COLOR = "rgba(255, 255, 255, 0.8)";
  this.STROKE_COLOR = "rgba(251, 88, 0, 0.15)";
  // 每秒生成粒子数
  this.num = this.PARTICLES = particles || 1;
  this.radius = radius;
  this.VELOCITY = velocity;

  this.particleArray = [];
}

ParticleGenerator.prototype.update = function(offsetX, offsetY) {
  var PARTICLES = this.PARTICLES;
  var num = this.num;
  var particleArray = this.particleArray;
  var radius = this.radius;
  var velocity = this.VELOCITY;
  
  var rate = 1 / num;
  if(rate > 1) {
    this.num = num + this.PARTICLES;
  } else {
    this.num = this.PARTICLES;
  }

  for(var i = 1; i <= num; i++) {
    particleArray.push(createParticle(radius, velocity, offsetX, offsetY));
  }

  this.particleArray = particleArray.filter(function (particle, i) {
    particle.x = particle.x + particle.xSpeed;
    particle.y = particle.y + particle.ySpeed;
    var scaleRate = (0.92 + (randomRange(1, 8) / 100));
    particle.radius = particle.radius * scaleRate;
    particle.strokeSize = particle.strokeSize * scaleRate;

    return  particle.radius > 1
  })
  console.log(this.particleArray.length);
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

function init (particles, radius, velocity) {
  return new ParticleGenerator(particles, radius, velocity);
}

module.exports = init;