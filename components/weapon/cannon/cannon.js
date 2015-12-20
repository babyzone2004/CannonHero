

var cannon = new Image();
cannon.src = __uri('cannon.png');

var offsetX;
var offsetY;
var dWidth = 73;
var dHeight = 32;

var bulletsX = 60;

var bullets = require('/components/bullets/bullets.js');
var rocket = require('/components/bullets/rocket/rocket.js');

function updatePositon(context, _offsetX, _offsetY) {
  offsetX = _offsetX;
  offsetY = _offsetY;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.drawImage(cannon, offsetX, offsetY, dWidth, dHeight);
}

function fire() {
  bullets.add(rocket.create(offsetX + bulletsX, offsetY));
}


module.exports = {
  paint: paint,
  updatePositon: updatePositon,
  fire: fire
};