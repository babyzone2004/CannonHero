
/*
 * 声音事件，多线程处理声音 Date: 2011-5-23
 * @Param {String} src 音频地址
 * @Param {Int} multi 初始化实例数，例如子弹连续射击需要多个实例
 */
function Sound(src,multi)
{
  var arr = this.myInstanceArray = new Array();
  this.myNumInstances = multi;
  this.myInstanceIndex = 0;
  for (var i = 0; i <= multi; i++) {
    var instance = new Audio(src);
    instance.load();
    this.myInstanceArray[i] = instance;
  }
}

//
Sound.prototype.play = function(cb)
{
  var instance = this.myInstanceArray[this.myInstanceIndex];
  var endHandler = function() {
    console.log('ended');
    cb && cb();
    instance.removeEventListener('ended', endHandler);
  }
  instance.addEventListener('ended', endHandler);
  instance.play();

  this.myInstanceIndex++;
  if ( this.myInstanceIndex >= this.myNumInstances) {
    this.myInstanceIndex = 0;
  }
}
Sound.prototype.stop = function()
{
  var audio = this.myInstanceArray[this.myInstanceIndex];
  audio.currentTime = 0;
  audio.pause();
}


function init(src,multi) {
  // if(window.AudioContext || window.webkitAudioContext) {
  //   return new AudioContext(src, multi);
  // } else {
  //   return new Sound(src, multi);
  // }
  return new Sound(src, multi);
}

// function AudioContext (argument) {
//   this.context =  new (window.AudioContext || window.webkitAudioContext || function(){})();
//   this.source = null;  
//   this.audioBuffer = null;  
// }

// function playSound() {  
//     source = context.createBufferSource();  
//     source.buffer = audioBuffer;  
//     source.connect(context.destination);  
//     source.start(); //立即播放  
// }  
// function initSound(arrayBuffer) {  
//     context.decodeAudioData(arrayBuffer, function(buffer) { //解码成功时的回调函数  
//         audioBuffer = buffer;  
//         playSound();  
//     }, function(e) { //解码出错时的回调函数  
//         console.log('Error decoding file', e);  
//     });  
// }  
// function loadAudioFile(url) {  
//     var xhr = new XMLHttpRequest(); //通过XHR下载音频文件  
//     xhr.open('GET', url, true);  
//     xhr.responseType = 'arraybuffer';  
//     xhr.onload = function(e) { //下载完成  
//       initSound(this.response);  
//     };  
//     xhr.send();  
// }
// context && loadAudioFile(__uri('/assets/sounds/coin.wav'));

module.exports = {
  init: init
};