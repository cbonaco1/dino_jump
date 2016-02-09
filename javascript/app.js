$(document).ready(function() {
  this.started = false;
  var dino = document.getElementById("dino");
  document.addEventListener("keypress", function(e){
    if (e.keyCode === 32) {
      e.preventDefault();

      if (!this.started) {
        this.started = true;
      }

      dino.style.bottom = "50px";
      window.setTimeout(function() {
        dino.style.bottom = "0px";
      }, 1000);
    }
  });
});
