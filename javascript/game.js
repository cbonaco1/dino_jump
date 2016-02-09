var Game = function() {
  this.score = 0;
  this.started = false;
}

Game.prototype.hello = function () {
  console.log("Hello from game");
};

Game.prototype.start = function () {
  console.log("Game has started, score is: " + this.score);
  this.started = true;
  this.timeInterval = window.setInterval(this.incrementScore.bind(this), 500);
};

Game.prototype.incrementScore = function () {
  this.score += 1;
  // console.log("Score is now: " + this.score);
  var scoreLabel = document.getElementById("score");
  scoreLabel.innerHTML = this.score;
};

Game.prototype.stop = function () {
  window.clearInterval(this.timeInterval);
  this.started = false;
  this.score = 0;
};

module.exports = Game;
