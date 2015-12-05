
var getTimeNow = function () {
   return +new Date();
};

// Game.......................................................................

var Game = function (gameName, canvasId) {
   var canvas = document.getElementById(canvasId),
       self = this;

   // General
   
   this.context = canvas.getContext('2d');
   this.gameName = gameName;
   this.sprites = [];
   this.keyListeners = [];

   // High scores
   this.HIGH_SCORES_SUFFIX = '_highscores';


   // Time
   // 游戏开始时间，会根据暂停等情况，修正startTime
   this.startTime = 0;
   this.lastTime = 0;
   this.gameTime = 0;
   this.fps = 0;
   this.STARTING_FPS = 60;

   this.paused = false;
   this.startedPauseAt = 0;
   this.PAUSE_TIMEOUT = 100;

   return this;
};

// Game methods...............................................................

Game.prototype = {
   
   // Game loop..................................................................

   start: function () {
      // The this variable is the game
      var self = this;
      // Record game's startTime (used for pausing)
      this.startTime = getTimeNow();

      window.requestAnimationFrame(
         function (time) {
            self.animate.call(self, time);
         });
   },

   animate: function (time) {
      var self = this;
      
      if (this.paused) {
         setTimeout( function () {
            window.requestAnimationFrame(
               function (time) {
                  self.animate.call(self, time);
               });
         }, this.PAUSE_TIMEOUT);
      }
      else {
         this.tick(time); // Update fps, game time
         this.clearScreen(); // Clear the screen in preparation for next frame

         this.startAnimate(time);  // Override as you wish
         this.paintUnderSprites(); // Override as you wish

         this.updateSprites(time); // Invoke sprite behaviors
         this.paintSprites(time);  // Paint sprites in the canvas

         this.paintOverSprites();  // Override as you wish
         this.endAnimate();        // Override as you wish

         this.lastTime = time;

         // Call this method again when it's time for the next animation frame

         window.requestAnimationFrame(
            function (time) {
               self.animate.call(self, time); // The this variable refers to the window
            });
      }
   },

   // Update the frame rate, game time, and the last time the application
   // drew an animation frame.
   
   tick: function (time) {
      this.updateFrameRate(time);
      this.gameTime = (getTimeNow()) - this.startTime;
   },

   updateFrameRate: function (time) {
      if (this.lastTime === 0) {
         this.fps = this.STARTING_FPS;
      }
      else {
         this.fps = Math.floor(1000 / (time - this.lastTime));
      }             
   },

   // Clear the entire canvas.
   
   clearScreen: function () {
      this.context.clearRect(0, 0,
         this.context.canvas.width, this.context.canvas.height);
   },

   // Update all sprites. The sprite update() method invokes all
   // of a sprite's behaviors.

   updateSprites: function (time) {
      for(var i=0; i < this.sprites.length; ++i) {
         var sprite = this.sprites[i];
         sprite.update(this.context, time);
      };
   },

   // Paint all visible sprites.
   
   paintSprites: function (time) {
      for(var i=0; i < this.sprites.length; ++i) {
         var sprite = this.sprites[i];
         if (sprite.visible)
            sprite.paint(this.context);
      };
   },

   // Toggle the paused state of the game. If, after
   // toggling, the paused state is unpaused, the
   // application subtracts the time spent during
   // the pause from the game's start time. That
   // means the game picks up where it left off,
   // without a potentially large jump in time.

   togglePaused: function () {
      var now = getTimeNow();

      this.paused = !this.paused;

      if (this.paused) {
         this.startedPauseAt = now;
      }
      else { // not paused
         // Adjust start time, so game starts where it left off when
         // the user paused it.

         this.startTime = this.startTime + now - this.startedPauseAt;
         this.lastTime = now;
      }
   },

   // Given a velocity of some object, calculate the number of pixels to
   // move that object for the current frame.
   
   pixelsPerFrame: function (time, velocity) {
      // Sprites move a certain amount of pixels per frame (pixels/frame).
      // This methods returns the amount of pixels a sprite should move
      // for a given frame. Sprite velocity is measured in pixels / second,
      // so: (pixels/second) * (second/frame) = pixels/frame:

      return velocity / this.fps;  // pixels / frame
   },

   // High scores................................................................

   // Returns an array of high scores from local storage.
   
   getHighScores: function () {
      var key = this.gameName + this.HIGH_SCORES_SUFFIX,
          highScoresString = localStorage[key];

      if (highScoresString == undefined) {
         localStorage[key] = JSON.stringify([]);
      }
      return JSON.parse(localStorage[key]);
   },

   // Sets the high score in local storage.

   setHighScore: function (highScore) {
      var key = this.gameName + this.HIGH_SCORES_SUFFIX,
          highScoresString = localStorage[key];
      
      highScores.unshift(highScore);
      localStorage[key] = JSON.stringify(highScores);
   },

   // Removes the high scores from local storage.

   clearHighScores: function () {
      localStorage[this.gameName + this.HIGH_SCORES_SUFFIX] = JSON.stringify([]);
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