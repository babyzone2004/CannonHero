/*游戏结果*/

var cModal = require('/components/layout/modal/modal.js');
var cLogin = require('/components/layout/login/login.js');
var user = cModal.render(__inline('user.tpl'));
var render = require('/assets/js/module/render.js');
var userCon = user.$modal.find('.content')[0];
var tpl = __inline('list.tpl');
var request = require('/assets/js/request.js');

user.beforShow = function() {
  if (isLogin) {
    console.log('login succes');
    return true;
  } else {
    cLogin.show();
    return false;
  }
}

user.showCb = function() {
  request({
    url: 'http://zz-game.com/history',
    success: function(msg) {
      render({
        contain: userCon,
        tpl: tpl,
        list: [msg]
      });
    }
  });
}

module.exports = user;
