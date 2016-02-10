var Game = require('./javascript/game');
var Dino = require('./javascript/dino');
var Obstacle = require('./javascript/obstacle');

$(document).ready(function() {
  var game = new Game();
  var dinoElement = document.getElementById("dino");
  var dino = new Dino(dinoElement);
  var gameField = document.getElementById("game-field");

  //dont need to put this in a document ready since it is on the document
  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 32) {
      e.preventDefault();
      if (!game.started) {
        game.start();

        this.obstalceInterval = window.setInterval(function(){
          var obstacle = new Obstacle(game);
          //append obstacle to game-field
          // debugger
          gameField.appendChild(obstacle.domElement);

          window.setTimeout(function() {
            obstacle.slide();
          }.bind(this), 10);

        }.bind(this), 1000);


      }
      else {
        // game.stop();
        // window.clearInterval(this.obstalceInterval);
      }
      dino.jump();
    }
  });

  document.addEventListener("keydown", function(e){
    // console.log(e.keyCode);
    if (e.keyCode === 40) {
      e.preventDefault();
      dino.duck();
    }
  });


  document.addEventListener("keyup", function(e){
    if (e.keyCode === 40) {
      e.preventDefault();
      dino.rise();
    }
  });

});
