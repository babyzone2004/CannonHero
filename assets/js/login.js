window.isLogin = false;
var request = require('/assets/js/request.js');

function check() {
  if (isLogin) {
    return isLogin;
  } else {
    request({
      url: 'http://zz-game.com/logined',
      success: function() {
        isLogin = true;
      }
    });
  }
}

module.exports = {
  check: check
}
