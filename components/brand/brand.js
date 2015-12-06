
/*
  @ require zepto.js
*/
var brandIcon = __inline('brand.tpl');
var $brand;

function show () {
  $brand = $('<div class="brand">' + brandIcon + '</div>');
  $('body').prepend($brand);
}

function hide(cb) {
  $brand.addClass('brand-hide');
  $brand.on('animationend webkitAnimationEnd', function(e) {
    $brand.remove();
    cb && cb();
  });
}

module.exports = {
  show: show,
  hide: hide
}