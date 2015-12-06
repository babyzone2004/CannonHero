
var sounder = require('/assets/js/module/sounder.js');

var resources = [
  __uri('/assets/img/enemy_weapons_2.png'),
  __uri('/assets/img/fighter.png'),
  __uri('/components/cover/coin.mp3'),
  __uri('/components/bg/smalltree.png'),
  __uri('/components/bg/tree-twotrunks.png'),
  __uri('/components/bg/grass.png'),
  __uri('/components/bg/grass2.png'),
  __uri('/components/bg/sky.png')
];
// 加载资源.......................................................................

var loader = require('/assets/js/module/loader.js');
loader.load(resources);

var cLoad = require('/components/load/load.js');
loader.registLoadingCb(function(progress) {
  cLoad.showLoading(progress);
});

var cBrand = require('/components/brand/brand.js');
var cCover = require('/components/cover/cover.js');
loader.registCompleteCb(function() {
  cLoad.hide();
  // cBrand.show();
  // setTimeout(function(e) {
  //   cBrand.hide();
  //   cCover.show();
  //   cCover.registHideCb(initGame);
  // }, 3000);
  initGame();
});

// Init Game.......................................................................

var Game = require('/assets/js/gameEngine.js');
$('body').prepend('<canvas id="gameCanvas" width="360" height="500">Canvas not supported</canvas>');
var game = new Game('Cannon', 'gameCanvas');
function initGame() {
  game.start();
  initFps(game);
  initBg();
}

// 背景
function initBg() {
  var bg = require('/components/bg/bg.js');
  bg.show();

  var updateBg = function() {
    requestAnimationFrame(function() {
      bg.update(game.fps);
      updateBg();
    });
  }
  updateBg();
  bg.start();
}

// FPS
function initFps(game) {
  var lastFpsUpdateTime = 0;
  var cFps = require('/components/fps/fps.js');
  game.paintUnderSprites = function () {
    var now = +new Date();
    if(now - lastFpsUpdateTime > 1000) {
      cFps.update(game.fps);
      lastFpsUpdateTime = now;
    }
  };
}