/**
 * 获取json，过程会操作load（加载组件）状态
 * @param {String} url
 * @param {Object} data 携带的数据
 * @param {Function} success 成功回调
 * @param {Function} errorCallBack 失败回调
 * @param {Dom} load 是否设置load图标
 */
var cLoad = require('/components/loading/loading.js');
var _load = cLoad('#J_load');
var failOpts = [];
var getJSON = function(opt) {
  var load = opt.load || _load;
  var url = opt.url;
  var type = opt.type;
  var data = opt.data;
  var success = opt.success;
  var error = opt.error;
  load && load.showLoading();
  $.ajax({
    dataType: 'json',
    type: type || 'GET',
    url: url,
    data: data,
    xhrFields: {
      withCredentials: true
    },
    success: function(msg) {
      if (load) {
        load.hide();
      }
      success(msg);
    },
    error: function(xhr, errorType, error) {
      load && load.showErr();
      error && error();
      failOpts.push(opt);
      // 只需要一次监听
      if (failOpts.length === 1) {
        document.addEventListener('click', retry);
      }
    },
    timeout: 5000
  });
};

function retry(e) {
  if (e.target.dataset.retry === 'true') {
    reload();
  }
}

function reload() {
  failOpts.forEach(function(elem, i) {
    console.log('request opt', elem);
    getJSON(elem);
  });
  failOpts.length = 0;
  document.removeEventListener('click', retry);
}

return getJSON;
