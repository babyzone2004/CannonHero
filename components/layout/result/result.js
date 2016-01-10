/*游戏结果*/
var result = __inline('result.tpl');
var contain = document.createElement('div');
contain.className = 'result result-hide';
contain.innerHTML = result;
document.body.appendChild(contain);
$score = $('#J_resultScore');
$desc = $('#J_resultDesc');
$tip = $('#J_resultTip');

function show (score) {
  $score.text(score);
  if(score > 2) {
    $desc.text('大侠，留下你的大名吧');
    $tip.hide();
  } else {
    $desc.text('还要继续努力哦~~~');
    $tip.show();
  }
  contain.className = 'result';
}

function hide () {
  contain.className = 'result result-hide';
}

module.exports = {
	show: show,
	hide: hide
};