/*游戏结果*/

var cModal = require('/components/layout/modal/modal.js');
var rank = cModal.render(__inline('rank.tpl'));
var request = require('/assets/js/request.js');
var render = require('/assets/js/module/render.js');
var tpl = __inline('list.tpl');
var rankBody = rank.$modal.find('tbody')[0];

rank.showCb = function() {
  request({
    url: 'http://zz-game.com/top',
    success: function(msg) {
      render({
        contain: rankBody,
        tpl: tpl,
        list: msg
      });
    }
  });
}

module.exports = rank;
