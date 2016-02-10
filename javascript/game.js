var Game = function() {
  this.score = 0;
  this.started = false;
  this.dino = document.getElementById("dino");
  this.obstacles = [];
  this.DIM_X = 1000;
  this.DIM_Y = 400;
}

Game.prototype.start = function () {
  this.started = true;
  this.timeInterval = window.setInterval(this.incrementScore.bind(this), 500);
  this.collisionInterval = window.setInterval(this.checkCollision.bind(this), 250);
};

Game.prototype.incrementScore = function () {
  this.score += 1;
  var scoreLabel = document.getElementById("score");
  scoreLabel.innerHTML = this.score;
};

Game.prototype.stop = function () {
  window.clearInterval(this.timeInterval);
  window.clearInterval(this.collisionInterval);
  this.started = false;
  this.score = 0;
  this.obstacles = [];
};

Game.prototype.addObstacle = function (obstacle) {
  this.obstacles.push(obstacle);
};

Game.prototype.checkCollision = function () {
  //if collision is true, stop game
  var x1 = $("#dino").offset().left;
  var y1 = $("#dino").offset().top;
  // console.log(h + ", " + w);

  //check collision with first item in obstacle queue
};

module.exports = Game;
