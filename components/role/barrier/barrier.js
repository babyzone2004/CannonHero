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
var velocityX = 80;
var lastTime;

var shapes = require('/assets/js/module/shapes.js');
var shape = shapes.initPolygon(getPoints(firstX, firstY));

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

function resetShape() {
  pointX = firstX + moveDistantX + 30;
  pointy = firstY + 30;
  shape.points = getPoints(pointX, pointy);
}


function update(context, fps, stageWidth, stageHeight) {
  var dx = 0;
  if (animationTimer.isRunning()) {
    var elapsedTime = animationTimer.getElapsedTime();
    if (animationTimer.isOver()) {
      if (moveDistantX > 0) {
        dx -= 5;
        moveDistantX += dx;
      } else {
        // dx = 0;
        // fireReady = true;
        lastTime = null;
        animationTimer.stop();
      }
    } else {
      if (lastTime) {
        dx = (velocityX * (elapsedTime - lastTime) / 1000) || 0;
        moveDistantX += dx;
        console.log(elapsedTime - lastTime);
      }
      lastTime = elapsedTime;
    }
  }
  // console.log(moveDistantX);

  offsetX = firstX + moveDistantX;
  offsetY = firstY;
  // console.log('offsetY', offsetY);
  shape.move(dx, 0);
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
  moveDistantY = randomRange(-250, 200);
  resetShape();
}

function create() {
  moveDistantX = 500;
  moveDistantY = randomRange(-250, 200);
  resetShape();
}

function randomRange(min, max) {
  return ((Math.random() * (max - min)) + min);
}

module.exports = {
  paint: paint,
  update: update,
  visible: true,
  shape: shape,
  create: create,
  reset: reset,
  destroy: destroy
};
