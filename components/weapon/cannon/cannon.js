var cannon = new Image();
cannon.src = __uri('cannon.png');
var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(100, AnimationTimer.makeEaseOut(2));

var sReload = new Howl({
  urls: [__uri('/assets/sounds/reload5.wav')]
});
var sFire = new Howl({
  urls: [__uri('/assets/sounds/fire3.wav')]
});
// var sReload = sounder.init(__uri('reload1.wav'), 1);
// var sFire = sounder.init(__uri('fire1.wav'), 1);

// 画笔的坐标
var offsetX;
var offsetY;
// 相对画笔Y轴的点
var relativeY = -23;
var relativeX = -70;
var dWidth = cannon.width;
var dHeight = cannon.height;
var rotageAngle = 0;
var rotate = 0;
var isRoate = false;
var sin = 1;
var cos = 1;
var angeleFormule = Math.PI / 180;

var isLive = true;

// 子弹相对炮筒的坐标
var bulletsX = 55;

var velocityX = -300;
// 后坐力偏移
var moveDistant = {
  x: 0,
  y: 0
}
var lastTime;
// 发射准备
var fireReady = true;

var bullets = require('/components/bullets/bullets.js');
var rocket = require('/components/bullets/rocket/rocket.js');

var particleGenerator = require('assets/js/module/particleGenerator.js');
var fireExplosion = particleGenerator.initExplosion({
  radius: 35,
  velocityMinX: -0.8,
  velocityMaxX: 0.8,
  velocityMinY: -0.8,
  velocitymaxY: 0.8,
  fillColor: "rgb(255, 255, 255)",
  strokeColor: "rgba(255, 79, 0, 0.23)",
  strokeSize: 25,
  num: 5,
  scaleRate: function() {
    return 0.93;
  }
});
// var exposionX = 70;
// var exposionY = 0;
var curX;
var curY;

function updatePositon(context, _offsetX, _offsetY) {
  if (animationTimer.isRunning()) {
    var elapsedTime = animationTimer.getElapsedTime();
    if (animationTimer.isOver()) {
      if (moveDistant.x < 0 || moveDistant.y > 0) {
        moveDistant.x < 0 ? moveDistant.x += 1 * cos : 0;
        moveDistant.y > 0 ? moveDistant.y += 1 * sin : 0;
      } else {
        fireReady = true;
        animationTimer.stop();
        lastTime = null;
      }
    } else {
      if (lastTime) {
        var distant = velocityX * (elapsedTime - lastTime) / 1000
        moveDistant.x += distant * cos;
        moveDistant.y += distant * sin;
      }
      lastTime = elapsedTime;
    }

  }
  if (isRoate && rotageAngle > -90) {
    rotageAngle--;
  }

  rotate = rotageAngle * angeleFormule;
  curX = offsetX = _offsetX + moveDistant.x;
  // console.log('offsetX', offsetX, _offsetY);
  curY = offsetY = _offsetY + moveDistant.y;
}
var gVelocity = 0;


var moveDistantX = 0;
var moveDistantY = 0;
var rotateVelocity = 50;

function update(fps) {
  if (!isLive) {
    rotateVelocity -= 1;
    rotageAngle += rotateVelocity;
    rotate = rotageAngle * angeleFormule;
    // 重力速度太大，适度降低
    gVelocity += (GRAVITY_FORCE * 1 / fps * pixelsPerMeter) / 8;
    moveDistantX += 12;
    moveDistantY = moveDistantY - 25 + gVelocity;
    offsetX = curX + moveDistantX;
    offsetY = curY + moveDistantY;
  }
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.rotate(rotate);
  ctx.drawImage(cannon, relativeX, relativeY, dWidth, dHeight);
  ctx.restore();
}

function fire() {
  if (fireReady) {
    sin = Math.sin(rotate);
    cos = Math.cos(rotate);
    var fireX = offsetX + bulletsX * cos;
    var fireY = offsetY + bulletsX * sin;
    fireExplosion.excute(fireX, fireY);
    bullets.add(rocket.create(fireX, fireY, sin, cos, rotate));
    animationTimer.start();
    fireReady = false;
  }
}

function reloadBullet(reloadSuccesCb) {
  // sReload.play(reloadSuccesCb);
}

function rotateStart() {
  isRoate = true;
  console.log('isRoate', isRoate);
}

function reset() {
  rotate = rotageAngle = 0;
}

function stopRoate() {
  isRoate = false;
  // sReload.stop();
  // sFire.play();
  fire();
}

function destroy() {
  isLive = false;
}

module.exports = {
  paint: paint,
  updatePositon: updatePositon,
  fire: fire,
  rotateStart: rotateStart,
  stopRoate: stopRoate,
  reset: reset,
  moveDistant: moveDistant,
  reloadBullet: reloadBullet,
  update: update,
  destroy: destroy
};
