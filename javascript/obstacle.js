var Obstacle = function(game) {
  this.game = game;

  var max = this.game.settings.maxObstacleDimension;
  var min = this.game.settings.minObstacleDimension;
  var diff = max - min;

  this.obstacleHeight = Math.floor((Math.random() * diff) + min);
  this.obstacleWidth = Math.floor((Math.random() * diff) + min);

  this.domElement = this.generateElement();
}

Obstacle.prototype.generateElement = function () {
  var gameField = document.getElementById("game-field");
  var newObstacle = document.createElement("div");
  newObstacle.className = "obstacle";

  //When its transition is complete, remove it from the DOM
  //also remove it from the queue of obstacles
  newObstacle.addEventListener("transitionend", function(){
    if (this.game.started) {
      gameField.removeChild(newObstacle);
      this.game.removeObstacle(newObstacle);
    }
  }.bind(this));

  //set height and width
  newObstacle.style.height = this.obstacleHeight.toString() + "px";
  newObstacle.style.width = this.obstacleWidth.toString() + "px";

  //this.difficulty.speed is the speed of the transitions
  newObstacle.style.transition = this.game.settings.speed;
  newObstacle.style.transitionTimingFunction = "linear";

  //webkit
  newObstacle.style.setProperty("-webkit-transition", this.game.settings.speed);
  newObstacle.style.setProperty("-webkit-transition-timing-function", "linear");

  return newObstacle;
};

Obstacle.prototype.slide = function () {
  this.domElement.style.left = "0px";
  this.domElement.style.opacity = 1.0;
};

module.exports = Obstacle;
