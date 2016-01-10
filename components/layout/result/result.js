/*游戏结果*/
var result = __inline('result.tpl');
var contain = document.createElement('div');
contain.className = 'result result-hide';
contain.innerHTML = result;
document.body.appendChild(contain);
$score = $('#J_resultScore');

function show (score) {
  $score.text(score);
  contain.className = 'result';
}

function hide () {
  contain.className = 'result result-hide';
}

module.exports = {
	show: show,
	hide: hide
};