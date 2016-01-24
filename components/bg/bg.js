// 云1
var clound = new Image();
var cloundVelocity = 5;
clound.src = __uri('img/clound-s.png');
var cloundTranslateX = 0; //位移
var cloundPos = {
  x: 250,
  y: 1100
};
var cloundDisappearX = -cloundPos.x - clound.width;
// 云2
var cloundL = new Image();
var cloundLVelocity = 15;
cloundL.src = __uri('img/clound-l.png');
var cloundLTranslateX = 0; //位移
var cloundLPos = {
  x: 500,
  y: 720
};
var cloundLDisappearX = -cloundLPos.x - cloundL.width;
// 云3
var cloundM = new Image();
var cloundMVelocity = 10;
cloundM.src = __uri('img/clound-m.png');
var cloundMTranslateX = 0; //位移
var cloundMPos = {
  x: 800,
  y: 1100
};
var cloundMDisappearX = -cloundMPos.x - cloundM.width;
// 建筑
var house = new Image();
var houseVelocity = 150;
house.src = __uri('img/house.png');
var houseTranslateX = 0; //位移
var housePos = {
  x: 0,
  y: 1190
};
var houseDisappearX = -housePos.x - house.width;

var house1 = new Image();
var house1Velocity = 50;
house1.src = __uri('img/house1.png');
var house1TranslateX = 0; //位移
var house1Pos = {
  x: 0,
  y: 1270
};
var house1DisappearX = -house1Pos.x - house1.width;
// 城墙
var wall = new Image();
var wallVelocity = 450;
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
  ctx.drawImage(cloundM, cloundMTranslateX + cloundMPos.x, cloundMPos.y);
  ctx.drawImage(house1, house1TranslateX + house1Pos.x, house1Pos.y);
  ctx.drawImage(house1, house1TranslateX + house1Pos.x + canvasWidth, house1Pos.y);
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

  cloundMTranslateX = cloundMTranslateX - cloundMVelocity / fps;
  if (cloundMTranslateX < cloundMDisappearX) {
    cloundMTranslateX = canvasWidth;
  }

  if (paused) return;

  houseTranslateX = houseTranslateX - houseVelocity / fps;
  if (houseTranslateX < houseDisappearX) {
    houseTranslateX = 0;
  }

  house1TranslateX = house1TranslateX - house1Velocity / fps;
  // console.log(house1TranslateX, house1DisappearX);
  if (house1TranslateX < house1DisappearX) {
    house1TranslateX = 0;
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
