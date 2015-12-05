
/*
  @ require zepto.js
*/
var brandIcon = __inline('brand.tpl');
var sounder = require('/assets/js/module/sounder.js');
var $brand;
var SOUNDER_COIN = __uri('coin.mp3');

function show () {
  $brand = $('<div class="brand brand-show">' + brandIcon + '</div>');
  $('body').append($brand);
  $brand.on('animationend', function(e) {
    sounder.play(SOUNDER_COIN);
  });

}

function hide() {
  $brand.addClass('brand-hide');
  $brand.on('animationend', function(e) {
    $brand.remove();
  });
}

module.exports = {
  show: show,
  hide: hide
}