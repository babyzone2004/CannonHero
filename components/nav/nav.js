/*游戏菜单*/
var nav = __inline('nav.tpl');
var navContainer = document.createElement('div');
navContainer.className = 'nav nav-hide';
navContainer.innerHTML = nav;
document.body.appendChild(navContainer);
var $startBtn = $('#J_start');
var $reStartBtn = $('#J_reStart');
var $toggleMusic = $('#J_toggleMusic');

var musicStatus = 'on';
var onMusic = '<i class="iconfont nav-music">&#xe651;</i>';
var offMusic = '<i class="iconfont nav-music">&#xe6ef;</i>;'

var cUser = require('/components/layout/user/user.js');
var cRank = require('/components/layout/rank/rank.js');
var cAbout = require('/components/layout/about/about.js');

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
    case 'rank':
      cRank.show();
    break;
    case 'about':
      cAbout.show();
    break;
    case 'music':
      if(musicStatus === 'on') {
        $toggleMusic.html(offMusic);
        musicStatus = 'off';
        Howler.mute();
      } else {
        $toggleMusic.html(onMusic);
        musicStatus = 'on';
        Howler.unmute();
      }
      
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