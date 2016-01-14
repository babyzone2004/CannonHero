/*游戏菜单*/
var nav = __inline('nav.tpl');
var navContainer = document.createElement('div');
navContainer.className = 'nav nav-hide';
navContainer.innerHTML = nav;
document.body.appendChild(navContainer);
var $startBtn = $('#J_start');
var $reStartBtn = $('#J_reStart');

var cUser = require('/components/layout/user/user.js');

$(navContainer).on('click','button', function() {
  var action = $(this).data('action');
  switch(action) {
    case 'start':
      document.dispatchEvent(new Event('gameStart'));
      $startBtn.remove();
      $reStartBtn.show();
    break;
    case 'restart':
      document.dispatchEvent(new Event('gameRestart'));
    break;
    case 'user':
      cUser.show();
    break;
  }
})

function show () {
  navContainer.className = 'nav';
}

function hide() {
  navContainer.className = 'nav nav-hide';
}

module.exports = {
  show: show,
	hide: hide
};