
var Player = function(context, url) {
  var spritesheet = new Image(),
      runnerCells = [
        { left: 0,   top: 0, width: 47, height: 64 },
        { left: 55,  top: 0, width: 44, height: 64 },
        { left: 107, top: 0, width: 39, height: 64 },
        { left: 152, top: 0, width: 46, height: 64 },
        { left: 208, top: 0, width: 49, height: 64 },
        { left: 265, top: 0, width: 46, height: 64 },
        { left: 320, top: 0, width: 42, height: 64 },
        { left: 380, top: 0, width: 35, height: 64 },
        { left: 425, top: 0, width: 35, height: 64 },
      ];

      // Behaviors.................................................

      runInPlace = {
         lastAdvance: 0,
         PAGEFLIP_INTERVAL: 100,

         execute: function (sprite, context, time) {
            if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
               sprite.painter.advance();
               this.lastAdvance = time;
            }
         }
      }

      // Sprite....................................................

      sprite = new Sprite('runner',
                          new SpriteSheetPainter(runnerCells, spritesheet),
                          [ runInPlace]);
  // Initialization................................................

  spritesheet.src = 'images/running-sprite-sheet.png';

  sprite.velocityX = 50;  // pixels/second
  sprite.left = 200;
  sprite.top = 400;
  this.sprite = sprite;
}

Player.prototype.draw = function(context, time) {
  this.sprite.update(context, time);
  this.sprite.paint(context); 
};
