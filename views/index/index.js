
var sounder = require('/assets/js/module/sounder.js');
var cNav = require('/components/nav/nav.js');
var cOverlay = require('/components/overlay/overlay.js');

var resources = [
  __uri('/assets/img/enemy_weapons_2.png'),
  __uri('/assets/sounds/coin.wav'),
  __uri('/components/weapon/cannon/reload1.wav'),
  __uri('/components/weapon/cannon/fire1.wav'),
  __uri('/components/bg/smalltree.png'),
  __uri('/components/bg/tree-twotrunks.png'),
  __uri('/components/bg/grass.png'),
  __uri('/components/bg/grass2.png'),
  __uri('/components/role/player/player.png'),
  __uri('/components/bg/sky.png'),
  __uri('/components/weapon/cannon/cannon.png')
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
  
});

// Init Game.......................................................................

var Game = require('/assets/js/gameEngine.js');
$('body').prepend('<canvas id="gameCanvas" class="canvas" width="1080" height="1200">Canvas not supported</canvas>');

var bg;
var player;
var pea;
var cannon;
var bullets = require('/components/bullets/bullets.js');
bullets.init(1080, 1200);
var cScore = require('/components/score/score.js');
var particleSprite = require('assets/js/module/particleGenerator.js');
// 初始化重力系统
var PLATFORM_HEIGHT_IN_METERS = 50; // 50 meters
window.pixelsPerMeter = 1200 / PLATFORM_HEIGHT_IN_METERS;

var game = new Game('Cannon', 'gameCanvas');
document.addEventListener('gameOver', function (e) {
  showGameOver();
});

game.start();

function initGame() {
  initFps(game);
  bg = require('/components/bg/bg.js');
  // bg.start(); 
  player = require('/components/role/player/player.js');
  player.addEvent();
  pea = require('/components/role/enemy/pea/pea.js');
  cannon = require('/components/weapon/cannon/cannon.js');
  
  player.equip(cannon);
  game.addSprite(bg);
  game.addSprite(player);
  game.addSprite(pea);
  game.addSprite(bullets);
  bullets.addTarget(pea);
  bullets.addTarget(player);
  game.addSprite(particleSprite);
  cScore.reset();
}


// FPS
function initFps(game) {
  var lastFpsUpdateTime = 0;
  var cFps = require('/components/fps/fps.js');
  game.paintUnderSprites = function () {
    var now = +new Date();
    // console.log('fps', game.fps);
    if(now - lastFpsUpdateTime > 1000) {
      cFps.update(game.fps);
      lastFpsUpdateTime = now;
    }
  };
}

function showGameOver() {
  console.log('gameOver');
  cOverlay.show();
  cNav.showRetry();
  player.removeEvent();
}

document.addEventListener('gameStart', function (e) {
  cOverlay.hide();
  cNav.hide();
  initGame();
});
document.addEventListener('gameRestart', function (e) {
  cOverlay.hide();
  cNav.hide();
  cScore.reset();
  player.reset();
  bg.reset();
  cannon.reset();
  pea.reset();
});
document.addEventListener('destroyEnemy', function (e) {
  bg.start();
  pea.create();
  cannon.reset();
});
document.addEventListener('enemyReady', function (e) {
  bg.stop();
});