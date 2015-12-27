
var getTimeNow = function () {
   return +new Date();
};

// Game.......................................................................
/*
 * Game engin，提供以下功能：
 * 更新sprite
 * 暂停
 * FPS
*/

var Game = function (gameName, canvasId) {
   var canvas = document.getElementById(canvasId),
       self = this;

   // General
   this.context = canvas.getContext('2d');
   this.stageWidth = canvas.width;
   this.stageHeight = canvas.height;
   this.sprites = [];
   this.keyListeners = [];

   // Time
   this.lastTime = 0;
   this.fps = 0;
   this.STARTING_FPS = 60;

   this.paused = false;
   // 暂停游戏后的更新频率
   this.PAUSE_TIMEOUT = 100;

   return this;
};

// Game methods...............................................................
Game.prototype = {
   // Game loop..................................................................
   start: function () {
      // The this variable is the game
      var self = this;

      requestAnimationFrame(
         function (time) {
            self.animate(time);
            // self.animate.call(self, time);
         });
   },

   animate: function (time) {
      var self = this;
      
      if (this.paused) {
         setTimeout( function () {
            requestAnimationFrame(
               function (time) {
                  self.animate(time);
                  // self.animate.call(self, time);
               });
         }, this.PAUSE_TIMEOUT);
      }
      else {
         this.fps = (0.5 + 1000 / (time - this.lastTime)) << 0; // Update fps, game time
         this.clearScreen(); // Clear the screen in preparation for next frame
         this.startAnimate(time);  // Override as you wish
         this.paintUnderSprites(); // Override as you wish

         this.updateSprites(); // Invoke sprite behaviors
         this.paintSprites(time);  // Paint sprites in the canvas

         this.paintOverSprites();  // Override as you wish
         this.endAnimate();        // Override as you wish

         this.lastTime = time;

         // Call this method again when it's time for the next animation frame

         requestAnimationFrame(
            function (time) {
               self.animate(time);
               // self.animate.call(self, time); // The this variable refers to the window
            });
      }
   },

   // Clear the entire canvas.
   clearScreen: function () {
      this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);
   },

   // Update all sprites. The sprite update() method invokes all
   // of a sprite's behaviors.
   updateSprites: function () {
      for(var i=0; i < this.sprites.length; ++i) {
         var sprite = this.sprites[i];
         sprite.update(this.context, this.fps, this.stageWidth, this.stageHeight);
      };
   },

   // Paint all visible sprites.
   paintSprites: function (time) {
      for(var i=0; i < this.sprites.length; ++i) {
         var sprite = this.sprites[i];
         if (sprite.visible)
            sprite.paint(this.context, this.stageWidth, this.stageHeight);
      };
   },
   togglePaused: function () {
      var now = getTimeNow();
      this.paused = !this.paused;
      if (!this.paused) {
         this.lastTime = now;
      }
   },

   // Sprites....................................................................
   // Add a sprite to the game. The game engine will update the sprite and
   // paint it (if it's visible) in the animate() method.
   addSprite: function (sprite) {
      this.sprites.push(sprite);
   },
   
   // It's probably a good idea not to access sprites directly, because
   // it's better to write generalized code that deals with all
   // sprites, so this method should be used sparingly.
   getSprite: function (name) {
      for(i in this.sprites) {
         if (this.sprites[i].name === name)
            return this.sprites[i];
      }
      return null;      
   },

   // Override the following methods as desired:
   startAnimate:      function (time) { }, // These methods are called by
   paintUnderSprites: function ()     { }, // animate() in the order they
   paintOverSprites:  function ()     { }, // are listed. Override them
   endAnimate:        function ()     { }  // as you wish.
};

return Game;