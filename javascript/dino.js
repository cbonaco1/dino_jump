var Dino = function(dinoElement) {
  this.htmlElement = dinoElement;
}

Dino.prototype.jump = function () {
  this.htmlElement.style.bottom = "50px";

  window.setTimeout(function() {
    this.htmlElement.style.bottom = "0px";
  }.bind(this), 500);
};

Dino.prototype.duck = function () {
  this.htmlElement.style.height = "50px";
};

Dino.prototype.rise = function () {
  this.htmlElement.style.height = "100px";
};

module.exports = Dino;
