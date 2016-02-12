var Obstacle = function(game) {
  this.obstacleHeight = Math.floor((Math.random() * 35) + 10);
  this.obstacleWidth = Math.floor((Math.random() * 35) + 10);
  // this.obstacleWidth = 10;
  // this.obstacleHeight = 50;
  this.game = game;
  this.domElement = this.generateElement();
}

Obstacle.prototype.generateElement = function () {
  var gameField = document.getElementById("game-field");
  var newObstacle = document.createElement("div");
  newObstacle.className = "obstacle";

  //When its transition is complete, remove it from the DOM
  //also remove it from the queue of obstacles
  newObstacle.addEventListener("transitionend", function(){
    gameField.removeChild(newObstacle);
    this.game.removeObstacle(newObstacle);
  }.bind(this));

  //set height and width
  newObstacle.style.height = this.obstacleHeight.toString() + "px";
  newObstacle.style.width = this.obstacleWidth.toString() + "px";

  //this.difficulty.speed is the speed of the transitions
  newObstacle.style.transition = this.game.difficulty.speed;
  newObstacle.style.transitionTimingFunction = "linear";

  //webkit
  newObstacle.style.setProperty("-webkit-transition", this.game.difficulty.speed);
  newObstacle.style.setProperty("-webkit-transition-timing-function", "linear");

  return newObstacle;
};

Obstacle.prototype.slide = function () {
  this.domElement.style.left = "0px";
};

module.exports = Obstacle;
