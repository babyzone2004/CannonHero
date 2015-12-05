
var fps = document.createElement('div');
fps.className = 'fps hide';
var body = document.body;
body.appendChild(fps);

function update (num) {
  fps.innerHTML = num;
  fps.className = 'fps';
}

exports.update = update;