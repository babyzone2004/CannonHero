
var cFps = require('/components/fps/fps.js');
var cLoad = require('/components/load/load.js');
var Game = require('/assets/js/gameEngine.js');
var game = new Game('Cannon', 'gameCanvas');
var cBrand = require('/components/brand/brand.js');
var sounder = require('/assets/js/module/sounder.js');
var loader = require('/assets/js/module/loader.js');

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


loader.load([
  __uri('/assets/img/enemy_weapons_2.png'),
  __uri('/assets/img/fighter.png'),
  'http://t3.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/0f1f2c542d34346b90ce5d4a808e7a79aa72871d9/1.png',
  'http://t5.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/02bf54de8ab5fa8be8b61a6d81dda5d8a6c401841/1.png'
]);

loader.registLoadingCb(function(progress) {
  cLoad.showLoading(progress);
});
loader.registCompleteCb(function() {
  // 进度条动画时间是1s
  setTimeout(function() {
    cLoad.hide();
    // loadingToast.style.display = 'none';   
    // loseLifeToast.style.display = 'block';   
    // game.playSound('pop');
    game.start();
    loading = false;
    score = 10;
    // scoreToast.innerText = '10'; // won't get set till later, otherwise
    // scoreToast.style.display = 'inline';
    cBrand.show();
    setTimeout(function(e) {
      // cBrand.hide();
    }, 2000);

    // loseLifeButton.focus();
  }, 1000);
})
  
