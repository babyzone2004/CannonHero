/*游戏菜单*/
var nav = __inline('nav.tpl');
var navContainer = document.createElement('div');
navContainer.className = 'nav';
navContainer.innerHTML = nav;
document.body.appendChild(navContainer);
var $startBtn = $('#J_start');

$(navContainer).on('click','button', function() {
  var action = $(this).data('action');
  switch(action) {
    case 'start':
      document.dispatchEvent(new Event('gameStart'));
      $startBtn.text('重试').data('action', 'restart');
    break;
    case 'restart':
      document.dispatchEvent(new Event('gameRestart'));
    break;
  }
})

function showRetry () {
  navContainer.className = 'nav';
}

function hide() {
  navContainer.className = 'nav nav-hide';
}

module.exports = {
  showRetry: showRetry,
	hide: hide
};