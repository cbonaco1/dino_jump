var Game = require('./javascript/game');
var Dino = require('./javascript/dino');
var Obstacle = require('./javascript/obstacle');

  //TODO Get difficulty from user, then pass this into Game object
  //this represents the speed at which the obstalces will come out

$(document).ready(function() {
  var dinoElement = document.getElementById("dino");
  var dino = new Dino(dinoElement);
  var gameField = document.getElementById("game-field");
  var makeJump = true;

  var startButtons = document.getElementsByClassName("level-button");
  for (var i = 0; i < startButtons.length; i++) {
    startButtons[i].addEventListener("click", function(e){
      var game = new Game(e.target.value);
        if (!game.started) {
          game.start();
        }
        else {
          // game.stop();
          // window.clearInterval(this.obstalceInterval);
        }

    });
  }

  document.addEventListener("keydown", function(e){
    if (e.keyCode === 40) {
      e.preventDefault();
      dino.duck();
    }
    if (e.keyCode === 32) {
      e.preventDefault();
      if (makeJump) {
        dino.jump();
      }
      makeJump = false;
    }
  });


  document.addEventListener("keyup", function(e){
    makeJump = true;

    if (e.keyCode === 40) {
      e.preventDefault();
      dino.rise();
    }
    // if (e.keyCode === 32) {
    //   e.preventDefault();
    //   dino.down();
    // }
  });

});
