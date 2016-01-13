
var tpl = __inline('load.tpl');

function init(container) {
  container.innerHTML = tpl;
  this.loadProgress = container.querySelector('#J_loadProgress');
  this.loadTxt = container.querySelector('#J_loadTxt');
  this.container = container;
}

init.prototype.showLoading = function(progress) {
  this.container.classList.remove('hide');
  this.loadTxt.innerHTML = progress + '%';
  var scale = progress / 100;
  this.loadProgress.style.cssText = '-webkit-transform: scale(' + 0.5 + ', 1);transform: scale(' + 0.5 + ', 1);';
}

init.prototype.hide = function(cb) {
  var $container = $(this.container);
  $container.addClass('load-hide');
  $container.on('animationend webkitAnimationEnd', function(e) {
    $container.remove();
    cb && cb();
  });
}

/**
  初始化一个load
 */
var render = function() {
  var domLoad = document.createElement('div'); 
  domLoad.className = 'load-wrap hide';
  document.body.appendChild(domLoad);
  return new init(domLoad);
}

module.exports = render();