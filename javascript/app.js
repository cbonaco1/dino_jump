$(document).ready(function() {
  this.started = false;
  this.score = 0;
  var dino = document.getElementById("dino");

  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 32) {
      //start timer
      //performance.now();
    }
  });

  document.addEventListener("keyup", function(e) {
    if (e.keyCode === 32) {
      //stop timer
      //performance.now();
    }
  });

  document.addEventListener("keypress", function(e){
    if (e.keyCode === 32) {
      e.preventDefault();

      if (!this.started) {
        this.started = true;
      }

      /*
      If user holds down spacebar longer, then add high-jump class,
      otherwise add jump
      */

      dino.style.bottom = "50px";
      window.setTimeout(function() {
        dino.style.bottom = "0px";
      }, 1000);

      if (this.started) {
        var obstacles = document.getElementsByClassName("obstacle");
        for (var i = 0; i < obstacles.length; i++) {
          debugger
          // var obstalceWidth = obstacles[i].offsetWidth();
          obstacles[i].style.left = "-" + obstalceWidth.toString() + "px";
        }
      }
    }
  });
});
