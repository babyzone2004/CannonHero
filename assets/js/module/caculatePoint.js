// 根据距离和角度算出新的坐标
function caculatePoint (x, y, px, py, rotate) {
  var _rotate = Math.atan2(py, px) + rotate;
  var distant = Math.sqrt(px * px + py * py);
  var point = {
  	originX: px,
  	originY: py,
    x: x + distant * Math.cos(_rotate),
    y: y + distant * Math.sin(_rotate)
  };
  // console.log('point', distant * Math.cos(_rotate), distant * Math.sin(_rotate));
  return point;
}

return caculatePoint;