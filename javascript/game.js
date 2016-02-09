var Game = function() {
  this.score = 0;
}

Game.prototype.hello = function () {
  console.log("Hello from game");
};

Game.prototype.start = function () {
  console.log("Game has started, score is: " + this.score);
  this.timeInterval = window.setInterval(this.incrementScore.bind(this), 2000);
};

Game.prototype.incrementScore = function () {
  this.score += 1;
  console.log("Score is now: " + this.score);
};

Game.prototype.stop = function () {
  window.clearInterval(this.timeInterval);
  this.score = 0;
};

module.exports = Game;
