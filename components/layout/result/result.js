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
  if(score > 5) {
    $desc.text('大人，你的得分超出了正常人得分啦');
    $tip.hide();
  } else if(score > 3) {
    $desc.text('大人，你为僵尸界做出了不可磨灭的贡献！');
    $tip.hide();
  } else {
    $desc.text('哎呀，这水平有点水啊~');
    $tip.show();
  }
  contain.className = 'result';
  localStorage.setItem('score', score);
}

function hide () {
  contain.className = 'result result-hide';
}

module.exports = {
	show: show,
	hide: hide
};