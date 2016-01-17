var clound = new Image();
var cloundVelocity = 8;
clound.src = __uri('img/clound.png');
var cloundTranslateX = 0; //位移
var cloundPos = {
  x: 250,
  y: 250
};
var cloundDisappearX = -cloundPos.x - clound.width;

var cloundL = new Image();
var cloundLVelocity = 15;
cloundL.src = __uri('img/clound-l.png');
var cloundLTranslateX = 0; //位移
var cloundLPos = {
  x: 500,
  y: 220
};
var cloundLDisappearX = -cloundLPos.x - cloundL.width;

// 
var house = new Image();
var houseVelocity = 100;
house.src = __uri('img/house.png');
var houseTranslateX = 0; //位移
var housePos = {
  x: 0,
  y: 1220
};
var houseDisappearX = -housePos.x - house.width;

var wall = new Image();
var wallVelocity = 350;
wall.src = __uri('img/wall.png');
var wallTranslateX = 0; //位移
var wallPos = {
  x: 0,
  y: 1380
};
var wallDisappearX = -wallPos.x - wall.width;

var paused = true;

function paint(ctx, canvasWidth, canvasHeight) {
  ctx.translate(0, 0);
  ctx.drawImage(clound, cloundTranslateX + cloundPos.x, cloundPos.y);
  ctx.drawImage(cloundL, cloundLTranslateX + cloundLPos.x, cloundLPos.y);
  ctx.drawImage(house, houseTranslateX + housePos.x, housePos.y);
  ctx.drawImage(house, houseTranslateX + housePos.x + canvasWidth, housePos.y);
  ctx.drawImage(wall, wallTranslateX + wallPos.x, wallPos.y);
  ctx.drawImage(wall, wallTranslateX + wallPos.x + canvasWidth, wallPos.y);
}

function update(ctx, fps, canvasWidth, canvasHeight) {
  if (fps === 0) return;

  cloundTranslateX = cloundTranslateX - cloundVelocity / fps;
  if (cloundTranslateX < cloundDisappearX) {
    cloundTranslateX = canvasWidth;
  }

  cloundLTranslateX = cloundLTranslateX - cloundLVelocity / fps;
  if (cloundLTranslateX < cloundLDisappearX) {
    cloundLTranslateX = canvasWidth;
  }

  if (paused) return;

  houseTranslateX = houseTranslateX - houseVelocity / fps;
  if (houseTranslateX < houseDisappearX) {
    houseTranslateX = 0;
  }

  wallTranslateX = wallTranslateX - wallVelocity / fps;
  if (wallTranslateX < wallDisappearX) {
    wallTranslateX = 0;
  }
}

// Event handlers................................................
function start(bgVelocity) {
  bgVelocity && (GRASS_VELOCITY = bgVelocity);
  paused = false;
};

function stop() {
  paused = true;
}

function reset() {
  cloundTranslateX = 0;
  cloundLTranslateX = 0;
  houseTranslateX = 0;
  wallTranslateX = 0;
}

module.exports = {
  start: start,
  stop: stop,
  update: update,
  paint: paint,
  reset: reset,
  visible: true
};
