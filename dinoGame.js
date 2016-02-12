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
        // debugger
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

  });

});
