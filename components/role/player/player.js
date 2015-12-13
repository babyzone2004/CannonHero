
var player = new Image();
player.src = __uri('player.png');

var offsetX = 80;
var offsetY = 800;
var sWidth = 140;
var sHeight = 98;
var dWidth = 210;
var dHeight = 147;
var globalAlpha = 0;

function update(context, fps, stageWidth, stageHeight) {

}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.drawImage(player, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.drawImage(player, 0, 127, sWidth, sHeight, 0, 0, dWidth, dHeight);
  if(globalAlpha !== 0) {
    ctx.globalAlpha = globalAlpha;
    ctx.drawImage(player, 0, 250, sWidth, sHeight, 0, 0, dWidth, dHeight);
  }
  ctx.restore();
}


module.exports = {
  paint: paint,
  update: update,
  visible: true
};