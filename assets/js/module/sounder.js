
/*
 * 声音事件，多线程处理声音 Date: 2011-5-23
 * @Param {String} src 音频地址
 * @Param {Int} multi 初始化实例数，例如子弹连续射击需要多个实例
 */
function Sound(src,multi)
{
  this.myInstanceArray = new Array();
  this.myNumInstances = multi ;
  this.myInstanceIndex = 0;
  for ( var i = 0; i < this.myNumInstances; ++i )
  {
    this.myInstanceArray[i] = new Audio(src);
    this.myInstanceArray[i].load();
  }
}

//
Sound.prototype.play = function()
{
   this.myInstanceArray[this.myInstanceIndex].play();
   this.myInstanceIndex++;
   if ( this.myInstanceIndex >= this.myNumInstances)
   {
      this.myInstanceIndex = 0;
   }
}
Sound.prototype.stopbg = function()
{
   this.myInstanceArray[this.myInstanceIndex].pause();
}


function init(src,multi) {
  return new Sound(src,multi);
}


module.exports = {
  init: init
};