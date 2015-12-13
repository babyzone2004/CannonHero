// High scores................................................................

// Returns an array of high scores from local storage.
// High scores
var key = 'highscores';

return {
   getHighScores: function () {
      var highScoresString = localStorage[key];

      if (highScoresString == undefined) {
         localStorage[key] = JSON.stringify([]);
      }
      return JSON.parse(localStorage[key]);
   },

   // Sets the high score in local storage.

   setHighScore: function (keyhighScore) {
      var highScoresString = localStorage[key];
      highScores.unshift(highScore);
      localStorage[key] = JSON.stringify(highScores);
   },

   // Removes the high scores from local storage.

   clearHighScores: function () {
      localStorage[key] = JSON.stringify([]);
   }
}