var $loading = $('<div class="loading load-middle"></div>');
$('body').append($loading);
var loadTxt = 'Loading';
var errTxt = 'Error';
var tplNormal = '<i class="icon-loading"></i> {{Loading}}<span></span>';
var tplErr = '<span>{{errTxt}}</span>';

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
  $loading.html(tplErr.replace('{{errTxt}}', errTxt));
  setTimeout(function() {
    $loading.hide();
  }, 3000);
}

function set(value, err, position) {
  if (position === 'bottom') {
    $loading.addClass('loading-bottom');
  }
  loadTxt = value;
  errTxt = err;
}

module.exports = {
  showLoading: showLoading,
  hide: hide,
  showErr: showErr,
  set: set
};
