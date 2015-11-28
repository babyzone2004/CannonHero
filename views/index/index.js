


var fps = require('/components/fps/fps.js');

// test

var Game = require('/assets/js/gameEngine.js');
var game = new Game('Cannon', 'gameCanvas');

game.paintUnderSprites = function () {
   fps.update(game.fps);
};


game.start();