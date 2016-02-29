var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(100, AnimationTimer.makeEaseOut(2));

var barrier = new Image();
barrier.src = __uri('barrier.png');
var reapeat = new Image();
reapeat.src = __uri('repeat.png');

// var sounder = require('/assets/js/module/sounder.js');
// var sHited = new Howl({
//   urls: [__uri('/assets/sounds/coin.mp3'), __uri('/assets/sounds/coin.wav')]
// });

// 出场位置
var firstX = 800;
var firstY = 1080;
var offsetX;
var offsetY;
// 地面坐标
var floorY = 1500;
var barrierHeight = barrier.height;
var reapeatHeight = reapeat.height;
var reapeatWith = reapeat.width;
var pillarHeight = floorY - barrierHeight - firstY;
console.log('reapeat', reapeatWith, pillarHeight, barrierHeight);

// 运动的移动距离
var moveDistantX = 0;
var fireVelocityX = 60;
var velocityX = 560;
var lastTime;

var shapes = require('/assets/js/module/shapes.js');
var shape = shapes.initPolygon(getPoints(firstX, firstY));

var isMove = false;
var reCreate = false;

function getPoints(x, y) {
  return [{
    x: x,
    y: y
  }, {
    x: x,
    y: y + pillarHeight + barrierHeight
  }, {
    x: x + reapeatWith,
    y: y + pillarHeight + barrierHeight
  }, {
    x: x + reapeatWith,
    y: y
  }];
}

function resetShape(pointX, pointy) {
  shape.points = getPoints(pointX, pointy);
}

var enemy = require('/components/role/enemy/devil/devil.js');
enemy.create(firstX, firstY);

function update(context, fps, stageWidth, stageHeight) {
  var dx = 0;
  if (animationTimer.isRunning()) {
    var elapsedTime = animationTimer.getElapsedTime();
    if (animationTimer.isOver()) {
      if (moveDistantX > 0) {
        dx -= 1;
        moveDistantX += dx;
      } else {
        lastTime = null;
        animationTimer.stop();
      }
      // console.log('animationTimer.isOver()', moveDistantX);
    } else {
      if (lastTime) {
        dx = fireVelocityX * (elapsedTime - lastTime) / 1000;
        moveDistantX += dx;
      }

      lastTime = elapsedTime;
    }
  }

  // console.log('moveDistantX', moveDistantX);

  if (isMove) {
    dx = -velocityX / fps
    moveDistantX += dx;
    if (moveDistantX < -1080) {
      reCreate = true;
      moveDistantX = 300;
      firstY = randomRange(850, 1000);
      pillarHeight = floorY - barrierHeight - firstY;
      resetShape(firstX + moveDistantX, firstY);
      enemy.create(firstX + moveDistantX, firstY);
    }
  }

  if (reCreate) {
    if (moveDistantX <= 0) {
      reCreate = isMove = false;
      dx = moveDistantX = 0;
      document.dispatchEvent(new Event('enemyReady'));
    }
  }


  // console.log(moveDistantX);

  offsetX = firstX + moveDistantX;
  offsetY = firstY;
  // console.log('offsetY', offsetY);
  shape.move(dx, 0);
  enemy.update(context, fps, offsetX, offsetY, dx);
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.drawImage(barrier, 0, 0);
  var pat = ctx.createPattern(reapeat, "repeat");
  ctx.rect(0, barrierHeight, reapeatWith, pillarHeight);
  ctx.fillStyle = pat;
  ctx.fill();
  ctx.restore();
  enemy.paint(ctx, stageWidth, stageHeight);
  // shape.lineWidth = 1;
  // shape.stroke(ctx);
  // shape.fill(ctx);
}

function destroy() {
  // sHited.play();
  animationTimer.start();
}

function reset() {
  moveDistantX = 0;
  firstY = randomRange(950, 1000);
  pillarHeight = floorY - barrierHeight - firstY;
  resetShape(firstX, firstY);
}

function move() {
  isMove = true;
}

function randomRange(min, max) {
  return ((Math.random() * (max - min)) + min);
}

module.exports = {
  paint: paint,
  update: update,
  visible: true,
  shape: shape,
  move: move,
  reset: reset,
  destroy: destroy
};
