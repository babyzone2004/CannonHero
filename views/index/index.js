
var sounder = require('/assets/js/module/sounder.js');

// 加载资源
var loader = require('/assets/js/module/loader.js');
loader.load([
  __uri('/assets/img/enemy_weapons_2.png'),
  __uri('/assets/img/fighter.png'),
  __uri('/assets/sounds/coin.mp3'),
  'http://t3.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/0f1f2c542d34346b90ce5d4a808e7a79aa72871d9/1.png',
  'http://t5.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/02bf54de8ab5fa8be8b61a6d81dda5d8a6c401841/1.png'
]);

var cLoad = require('/components/load/load.js');
loader.registLoadingCb(function(progress) {
  cLoad.showLoading(progress);
});

var cBrand = require('/components/brand/brand.js');
loader.registCompleteCb(function() {
  cLoad.hide();
  cBrand.show();
  setTimeout(function(e) {
    cBrand.hide(initGame);
  }, 3000);
});

var Game = require('/assets/js/gameEngine.js');
function initGame() {
  $('body').prepend('<canvas id="gameCanvas" width="360" height="640">Canvas not supported</canvas>')
  var game = new Game('Cannon', 'gameCanvas');
  game.start();

  // FPS
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
