
var Player = function(context, url) {
  var spritesheet = new Image(),
      ANIMATION_DURATION = 1000,
      animationTimer = new AnimationTimer(ANIMATION_DURATION, AnimationTimer.makeEaseOut(1)),
      runnerCells = [
        { left: 0,   top: 0, width: 140, height: 94 },
        { left: 0,  top: 129, width: 140, height: 94 }
      ];
  animationTimer.start();
      // Behaviors.................................................

  var runInPlace = {
         lastAdvance: 0,
         PAGEFLIP_INTERVAL: 100,
         lastMove: 0,

         execute: function (sprite, context, time) {
            var elapsed = animationTimer.getElapsedTime(),
                advanceElapsed = elapsed - this.lastMove;
            // console.log(elapsed);
            if(animationTimer.isOver()) {
              animationTimer.reset();
            } else {
              if (this.lastMove === 0) {
                 this.lastMove = elapsed;
              } else {
                 sprite.top -= (advanceElapsed / 1000) * sprite.velocityX;
                 this.lastMove = elapsed;
              }
            }
            
         }
      }

      // Sprite....................................................

  var sprite = new Sprite('fighter',
                          new SpriteSheetPainter(runnerCells, spritesheet),
                          [ runInPlace]);
  // Initialization................................................

  spritesheet.src = 'images/fighter.png';

  sprite.velocityX = 5;  // pixels/second
  sprite.left = 50;
  sprite.top = 400;
  this.sprite = sprite;

  var weapon = new Sprite('weapon', new ImagePainter('images/enemy_weapons_2.png'));
  weapon.left = 67;
  weapon.top = 400;
  this.weapon = weapon;
}

Player.prototype.draw = function(context, time) {
  this.sprite.update(context, time);
  this.sprite.paint(context); 
  this.weapon.paint(context);
};
