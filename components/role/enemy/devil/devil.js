// var AnimationTimer = require('/assets/js/animationTimer.js');
// var animationTimer = new AnimationTimer(800, AnimationTimer.makeElastic(1));

var isLive = true;

var devil = new Image();
devil.src = __uri('devil.png');
var devilHeight = devil.height;
var offsetX;
var offsetY;
var relativeX = -devil.width / 2;
var relativeY = -devilHeight / 2;

var weapon = new Image();
weapon.src = __uri('weapon.png');
var weaponHeight = weapon.height;
var weaponOffsetX;
var weaponOffsetY;
var weaponRelativeX = -weapon.width / 2;
var weaponRelativeY = -weaponHeight / 2;

// var sounder = require('/assets/js/module/sounder.js');
// var sHited = new Howl({
//   urls: [__uri('/assets/sounds/coin.mp3'), __uri('/assets/sounds/coin.wav')]
// });

// 出场位置
var firstY = 1080;
var firstX = 800;


var shapes = require('/assets/js/module/shapes.js');
var shape = shapes.initPolygon(getPoints(firstX, firstY));

function getPoints(x, y) {
  return [{
    x: x + 10,
    y: y + 10
  }, {
    x: x + 25,
    y: y + 55
  }, {
    x: x,
    y: y + 95
  }, {
    x: x + 75,
    y: y + 95
  }, {
    x: x + 75,
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
var downRotate = 180 * angeleFormule;

function update(context, fps, _offsetX, _offsetY, dx) {
  offsetX = _offsetX - relativeX;
  offsetY = _offsetY - devilHeight - relativeY;
  weaponOffsetX = offsetX;
  weaponOffsetY = offsetY - weaponHeight - weaponRelativeY;
  if (isLive) {

  } else {
    gVelocity += GRAVITY_FORCE * 1 / fps * pixelsPerMeter;
    moveDistantX += 8;
    moveDistantY = moveDistantY - 20 + gVelocity / 10;
    offsetX = offsetX + moveDistantX;
    offsetY = offsetY + moveDistantY;
    weaponOffsetX = weaponOffsetX + moveDistantX;
    weaponOffsetY = weaponOffsetY + moveDistantY;
    // rotateVelocity -= 1;
    // rotageAngle += rotateVelocity;
    rotate = downRotate;
    // console.log(dx, moveDistantX, moveDistantY);
    // weapon.update(fps);
  }
  shape.move(dx, 0);
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.rotate(rotate);
  ctx.drawImage(devil, relativeX, relativeY);
  ctx.restore();
  ctx.save();
  ctx.translate(weaponOffsetX, weaponOffsetY);
  ctx.rotate(rotate);
  ctx.drawImage(weapon, weaponRelativeX, weaponRelativeY);
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
  console.log('enemy destroy', isLive);
  document.dispatchEvent(new Event('destroyEnemy'));
}

function reset() {
  // moveDistantX = 0;
  // moveDistantY = randomRange(550, 1000);
  // resetShape();
  console.log('reset enemy');
}

function create(firstX, firstY) {
  resetShape(firstX, firstY);
  isLive = true;
  rotate = 0;
  moveDistantX = 0;
  moveDistantY = 0;
  gVelocity = 0;
  console.log('create enemy');
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
