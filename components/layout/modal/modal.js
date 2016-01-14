/*游戏结果*/
var modal = __inline('modal.tpl');
var $body = $('body');


function show () {
  this.$modal.removeClass('modal-hide');
}

function hide () {
  this.$modal.addClass('modal-hide');
}

function render(tpl) {
  var $modal = $(modal).append(tpl);
  $body.append($modal);
  return {
    $modal: $modal,
    show: show,
    hide: hide
  }
}

module.exports = {
  render: render
};