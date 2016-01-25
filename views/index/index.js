window.lang = 'zh';

var sounder = require('/assets/js/module/sounder.js');
var cNav = require('/components/nav/nav.js');
var cOverlay = require('/components/overlay/overlay.js');

// 登录
var login = require('/assets/js/login.js');
// login.check();

var resources = [
  // __uri('/assets/sounds/coin.mp3'),
  // __uri('/components/weapon/cannon/reload.mp3'),
  // __uri('/components/weapon/cannon/fire.mp3'),


  __uri('/components/bg/img/clound-s.png'),
  __uri('/components/bg/img/clound-l.png'),
  __uri('/components/bg/img/clound-m.png'),
  __uri('/components/bg/img/house.png'),
  __uri('/components/bg/img/house1.png'),
  __uri('/components/bg/img/wall.png'),
  __uri('/components/role/barrier/barrier.png'),
  __uri('/components/role/barrier/repeat.png'),
  __uri('/components/role/enemy/devil/devil.png'),
  __uri('/components/role/enemy/devil/weapon.png'),

  __uri('/components/role/player/player.png'),
  __uri('/components/weapon/cannon/cannon.png'),
  __uri('/components/bullets/bullet-pea/bullet-pea.png'),
  __uri('/components/bullets/rocket/rocket.png')
];
// 加载资源.......................................................................

var loader = require('/assets/js/module/loader.js');
loader.load(resources);

var cLoad = require('/components/load/load.js');
loader.registLoadingCb(function(progress) {
  cLoad.showLoading(progress);
});

var cBrand = require('/components/brand/brand.js');
loader.registCompleteCb(function() {
  cLoad.hide();
  cBrand.show();
  setTimeout(function(e) {
    cNav.show();
    cOverlay.show();
    initGameContext();
    cBrand.hide();
    // cCover.registHideCb(initGame);
  }, 3000);

  // cOverlay.show();
  // cNav.show();

  // initGameContext();
  // game.togglePaused();
  // cOverlay.hide();
  // cNav.hide();
  // initGame();
});

// Init Game.......................................................................

var stageWidth = 1080;
var stageHeight = 1550;

var Game = require('/assets/js/gameEngine.js');
$('body').prepend('<div class="stage"><canvas id="gameCanvas" class="canvas" width="' + stageWidth + '" height="' + stageHeight + '">Canvas not supported</canvas></div>');

var bg;
var player;
var barrier;
var enemy;
var cannon;
var bullets = require('/components/bullets/bullets.js');
bullets.init(stageWidth, stageHeight);
var cScore = require('/components/score/score.js');
var particleSprite = require('assets/js/module/particleGenerator.js');
// 初始化重力系统
var PLATFORM_HEIGHT_IN_METERS = 18; // 50 meters
window.pixelsPerMeter = 1200 / PLATFORM_HEIGHT_IN_METERS;
window.GRAVITY_FORCE = 9.81;

var game = new Game('Cannon', 'gameCanvas');
document.addEventListener('gameOver', function(e) {
  showGameOver();
});

var bgMusic;

function initGameContext() {
  initFps(game);
  bg = require('/components/bg/bg.js');
  player = require('/components/role/player/player.js');
  barrier = require('/components/role/barrier/barrier.js');
  enemy = require('/components/role/enemy/devil/devil.js');
  cannon = require('/components/weapon/cannon/cannon.js');
  player.equip(cannon);
  game.addSprite(bg);
  game.addSprite(barrier);
  game.addSprite(bullets);
  game.addSprite(player);
  bullets.addTarget(barrier);
  bullets.addTarget(player);
  bullets.addTarget(enemy);
  game.addSprite(particleSprite);
  cScore.reset();
  game.start();
  setTimeout(function() {
    game.togglePaused();
  }, 0);
}

function initGame() {
  player.addEvent();
  // bgMusic = new Howl({
  //   urls: [
  //     __uri('/assets/sounds/bg.wav'),
  //     __uri('/assets/sounds/bg.mp3')
  //   ],
  //   buffer: true,
  //   autoplay: true
  // });
}


// FPS
function initFps(game) {
  var lastFpsUpdateTime = 0;
  var cFps = require('/components/fps/fps.js');
  game.paintUnderSprites = function() {
    var now = +new Date();
    // console.log('fps', game.fps);
    if (now - lastFpsUpdateTime > 1000) {
      cFps.update(game.fps);
      lastFpsUpdateTime = now;
    }
  };
}

var cResultScore = require('/components/layout/result/result.js');

var request = require('/assets/js/request.js');
var loading = require('/components/loading/loading.js');


document.addEventListener('fireMiss', function(e) {
  enemy.fire();
});

function showGameOver() {
  console.log('gameOver');
  console.log(bullets.getBullets());
  cOverlay.show();
  cNav.show();
  player.removeEvent();
  // bgMusic.fade(1, 0, 500);
  var scrore = cScore.getScore();
  cResultScore.show(scrore);
  // loading.set('存档…', '存档失败！', 'bottom');
  // request({
  //   url: 'http://zz-game.com/score',
  //   type: 'POST',
  //   data: {
  //     score: scrore
  //   },
  //   load: loading,
  //   success: function(msg) {
  //     console.log('record success', msg);
  //   }
  // });
  game.togglePaused();

}

document.addEventListener('gameStart', function(e) {
  game.togglePaused();
  cOverlay.hide();
  cNav.hide();
  initGame();
});

document.addEventListener('gameRestart', function(e) {
  cOverlay.hide();
  cNav.hide();
  cScore.reset();
  player.reset();
  bg.reset();
  cannon.reset();
  barrier.reset();
  cResultScore.hide();
  // bgMusic.stop();
  // bgMusic.play();
  // bgMusic.fade(0, 1, 500);
  game.togglePaused();
});
// 敌人被击毁
document.addEventListener('destroyEnemy', function(e) {
  bg.start();
  // enemy.create();
  barrier.move();
  cannon.reset();
});
// 新敌人出现
document.addEventListener('enemyReady', function(e) {
  bg.stop();
});
