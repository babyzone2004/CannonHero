/*游戏菜单*/
var nav = __inline('nav.tpl');
var navContainer = document.createElement('div');
navContainer.className = 'nav';
navContainer.innerHTML = nav;
document.body.appendChild(navContainer);
var $startBtn = $('#J_btnStart');

$(navContainer).on('click', function() {
  var action = $(this).data('action');
  switch(action) {
    case action:
      hide();
      document.dispatchEvent(new Event('gameStart'));
      $('#J_start').text('重试');
    break;
  }
})

function showRetry () {
  navContainer.className = 'nav';
}

function hide() {
  navContainer.className = 'nav nav-hide';
}

exports = {
  showRetry: showRetry,
	hide: hide
};