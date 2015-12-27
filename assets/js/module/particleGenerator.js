
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
  particle.xSpeed = randomRange(-1.2 * velocity , 0);
  particle.ySpeed = randomRange(-0.05 , 0.1);
  particle.radius  = randomRange(3, radius);
  particle.strokeSize  = 13;

  return particle;
}

function ParticleGenerator(particles, radius, velocity) {
  this.COLOR = "rgba(255, 198, 152, 0.8)";
  this.STROKE_COLOR = "rgba(251, 88, 0, 0.15)";
  this.PARTICLES = particles || 50;
  this.radius = radius;
  this.VELOCITY = velocity;

  var particleArray = this.particleArray = [];
}

ParticleGenerator.prototype.update = function(offsetX, offsetY) {
  var PARTICLES = this.PARTICLES;
  var particleArray = this.particleArray;
  var radius = this.radius;
  var velocity = this.VELOCITY;

  if(particleArray.length < PARTICLES) {
    particleArray.push(createParticle(radius, velocity, offsetX, offsetY));
  }

  for(var i = 0, ii =  particleArray.length; i < ii; i++){
    var particle = particleArray[i];

    // 如果没有初始化坐标，采用第一次调用的坐标
    if(particle.x === undefined) {
      particle.x = offsetX;
      particle.y = offsetY;
    }

    particle.x = particle.x + particle.xSpeed;
    particle.y = particle.y + particle.ySpeed;
    var scaleRate = (0.9 + (randomRange(1, 10) / 100));
    particle.radius = particle.radius * scaleRate;
    particle.strokeSize = particle.strokeSize * scaleRate;
    if(particle.radius <= 0.5){
      particleArray[i] = createParticle(radius, velocity, offsetX, offsetY);
    }
  }
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
    ctx.closePath();
  }
}

function init (particles, radius, velocity) {
  return new ParticleGenerator(particles, radius, velocity);
}

module.exports = init;