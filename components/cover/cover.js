
var $cover;
// var sounder = require('/assets/js/module/sounder.js').init(__uri('/assets/sounds/coin.wav'), 1);
var sHited = new Howl({
  urls: [__uri('/assets/sounds/coin.wav')]
});
var hideCb = function() {};

function show () {
  $cover = $('<div class="cover"></div>');
  $btn = $('<h1 class="cover-title">愤怒的僵尸</h1>');
  $cover.append($btn);
  $('body').prepend($cover);
  $btn.on('touchend', function(e) {
    sounder.play();
    hide();
  });
}

function registHideCb(cb) {
  hideCb = cb;
}
function hide() {
  $cover.addClass('cover-hide');
  $cover.on('animationend webkitAnimationEnd', function(e) {
    $cover.remove();
    hideCb();
  });
}
 
module.exports = {
  show: show,
  hide: hide,
  registHideCb: registHideCb
}