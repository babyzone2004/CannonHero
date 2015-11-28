
var cFps = require('/components/fps/fps.js');
var cLoad = require('/components/load/load.js');
var Game = require('/assets/js/gameEngine.js');
var game = new Game('Cannon', 'gameCanvas');

// FPS
var lastFpsUpdateTime = 0;

// Loading
var loading = false;

// 实时显示FPS
game.paintUnderSprites = function () {
  var now = +new Date();
  if(now - lastFpsUpdateTime > 1000) {
    cFps.update(game.fps);
    lastFpsUpdateTime = now;
  }
};


game.start();

$('#J_start').click(function() {
  game.queueImage(__uri('/assets/img/enemy_weapons_2.png'));
  game.queueImage(__uri('/assets/img/fighter.png'));

  // test
  game.queueImage('http://t3.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/0f1f2c542d34346b90ce5d4a808e7a79aa72871d9');
  game.queueImage('http://t5.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/02bf54de8ab5fa8be8b61a6d81dda5d8a6c401841');

  var interval;
  var loadingProgress;

  interval = setInterval(function() {
    loadingProgress = game.loadImages();
    if(loadingProgress === 100) {
      clearInterval(interval);

    }
    cLoad.showLoading(loadingProgress);
  }, 16);
});