var Game = require('./javascript/game');

$(document).ready(function() {
  var game = new Game();
  var dino = document.getElementById("dino");

  //dont need to put this in a document ready since it is on the document
  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 32) {
      e.preventDefault();
      if (!game.started) {
        game.start();
      }
      else {
        game.stop();
      }
    }
  });


});
