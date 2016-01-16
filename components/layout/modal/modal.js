/*游戏结果*/
var modal = __inline('modal.tpl');
var $body = $('body');


function show() {
  if (this.beforShow()) {
    this.$modal.removeClass('modal-hide');
    this.showCb();
  }
}

function hide() {
  this.$modal.addClass('modal-hide');
}

function render(tpl) {
  var $modal = $(modal).append(tpl);
  $body.append($modal);
  var modalInstant = {
    $modal: $modal,
    show: show,
    hide: hide,
    beforShow: function() {
      return true;
    },
    showCb: function() {}
  };
  $modal.find('.J_close').on('click', function() {
    modalInstant.hide();
  });
  return modalInstant;
}

module.exports = {
  render: render
};
