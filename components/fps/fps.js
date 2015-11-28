
var fps = document.createElement('div');
fps.className = 'fps';
var body = document.body;
body.appendChild(fps);

function update (num) {
  fps.innerHTML = num;
}

exports.update = update;