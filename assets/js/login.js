window.isLogin = true;
var request = require('/assets/js/request.js');
// var loading = require('/components/loading/loading.js');
// loading.set('登录中…', '登录失败', 'bottom');

function check() {
  if (isLogin) {
    return isLogin;
  } else {
    request({
      url: 'http://zz-game.com/logined',
      load: loading,
      success: function() {
        isLogin = true;
      }
    });
  }
}

module.exports = {
  check: check
}
