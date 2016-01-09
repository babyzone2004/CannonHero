
var fps = document.createElement('div');
fps.className = 'fps hide';
document.body.appendChild(fps);

function update (num) {
  fps.innerHTML = num;
  fps.className = 'fps';
}

exports.update = update;