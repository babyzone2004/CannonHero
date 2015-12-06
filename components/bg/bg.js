
var tool = require('/assets/js/module/tool.js');


var $bgContain = $('<div class="bg"></div>');
var $canvas = $('<canvas class="bg-canvas" width="1080" height="1200">Canvas not supported</canvas>');
$bgContain.append($canvas);
var canvas = $canvas[0],
    context = canvas.getContext('2d'),
    tree = new Image(),
    nearTree = new Image(),
    grass = new Image(),
    grass2 = new Image(),
    sky = new Image(),

    paused = true,
    lastFpsUpdate = { time: 0, value: 0 },

    skyOffset = 0,
    grassOffset = 0,
    treeOffset = 0,
    nearTreeOffset = 0,

    TREE_VELOCITY = 20,
    FAST_TREE_VELOCITY = 40,
    SKY_VELOCITY = 8,
    GRASS_VELOCITY = 75;
var radio = tool.getPixelRatio(context);
var canvasHeight = canvas.height;
var canvasWidth = canvas.width;
// Initialization................................................
tree.src = __uri('smalltree.png');
nearTree.src = __uri('tree-twotrunks.png');
grass.src = __uri('grass.png');
grass2.src = __uri('grass2.png');
sky.src = __uri('sky.png');

// Functions.....................................................

function erase() {
   context.clearRect(0,0,canvasWidth,canvasHeight);
}

function draw(fps) {
   context.save();
   skyOffset = skyOffset < canvasWidth ?
               skyOffset + SKY_VELOCITY/fps : 0;
   grassOffset = grassOffset < canvasWidth ?
                 grassOffset +  GRASS_VELOCITY/fps : 0;
   treeOffset = treeOffset < canvasWidth ?
                treeOffset + TREE_VELOCITY/fps : 0;
   nearTreeOffset = nearTreeOffset < canvasWidth ?
                    nearTreeOffset + FAST_TREE_VELOCITY/fps : 0;
   

   context.save();
   context.translate(-skyOffset, 0);
   var skyWidth = sky.width * 3;
   var skyHeight = sky.height * 3;
   context.drawImage(sky, 0, 0, skyWidth, skyHeight);
   context.drawImage(sky,skyWidth, 0, skyWidth, skyHeight);
   context.restore();

   context.save();
   context.translate(-treeOffset, 0);
   context.drawImage(tree, 100, 1010);
   context.drawImage(tree, 1100, 1010);
   context.drawImage(tree, 400, 1010);
   context.drawImage(tree, 1400, 1010);
   context.drawImage(tree, 700, 1010);
   context.drawImage(tree, 1700, 1010);
   context.restore();

   context.save();
   context.translate(-nearTreeOffset, 0);
   context.drawImage(nearTree, 250, 970);
   context.drawImage(nearTree, 1250, 970);
   context.drawImage(nearTree, 800, 970);
   context.drawImage(nearTree, 1800, 970);
   context.restore();

   context.save();
   context.translate(-grassOffset, 0);
   context.drawImage(grass, 0, canvasHeight-grass.height);
   context.drawImage(grass, grass.width-5,
                     canvasHeight-grass.height);
   context.drawImage(grass2, 0, canvasHeight-grass2.height);
   context.drawImage(grass2, grass2.width,
                     canvasHeight-grass2.height);
   context.restore();
}

function update(fps) {
   if (!paused) {
    erase();
    draw(fps);
   }
}

// Event handlers................................................
function start (e) {
   paused = false;
};
function stop (e) {
   paused = true;
};
function show() {
  $('body').prepend($bgContain);
  draw();
}

module.exports = {
  update: update,
  show: show,
  start: start,
  stop: stop,
};
