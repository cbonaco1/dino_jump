var Obstacle = function(game) {
  this.obstacleHeight = Math.floor((Math.random() * 35) + 10);
  this.obstacleWidth = Math.floor((Math.random() * 35) + 10);
  this.game = game;
  this.domElement = this.generateElement();
}

Obstacle.prototype.generateElement = function () {
  var newObstacle = document.createElement("div");
  newObstacle.className = "obstacle";

  //set height and width
  newObstacle.style.height = this.obstacleHeight.toString() + "px";
  newObstacle.style.width = this.obstacleWidth.toString() + "px";

  //add the obstacle to the queue
  this.game.addObstacle(newObstacle);

  //when an obstacles inverse left property is equal to its width,
  //then it is out of bounds

  return newObstacle;
};

Obstacle.prototype.slide = function () {
  var mostLeft = (this.obstacleWidth * -1);
  console.log("Sliding: " + mostLeft);
  this.domElement.style.left = mostLeft.toString() + "px";
};

// Obstacle.prototype.inBounds = function (obstacle) {
//
// };

module.exports = Obstacle;
