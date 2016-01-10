/*游戏菜单*/
var overlay = __inline('overlay.tpl');
var contain = document.createElement('div');
contain.className = 'overlay overlay-hide';
contain.innerHTML = overlay;
document.body.appendChild(contain);

function show () {
  contain.className = 'overlay';
}

function hide () {
  contain.className = 'overlay overlay-hide';
}

module.exports = {
	show: show,
	hide: hide
};