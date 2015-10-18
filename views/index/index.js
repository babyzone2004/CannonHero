


var dom = require('assets/js/module/dom.js');


// function id(elem) {
//    return document.getElementById(elem);
// }
// var game = new Game('Cannon', 'gameCanvas'),

// // fps
// lastFpsUpdateTime = +new Date();
// fps = id('fps'),

// // player
// player = null,

// // Loading....................................................

// loading = false,  // not yet, see the end of this file
// loadingToast = document.getElementById('loadingToast'),
// loadingMessage = document.getElementById('loadingMessage'),
// loadButton = document.getElementById('loadButton'),
// progressDiv = document.getElementById('progressDiv'),
// progressbar = new COREHTML5.Progressbar(225, 25, 'rgba(0,0,0,0.5)', 100, 130, 250),
   
// // Score......................................................

// scoreToast = document.getElementById('scoreToast'),
// scoreReadout = document.getElementById('score'),
// score = 0,
// lastScore = 0,
// lastScoreUpdate = undefined,

// // High Score.................................................

// HIGH_SCORES_DISPLAYED = 10,

// highScoreToast = document.getElementById('highScoreToast'),
// highScoreParagraph = document.getElementById('highScoreParagraph'),
// highScoreList = document.getElementById('highScoreList'),
// previousHighScoresTitle = document.getElementById('previousHighScoresTitle'),
// nameInput = document.getElementById('nameInput'),
// addMyScoreButton = document.getElementById('addMyScoreButton'),
// newGameButton = document.getElementById('newGameButton'),
// newGameFromHighScoresButton =
//       document.getElementById('newGameFromHighScoresButton'),
// clearHighScoresCheckbox = document.getElementById('clearHighScoresCheckbox'),

// // Lives......................................................

// livesLeft = 3,
// life = 100,

// // Paused.....................................................

// pausedToast = document.getElementById('pausedToast'),

// // Game Over..................................................

// gameOverToast = document.getElementById('gameOverToast'),
// gameOver = false,

// // Sun Constants..............................................

// SUN_TOP = 80,
// SUN_LEFT = 80,
// SUN_RADIUS = 30,


// // Lose life..................................................

// loseLifeToast = document.getElementById('loseLifeToast'),
// loseLifeButton = document.getElementById('loseLifeButton'),
   
// // Scrolling the background...................................

// translateDelta = 0.01,
// translateOffset = 0,

// scrollBackground = function () {
//    translateOffset =
//       (translateOffset + translateDelta) % game.context.canvas.width;
//    game.context.translate(-translateOffset,0);  
// },

// // Paint Methods..............................................

// paintSun = function (context) {
//    context.save();

//    context.strokeStyle = '#e5a100';
//    context.fillStyle = '#e5a100';
//    context.lineWidth = 1;

//    context.beginPath();
//    context.arc(SUN_LEFT, SUN_TOP, SUN_RADIUS, 0, Math.PI*2, true);
//    context.fill();
//    context.stroke();

//    context.stroke();
//    context.restore();
// },

// paintFarCloud = function (context, x, y) {
//    context.save();
//    scrollBackground();
//    context.lineWidth=0.5;
//    context.strokeStyle='rgba(255,255,255, 0.3)';
//    context.fillStyle='rgba(255,255,255,0.3)';
//    context.beginPath();

//    context.moveTo(x+102, y+91);
//    context.quadraticCurveTo(x+105, y+71, x+130, y+81);
//    context.quadraticCurveTo(x+150, y+71, x+150, y+91);
//    context.quadraticCurveTo(x+150, y+93, x+104, y+92);
//    context.closePath();
//    context.stroke();
//    context.fill();
//    context.restore();
// },

// paintNearCloud = function (context, x, y) {
//    context.save();
//    scrollBackground();
//    scrollBackground();
//    context.lineWidth=0.5;
//    context.strokeStyle='rgba(255,255,255, 0.4)';
//    context.fillStyle='rgba(255,255,255,0.4)';
//    context.beginPath();

//    context.fillStyle='rgba(255,255,255,0.5)';

//    context.moveTo(x+130, y+137);
//    context.quadraticCurveTo(x+134, y+108, x+184, y+121);
//    context.quadraticCurveTo(x+210, y+111, x+210, y+137);
//    context.quadraticCurveTo(x+198, y+139, x+133, y+138);
//    context.closePath();
//    context.stroke();
//    context.fill();
//    context.restore();
// },

// // Game over..................................................

// over = function () {
//    var highScore;
//    highScores = game.getHighScores();

//    if (highScores.length == 0 || score > highScores[0].score) {
//       showHighScores();
//    }
//    else {
//      gameOverToast.style.display = 'inline';
//    }

//    gameOver = true;
//    lastScore = score;
//    score = 0;
// };

   
// // Pause and Auto-pause.......................................

// togglePaused = function () {
//    game.togglePaused();
//    pausedToast.style.display = game.paused ? 'inline' : 'none';
// };

// pausedToast.onclick = function (e) {
//    pausedToast.style.display = 'none';
//    togglePaused();
// };

// window.onblur = function windowOnBlur() { 
//    if (!loading && !gameOver && !game.paused) {
//       togglePaused();
//       pausedToast.style.display = game.paused ? 'inline' : 'none';
//    }
// };

// window.onfocus = function windowOnFocus() {
//    if (game.paused) {
//       togglePaused();
//       pausedToast.style.display = game.paused ? 'inline' : 'none';
//    }
// };


// // New game ..................................................

// newGameButton.onclick = function (e) {
//    gameOverToast.style.display = 'none';
//    loseLifeToast.style.display = 'inline';
//    startNewGame();
// };

// function startNewGame() {
//    highScoreParagraph.style.display = 'none';
//    gameOver = false;
//    livesLeft = 3;
//    score = 0;
//    loseLifeButton.focus();
// };

// // High Scores................................................

// // Change game display to show high scores when
// // player bests the high score.
   
// showHighScores = function () {
//    highScoreParagraph.style.display = 'inline';
//    highScoreParagraph.innerHTML = score;
//    highScoreToast.style.display = 'inline';
//    updateHighScoreList();
//    nameInput.focus();
// };

// // The game shows the list of high scores in
// // an ordered list. This method creates that
// // list element, and populates it with the
// // current high scores.
   
// updateHighScoreList = function () {
//    var el,
//        highScores = game.getHighScores(),
//        length = highScores.length,
//        highScore,
//        listParent = highScoreList.parentNode;

//    listParent.removeChild(highScoreList);
//    highScoreList = document.createElement('ol');
//    highScoreList.id = 'highScoreList'; // So CSS takes effect
//    listParent.appendChild(highScoreList);
      
//    if (length > 0) {
//       previousHighScoresTitle.style.display = 'block';
         
//       length = length > 10 ? 10 : length;

//       for (var i=0; i < length; ++i) {
            
//          highScore = highScores[i];
//          el = document.createElement('li');
//          el.innerHTML = highScore.score +
//                                     ' by ' + highScore.name;  
//          highScoreList.appendChild(el);
//       }
//    }
//    else {
//       previousHighScoresTitle.style.display = 'none';
//    }
// }

// // The browser invokes this method when the user clicks on the
// // Add My Score button.
   
// addMyScoreButton.onclick = function (e) {
//    game.setHighScore({ name: nameInput.value, score: lastScore });
//    updateHighScoreList();
//    addMyScoreButton.disabled = 'true';
//    nameInput.value = '';
// };


// // The browser invokes this method when the user clicks on the
// // new game button.
   
// newGameFromHighScoresButton.onclick = function (e) {
//    loseLifeToast.style.display = 'inline';
//    highScoreToast.style.display = 'none';
//    startNewGame();
// };

// // The Add My Score button is only enabled when there
// // is something in the nameInput field.
   
// nameInput.onkeyup = function (e) {
//    if (nameInput.value.length > 0) {
//       addMyScoreButton.disabled = false; 
//    }
//    else {
//       addMyScoreButton.disabled = true; 
//    }
// };

// // Score Display..............................................

// updateScore = function () {
//    if ( !loading && game.lastScoreUpdate !== undefined) {
//       if (game.gameTime - game.lastScoreUpdate > 1000) {
//          score += 10;
//          scoreToast.innerHTML = score.toFixed(0);
//          game.lastScoreUpdate = game.gameTime;
//       }
//    }
//    else {
//       game.lastScoreUpdate = game.gameTime;
//    }
// };

// // Game Paint Methods.........................................
   
// game.paintOverSprites = function () {
//    paintNearCloud(game.context, 120, 20);
//    paintNearCloud(game.context, game.context.canvas.width+120, 20);
//    player && player.draw(game.context, game.lastTime);
// }
   
// game.paintUnderSprites = function () { // Draw things other than sprites
//    if (!gameOver && livesLeft === 0) {
//          over();
//    }
//    else {
//       paintSun(game.context);
//       paintFarCloud(game.context, 20, 20);
//       paintFarCloud(game.context, game.context.canvas.width+20, 20);
//       var now = +new Date();
//       if (now - lastFpsUpdateTime > 1000) {
//          fps.innerHTML = game.fps;
//          lastFpsUpdateTime = now;
//       }
      
//       if (!gameOver) {
//          updateScore();
//       }
//    }
// };

// // End game button............................................

// loseLifeButton.onclick = function (e) {
//    livesLeft--;
//    game.playSound('whoosh');

//    if (livesLeft === 0) {
//       loseLifeToast.style.display = 'none';      
//    }
// };

// clearHighScoresCheckbox.onclick = function (e) {
//    if (clearHighScoresCheckbox.checked) {
//       game.clearHighScores();
//    }
// };

// // Load game..................................................

// loading = true;
// player = new Player(game.context);

// loadButton.onclick = function (e) {
//    var interval,
//        loadingPercentComplete = 0;

//    e.preventDefault();

//    loadButton.style.display = 'none';

//    loadingMessage.style.display = 'block';
//    progressDiv.style.display = 'block';
  
//    progressDiv.appendChild(progressbar.domElement);

//    game.queueImage('images/enemy_weapons_2.png');
//    game.queueImage('images/fighter.png');

//    // test
//    game.queueImage('http://t3.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/0f1f2c542d34346b90ce5d4a808e7a79aa72871d9');
//    game.queueImage('http://t5.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/02bf54de8ab5fa8be8b61a6d81dda5d8a6c401841');
   
//    interval = setInterval( function (e) {
//       loadingPercentComplete = game.loadImages();

//       if (loadingPercentComplete === 100) {
//          clearInterval(interval);

         

//          setTimeout( function (e) {
//             loadingMessage.style.display = 'none';
//             progressDiv.style.display = 'none';

//             setTimeout( function (e) {

//                setTimeout( function (e) {
//                   loadingToast.style.display = 'none';   
//                   loseLifeToast.style.display = 'block';   
//                   game.playSound('pop');

//                   setTimeout( function (e) {
//                      loading = false;
//                      score = 10;
//                      scoreToast.innerText = '10'; // won't get set till later, otherwise
//                      scoreToast.style.display = 'inline';
//                      game.playSound('pop');
//                      loseLifeButton.focus();
//                   }, 1000);
//                }, 500);
//             }, 500);
//          }, 500);
//       }
//       progressbar.draw(loadingPercentComplete);
//    }, 16);
// };

// // Start game.................................................

// game.start();
