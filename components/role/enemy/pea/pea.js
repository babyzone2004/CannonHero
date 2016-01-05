
var AnimationTimer = require('/assets/js/animationTimer.js');
var animationTimer = new AnimationTimer(800, AnimationTimer.makeElastic(1));

var player = new Image();
player.src = __uri('pea.png');

var sounder = require('/assets/js/module/sounder.js');
var sHited = sounder.init(__uri('/assets/sounds/coin.ogg'), 1);

var context =  new (window.AudioContext || window.webkitAudioContext || function(){})();
var source = null;  
var audioBuffer = null;  

function playSound() {  
    source = context.createBufferSource();  
    source.buffer = audioBuffer;  
    source.loop = true;  
    source.connect(context.destination);  
    source.start(); //立即播放  
}  
function initSound(arrayBuffer) {  
    context.decodeAudioData(arrayBuffer, function(buffer) { //解码成功时的回调函数  
        audioBuffer = buffer;  
        playSound();  
    }, function(e) { //解码出错时的回调函数  
        console.log('Error decoding file', e);  
    });  
}  
function loadAudioFile(url) {  
    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件  
    xhr.open('GET', url, true);  
    xhr.responseType = 'arraybuffer';  
    xhr.onload = function(e) { //下载完成  
        initSound(this.response);  
    };  
    xhr.send();  
}  
context && loadAudioFile(__uri('/assets/sounds/coin.ogg'));  

// 出场位置
var firstY = 780;
var firstX = 800;
var offsetX;
var offsetY;
// 源尺寸
var sWidth = 140;
var sHeight = 98;
// 目标尺寸
var dWidth = 140;
var dHeight = 98;
var globalAlpha = 0;

// 运动的移动距离
var moveDistantY = 0;
var velocityY = 15;
var lastTime;
animationTimer.start();

// 武器相对位置
var weapon = {
  updatePositon: function() {},
  fire: function() {},
  paint: function() {}
};
var weaponX = 18;
var weaponY = 0;

var particleGenerator = require('assets/js/module/particleGenerator.js').initParticle({
  numPerFrame: 0.2,
  radius: 5,
  velocityMinX: 0,
  velocityMaxX: 1.5,
  velocityMinY: -0.05,
  velocitymaxY: 0.05,
  fillColor: "rgba(255, 255, 255, 0.8)",
  strokeColor: "rgba(251, 88, 0, 0.15)"
});
var particleX = 121;
var particleY = 50;

var shapes = require('/assets/js/module/shapes.js');
var pointX = firstX + 30;
var pointy = firstY + 30;
var shape = shapes.initPolygon([{x: pointX, y: pointy}, {x: pointX - 15, y: pointy + 45}, {x: pointX + 80, y: pointy + 45}, {x: pointX + 100, y: pointy}]);

function update(context, fps, stageWidth, stageHeight) {
  var elapsedTime = animationTimer.getElapsedTime();
  var dy = 0;
  if(lastTime) {
    if(animationTimer.isOver()) {
      velocityY = -velocityY;
      animationTimer.start();
      elapsedTime = null;
    } else {
      dy = velocityY * (elapsedTime - lastTime) / 1000;
      moveDistantY += dy;
    }
  }
  offsetY = firstY + moveDistantY;
  offsetX = firstX;
  // console.log('offsetY', offsetY);
  weapon.updatePositon(context, offsetX + weaponX, offsetY + weaponY);
  particleGenerator.update(offsetX + particleX, offsetY + particleY);
  shape.move(0, dy);
  lastTime = elapsedTime;
}

function paint(ctx, stageWidth, stageHeight) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.drawImage(player, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.drawImage(player, 0, 127, sWidth, sHeight, 0, 0, dWidth, dHeight);
  ctx.restore();

  weapon.paint(ctx, stageWidth, stageHeight);
  // shape.stroke(ctx);
  // shape.fill(ctx);
}

function equip(_weapon) {
  weapon = _weapon;
}

function destroy () {
  sHited.play();
}

document.addEventListener('touchend', function() {
  weapon && weapon.fire();
});

module.exports = {
  paint: paint,
  update: update,
  visible: true,
  shape: shape,
  equip: equip,
  destroy: destroy
};