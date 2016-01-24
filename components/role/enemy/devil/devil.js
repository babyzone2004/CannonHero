var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(800, AnimationTimer.makeElastic(1));

var devil = new Image();
devil.src = __uri('devil.png');
var devilHeight = devil.height;
var isLive = true;
var weapon = new Image();
weapon.src = __uri('weapon.png');
var weaponHeight = weapon.height;
var weaponOffsetX;
var weaponOffsetY;
var weaponPositiveX = -weapon.width / 2;
var weaponPositiveY = -weaponHeight / 2;

// var sounder = require('/assets/js/module/sounder.js');
// var sHited = new Howl({
//   urls: [__uri('/assets/sounds/coin.mp3'), __uri('/assets/sounds/coin.wav')]
// });

// 出场位置
var firstY = 1080;
var firstX = 800;
var offsetX;
var offsetY;

var shapes = require('/assets/js/module/shapes.js');
var shape = shapes.initPolygon(getPoints(firstX, firstY));

function getPoints(x, y) {
  return [{
    x: x + 10,
    y: y + 10
  }, {
    x: x + 30,
    y: y + 55
  }, {
    x: x,
    y: y + 95
  }, {
    x: x + 88,
    y: y + 95
  }, {
    x: x + 88,
    y: y
  }];
}

function resetShape(firstX, firstY) {
  pointX = firstX;
  pointy = firstY - weaponHeight / 2 - devilHeight;
  shape.points = getPoints(pointX, pointy);
}

var gVelocity = 0;
var moveDistantX = 0;
var moveDistantY = 0;
var rotateVelocity = 10;
var rotageAngle = 0;
var rotate = 0;
var angeleFormule = Math.PI / 180;

function update(context, fps, _offsetX, _offsetY) {
  offsetX = _offsetX;
  offsetY = _offsetY - devilHeight;
  weaponOffsetX = offsetX - weaponPositiveX;
  weaponOffsetY = offsetY - weaponHeight / 1.5 - weaponPositiveY;
  if (isLive) {

  } else {
    gVelocity += GRAVITY_FORCE * 1 / fps * pixelsPerMeter;
    moveDistantX += 3;
    moveDistantY = moveDistantY - 20 + gVelocity / 10;
    offsetX = offsetX + moveDistantX;
    offsetY = offsetY + moveDistantY;
    weaponOffsetX = weaponOffsetX + moveDistantX;
    weaponOffsetY = weaponOffsetY + moveDistantY;
    // rotateVelocity -= 1;
    // rotageAngle += rotateVelocity;
    rotate = 180 * angeleFormule;
    // weapon.update(fps);
  }
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  // ctx.rotate(rotate);
  ctx.drawImage(devil, 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(weaponOffsetX, weaponOffsetY);
  ctx.rotate(rotate);
  ctx.drawImage(weapon, weaponPositiveX, weaponPositiveY);
  ctx.restore();
  // shape.lineWidth = 1;
  // shape.stroke(ctx);
  // shape.fill(ctx);
}

function equip(_weapon) {}

var score = require('/components/score/score.js');

function destroy(bingo) {
  // sHited.play();
  // 如果是致命一击
  if (bingo) {
    score.add(3);
  } else {
    score.add(1);
  }
  isLive = false;
  console.log('enemy destroy');
  // document.dispatchEvent(new Event('destroyEnemy'));
}

function reset() {
  moveDistantX = 0;
  moveDistantY = randomRange(-250, 200);
  resetShape();
}

function create(firstX, firstY) {
  resetShape(firstX, firstY);
  // explosion.excute(offsetX + explosionX, offsetY + explosionY);
}

function randomRange(min, max) {
  return ((Math.random() * (max - min)) + min);
}

module.exports = {
  paint: paint,
  update: update,
  visible: true,
  shape: shape,
  equip: equip,
  create: create,
  reset: reset,
  destroy: destroy
};
