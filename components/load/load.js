
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
  this.loadProgress.style.cssText = '-webkit-transform: scale(' + scale + ', 1);transform: translateY(' + scale + ', 1);';
}

init.prototype.hide = function() {
  this.container.classList.add('hide');
}

/**
  初始化一个load
 */
var render = function() {
  var domLoad = document.createElement('div'); 
  domLoad.className = 'load hide';
  document.body.appendChild(domLoad);
  return new init(domLoad);
}

module.exports = render();