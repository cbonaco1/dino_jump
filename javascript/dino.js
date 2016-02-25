var Dino = function(dinoElement) {
  this.dino = dinoElement;
}

Dino.prototype.setJumpHeight = function (height) {
  this.jumpHeight = height;
};

Dino.prototype.jump = function () {
  if (this.jumpHeight) {
    this.dino.style.bottom = this.jumpHeight;
    //add class
  }
  else {
    //makes the dino jump before the game is set
    //allow user to test out jumping before game starts
    this.dino.style.bottom = "200px";
  }

  window.setTimeout(function() {
    this.dino.style.bottom = "22px";
  }.bind(this), 500);
};

//Try rotating the dino forward intead of ducking
Dino.prototype.duck = function () {
  // this.dino.style.height = "50px";
  $(this.dino).addClass("duck");
};

Dino.prototype.rise = function () {
  // this.dino.style.height = "100px";
  $(this.dino).removeClass("duck");
};

Dino.prototype.slideRight = function () {
  var dinoStyles = window.getComputedStyle(this.dino);
  var currentLeft = dinoStyles.getPropertyValue('left');
  var leftInt = parseInt(currentLeft.replace("px", "")) + 2;
  this.dino.style.left = String(leftInt) + "px";
};

Dino.prototype.slideLeft = function () {
  var dinoStyles = window.getComputedStyle(this.dino);
  var currentLeft = dinoStyles.getPropertyValue('left');
  var leftInt = parseInt(currentLeft.replace("px", "")) - 2;
  this.dino.style.left = String(leftInt) + "px";
};

module.exports = Dino;
