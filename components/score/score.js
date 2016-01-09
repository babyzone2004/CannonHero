/*计分组件*/
var domScore = document.createElement('div');
domScore.className = 'score';
document.body.appendChild(domScore);
var scroe = 0;

function addScore (num) {
  scroe += num;
  domScore.innerHTML = scroe;
}

exports.addScore = addScore;