
var sounder = require('/assets/js/module/sounder.js');



var resources = [
  __uri('/assets/img/enemy_weapons_2.png'),
  __uri('/assets/sounds/coin.ogg'),
  __uri('/components/weapon/cannon/reload.wav'),
  __uri('/components/weapon/cannon/fire.wav'),
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
  initGame();
});

// Init Game.......................................................................

var Game = require('/assets/js/gameEngine.js');
$('body').prepend('<canvas id="gameCanvas" class="canvas" width="1080" height="1200">Canvas not supported</canvas>');
var game = new Game('Cannon', 'gameCanvas');
function initGame() {
  initFps(game);
  var bg = require('/components/bg/bg.js');
  var player = require('/components/role/player/player.js');
  var pea = require('/components/role/enemy/pea/pea.js');
  var cannon = require('/components/weapon/cannon/cannon.js');
  var bullets = require('/components/bullets/bullets.js');
  var score = require('/components/score/score.js');
  var particleSprite = require('assets/js/module/particleGenerator.js');
  bullets.init(1080, 1200);
  // 初始化重力系统
  var PLATFORM_HEIGHT_IN_METERS = 50; // 50 meters
  window.pixelsPerMeter = 1200 / PLATFORM_HEIGHT_IN_METERS;
  player.equip(cannon);
  game.addSprite(bg);
  game.addSprite(player);
  game.addSprite(pea);
  game.addSprite(bullets);
  bullets.addTarget(pea);
  bullets.addTarget(player);
  game.addSprite(particleSprite);
  score.addScore(0);
  // bg.start();
  game.start();
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