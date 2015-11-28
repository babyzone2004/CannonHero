/**
 * 简单的模板引擎，会把{{}}里面的内容替换，返替换的回字符串
 ** @param {String} contain dom容器
 ** @param {Array} list render的数组
 */
var replacer = function(tpl, list) {
  var str = tpl.replace(/{{([^{}]+)}}/g, function(s0, s1) {
    // 如是是0，会转换为空
    var val = list[s1];
    if(val !== undefined) {
      val = val.toString();
    } else {
      val = '';
    }
    return val;
  });
  return str;
};

return replacer;