/*计分组件*/
var domScore = document.createElement('div');
domScore.className = 'score';
document.body.appendChild(domScore);
var scroe = 0;

function add (num) {
  scroe += num;
  domScore.innerHTML = scroe;
}

function reset () {
  scroe = 0;
  domScore.innerHTML = scroe;
}

module.exports = {
  add: add,
  reset: reset
};