var Game = require('./javascript/game');
var Dino = require('./javascript/dino');
var Obstacle = require('./javascript/obstacle');

$(document).ready(function() {
  var dino = new Dino(document.getElementById("dino"));
  var makeJump = true;

  var startButtons = document.getElementsByClassName("level-button");
  for (var i = 0; i < startButtons.length; i++) {
    startButtons[i].addEventListener("click", function(e){

      var game = new Game(e.target.value);

      if (!game.started) {
        game.start();
        dino.setJumpHeight(game.settings.jumpHeight);
      }

    });
  }

  document.addEventListener("keydown", function(e){
    console.log(e.keyCode);
    if (e.keyCode === 40) {
      e.preventDefault();
      dino.duck();
    }

    //32 == space bar
    if ((e.keyCode === 32) || (e.keyCode == 38)) {
      e.preventDefault();

      //prevents the dino from being held up if the user
      //holds down spacebar
      if (makeJump) {
        dino.jump();
      }
      makeJump = false;
    }

    if (e.keyCode == 39) {
      dino.slideRight();
    }
    if (e.keyCode == 37) {
      dino.slideLeft();
    }
  });

  document.addEventListener("keyup", function(e){
    makeJump = true;

    //40 == down key
    if (e.keyCode === 40) {
      e.preventDefault();
      dino.rise();
    }

  });

});
