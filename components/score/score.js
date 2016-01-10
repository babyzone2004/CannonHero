/*计分组件*/
var domScore = document.createElement('div');
domScore.className = 'score';
document.body.appendChild(domScore);
var score = 0;

function add (num) {
  score += num;
  domScore.innerHTML = score;
}

function reset () {
  score = 0;
  domScore.innerHTML = score;
}

function getScore() {
  return score;
}

module.exports = {
  add: add,
  reset: reset,
  getScore: getScore
};