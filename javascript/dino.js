var Dino = function(dinoElement) {
  this.htmlElement = dinoElement;
  this.addListeners();
}

Dino.prototype.addListeners = function () {
  // this.htmlElement.addEventListener("transitionend", function() {
  //   console.log("---transitionend---");
  //   this.htmlElement.style.bottom = "0px";
  // }.bind(this));
};

Dino.prototype.jump = function () {
  // console.log("jumping");
  this.htmlElement.style.bottom = "100px";

  window.setTimeout(function() {
    this.htmlElement.style.bottom = "22px";
  }.bind(this), 500);
};

//Try rotating the dino forward intead of ducking
Dino.prototype.duck = function () {
  // this.htmlElement.style.height = "50px";
  $(this.htmlElement).addClass("duck");
};

Dino.prototype.rise = function () {
  // this.htmlElement.style.height = "100px";
  $(this.htmlElement).removeClass("duck");
};

module.exports = Dino;
