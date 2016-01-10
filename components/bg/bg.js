
var tree = new Image(),
    nearTree = new Image(),
    grass = new Image(),
    grass2 = new Image(),
    sky = new Image(),

    paused = true,

    skyOffset = 0,
    grassOffset = 0,
    treeOffset = 0,
    nearTreeOffset = 0,

    TREE_VELOCITY = 20,
    FAST_TREE_VELOCITY = 40,
    SKY_VELOCITY = 8,
    GRASS_VELOCITY = 150;

// Initialization................................................

tree.src = __uri('smalltree.png');
nearTree.src = __uri('tree-twotrunks.png');
grass.src = __uri('grass.png');
grass2.src = __uri('grass2.png');
sky.src = __uri('sky.png');

var skyWidth = sky.width * 3;
var skyHeight = sky.height * 3;

var firstTreeX = 200;
var secTreeX = 550;
var lastTreeX = 900;

var firstNearTreeX = 350;
var secNearTree = 850;

var grassWidth = grass.width;
var grassHeight = grass.height;

// Functions.....................................................

function paint(ctx, canvasWidth, canvasHeight) {
  ctx.save();
  ctx.translate(-skyOffset, 0);
  ctx.drawImage(sky, 0, 0, skyWidth, skyHeight);
  ctx.drawImage(sky,skyWidth, 0, skyWidth, skyHeight);
  ctx.restore();

  ctx.save();
  ctx.translate(-treeOffset, 0);
  ctx.drawImage(tree, firstTreeX, 1010);
  ctx.drawImage(tree, secTreeX, 1010);
  ctx.drawImage(tree, lastTreeX, 1010);
  ctx.drawImage(tree, firstTreeX + canvasWidth, 1010);
  ctx.drawImage(tree, secTreeX + canvasWidth, 1010);
  ctx.drawImage(tree, secTreeX + canvasWidth, 1010);
  ctx.restore();

  ctx.save();
  ctx.translate(-nearTreeOffset, 0);
  ctx.drawImage(nearTree, firstNearTreeX, 970);
  ctx.drawImage(nearTree, secNearTree, 970);
  ctx.drawImage(nearTree, firstNearTreeX + canvasWidth, 970);
  ctx.drawImage(nearTree, secNearTree + canvasWidth, 970);
  ctx.restore();

  ctx.save();
  ctx.translate(-grassOffset, 0);
  ctx.drawImage(grass, 0, canvasHeight-grass.height);
  ctx.drawImage(grass, grass.width,
                    canvasHeight-grass.height);
  ctx.drawImage(grass2, 0, canvasHeight-grass2.height);
  ctx.drawImage(grass2, grass2.width,
                    canvasHeight-grass2.height);
  ctx.restore();
}

function update (ctx, fps, canvasWidth, canvasHeight) {
  if(paused) return;
  // sky
  var skyStep = SKY_VELOCITY/fps;
  var skyTranslateX = skyOffset + skyStep;
  if(skyTranslateX < (skyWidth * 2 - canvasWidth)) {
    skyOffset = skyTranslateX;
  } else {
    skyOffset = skyWidth - canvasWidth + skyStep;
  }

  // firstTree
  treeTranslateX = treeOffset + TREE_VELOCITY/fps;
  if(treeTranslateX < canvasWidth) {
    treeOffset = treeTranslateX;
  } else {
    treeOffset = canvasWidth - treeOffset + skyStep;
  }

  // nearTree
  nearTreeTranslateX = nearTreeOffset + FAST_TREE_VELOCITY / fps;
  if(nearTreeTranslateX < canvasWidth) {
    nearTreeOffset = nearTreeTranslateX;
  } else {
    nearTreeOffset = canvasWidth - nearTreeOffset + skyStep;
  }

  // grass
  var grassStep = GRASS_VELOCITY/fps;
  var grassTranslateX = grassOffset + grassStep;
  if(grassTranslateX < (grassWidth * 2 - canvasWidth)) {
    grassOffset = grassTranslateX;
  } else {
    grassOffset = grassWidth - canvasWidth + grassStep;
  }
}

// Event handlers................................................
function start (bgVelocity) {
  bgVelocity && (GRASS_VELOCITY = bgVelocity);
  paused = false;
};

function stop () {
   paused = true;
}
function reset () {
  skyOffset = 0;
  grassOffset = 0;
  treeOffset = 0;
  nearTreeOffset = 0;
}

module.exports = {
  start: start,
  stop: stop,
  update: update,
  paint: paint,
  reset: reset,
  visible: true
};
