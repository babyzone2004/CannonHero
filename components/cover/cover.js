
var $cover;
var sounder = require('/assets/js/module/sounder.js').init(__uri('/assets/sounds/coin.wav'), 1);
var hideCb = function() {};

function show () {
  $cover = $('<div class="cover"></div>');
  $btn = $('<button class="cover-start">开始游戏</button>');
  $cover.append($btn);
  $('body').prepend($cover);
  $btn.on('touchend', function(e) {
    sounder.play();
    $cover.remove();
    hideCb();
  });
}

function registHideCb(cb) {
  hideCb = cb;
}

module.exports = {
  show: show,
  registHideCb: registHideCb
}