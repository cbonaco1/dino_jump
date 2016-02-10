var Game = require('./javascript/game');
var Dino = require('./javascript/dino');
var Obstacle = require('./javascript/obstacle');

  //TODO Get difficulty from user, then pass this into Game object
  //this represents the speed at which the obstalces will come out

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
