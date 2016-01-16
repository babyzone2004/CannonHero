__inline('lang.inline.js')

var noNetwork = _local.noNetwork;

var tplNormal = '<i class="icon-loading-small iconfont1">&#xe60d;</i><span>' + _local.loading + '</span>';
var tplEmpty = '<p>' + _local.end + '</p>';
var tplErr = '<p><span>' + noNetwork + '</span><span class="btn-restry" data-retry="true">' + _local.retry + '</span></p>';
var errIcon = '<div class="no-network"><i class="icon-no-network iconfont1">&#xe645;</i><p>' + noNetwork + '</p><span class="btn-restry" data-retry="true">' + _local.retry + '</span></div>';
var tplLoadTxt = '<span>' + _local.loadMore + '</span>';

function init(node) {
  this._node = node;
  this.changePositon();
}

init.prototype.show = function() {
  var node = this._node;
  node.classList.remove('hide');
  node.innerHTML = tplLoadTxt;
}

init.prototype.showLoading = function() {
  var node = this._node;
  node.classList.remove('hide');
  node.innerHTML = tplNormal;
}

init.prototype.hide = function() {
  var node = this._node;
  node.classList.add('hide');
  node.innerHTML = '';
}

init.prototype.showEmpty = function() {
  var node = this._node;
  node.classList.remove('hide');
  node.innerHTML = tplEmpty;
}

init.prototype.showErr = function() {
  this._node.innerHTML = this._errNode;
}

init.prototype.changePositon = function() {
  this._node.className = 'loading loading-middle';
  this._errNode = errIcon;
}

var render = function(selector) {
  var node = document.querySelector(selector);
  var load = new init(node);
  return load;
}

module.exports = render;
