var $loading = $('<div class="loading load-middle"></div>');
$('body').append($loading);
var loadTxt = 'Loading';
var errTxt = 'Error';
var tplNormal = '<i class="icon-loading"></i> {{Loading}}<span></span>';
var tplErr = '<p><span>{{errTxt}}</span></p>';

function showLoading() {
  $loading.show();
  $loading.html(tplNormal.replace('{{Loading}}', loadTxt));
}

function hide() {
  $loading.hide();
  loadTxt = 'Loading';
  errTxt = 'Error';
  $loading.removeClass('loading-bottom');
}

function showErr() {
  $loading.html(tplNormal.replace('{{errTxt}}', errTxt));
}

function set(value, errTxt, position) {
  if (position === 'bottom') {
    $loading.addClass('loading-bottom');
  }
  loadTxt = value;
  errTxt = errTxt;
}

module.exports = {
  showLoading: showLoading,
  hide: hide,
  showErr: showErr,
  set: set
};
