
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
    GRASS_VELOCITY = 75;

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

function paint(context, canvasWidth, canvasHeight) {
  context.save();
  context.translate(-skyOffset, 0);
  context.drawImage(sky, 0, 0, skyWidth, skyHeight);
  context.drawImage(sky,skyWidth, 0, skyWidth, skyHeight);
  context.restore();

  context.save();
  context.translate(-treeOffset, 0);
  context.drawImage(tree, firstTreeX, 1010);
  context.drawImage(tree, secTreeX, 1010);
  context.drawImage(tree, lastTreeX, 1010);
  context.drawImage(tree, firstTreeX + canvasWidth, 1010);
  context.drawImage(tree, secTreeX + canvasWidth, 1010);
  context.drawImage(tree, secTreeX + canvasWidth, 1010);
  context.restore();

  context.save();
  context.translate(-nearTreeOffset, 0);
  context.drawImage(nearTree, firstNearTreeX, 970);
  context.drawImage(nearTree, secNearTree, 970);
  context.drawImage(nearTree, firstNearTreeX + canvasWidth, 970);
  context.drawImage(nearTree, secNearTree + canvasWidth, 970);
  context.restore();

  context.save();
  context.translate(-grassOffset, 0);
  context.drawImage(grass, 0, canvasHeight-grass.height);
  context.drawImage(grass, grass.width,
                    canvasHeight-grass.height);
  context.drawImage(grass2, 0, canvasHeight-grass2.height);
  context.drawImage(grass2, grass2.width,
                    canvasHeight-grass2.height);
  context.restore();
}

function update (context, fps, canvasWidth, canvasHeight) {
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
function start () {
   paused = false;
};

function stop () {
   paused = true;
}

module.exports = {
  start: start,
  stop: stop,
  update: update,
  paint: paint,
  visible: true
};
