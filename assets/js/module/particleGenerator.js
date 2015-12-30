
/*
 * @descrition 粒子生成器
*/

var angle =  2 * Math.PI;
// 所有实例的粒子
var particles = [];

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
  particle.color = opt.fillColor || "rgba(255, 255, 255, 0.8)";
  particle.stroke_color = opt.strokeColor || "rgba(251, 88, 0, 0.15)";

  return particle;
}

function ExplosionGenerator (opt) {
  
}

ExplosionGenerator.prototype.excute = function () {
  console.log('excute');
}

function ParticleGenerator(opt) {
  this.opt = opt;
  // 每秒生成粒子数
  this.num = this.numPerFrame = opt.numPerFrame || 1;
  this.radius = opt.radius;
  this.VELOCITY = opt.velocity;
  this.strokeSize = opt.strokeSize;
}

ParticleGenerator.prototype.update = function(offsetX, offsetY) {
  var numPerFrame = this.numPerFrame;
  var num = this.num;
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
    particles.push(createParticle(offsetX, offsetY, opt));
  }
  // console.log(this.particleArray.length);
}

function update() {
  particles = particles.filter(function (particle, i) {
    particle.x = particle.x + particle.xSpeed;
    particle.y = particle.y + particle.ySpeed;
    var scaleRate = (0.93 + (randomRange(1, 7) / 100));
    particle.radius = particle.radius * scaleRate;
    particle.strokeSize = particle.strokeSize * scaleRate;

    return  particle.radius > 1
  })
}

function paint (ctx) {
  for(var i = 0, ii = particles.length; i < ii; i++){
    var particle = particles[i];
    ctx.beginPath();
    ctx.lineWidth = particle.strokeSize;
    ctx.fillStyle = particle.color;
    ctx.strokeStyle = particle.stroke_color;
    ctx.arc(particle.x, particle.y, particle.radius, 0, angle, false);
    ctx.fill();
    ctx.stroke();
  }
  ctx.closePath();
}

function initParticle (opt) {
  return new ParticleGenerator(opt);
}
function initExplosion (opt) {
  return new ExplosionGenerator(opt);
}

module.exports = {
  initParticle: initParticle,
  initExplosion: initExplosion,
  paint: paint,
  update: update,
  visible: true
};