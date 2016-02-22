var Obstacle = require('./obstacle');

var x = 0;

var Game = function(level) {
  this.score = 0;
  this.started = false;
  this.dino = document.getElementById("dino");
  this.obstacles = [];
  this.field = document.getElementById("game-field");
  this.settings = this.setIntervals(level);
}

//Sets gameplay settings
Game.prototype.setIntervals = function (difficulty) {
  var settings = {}

  switch (difficulty) {
    case "easy":
      settings["level"] = "easy";
      settings["interval"] = 3000;
      settings["speed"] = "left 2.5s";
      settings["jumpHeight"] = "100px";
      settings["minObstacleDimension"] = 30;
      settings["maxObstacleDimension"] = 50;
      settings["doubleScoreInterval"] = 62000;
      break;
    case "medium":
    settings["level"] = "medium";
      settings["interval"] = 1500;
      settings["speed"] = "left 1.5s";
      settings["jumpHeight"] = "150px";
      settings["minObstacleDimension"] = 50;
      settings["maxObstacleDimension"] = 100;
      settings["doubleScoreInterval"] = 32000;
      break;
    case "hard":
      settings["level"] = "hard";
      settings["interval"] = 1000;
      settings["speed"] = "left 1.0s";
      settings["jumpHeight"] = "200px";
      settings["minObstacleDimension"] = 100;
      settings["maxObstacleDimension"] = 140;
      settings["doubleScoreInterval"] = 17000;
      break;
  }
  return settings;
};

//Creates obstacle, adds it to Game queue,
//adds it to the DOM, and then slide it
Game.prototype.createObstacle = function () {

  var obstacle = new Obstacle(this);

  //add the obstacle to the Game's queue of obstacles
  this.addObstacle(obstacle.domElement);

  //append obstacle to game-field
  this.field.appendChild(obstacle.domElement);

  //10ms after obstacle is created, slide it
  window.setTimeout(function() {
    obstacle.slide();
  }.bind(this), 10);

};

//Creates obstacles at random intervals
Game.prototype.init = function () {
  var generateObstacles = function() {
    this.createObstacle();
    var rand = Math.floor((Math.random() * 1000) + this.settings.interval);
    this.obstacleInterval = window.setTimeout(generateObstacles, rand);
  }.bind(this);

  generateObstacles();
};

Game.prototype.start = function () {
  $(".obstacle").remove();
  this.dino.style.bottom = "22px";
  $("#welcome-message").hide();
  $("#scoreboard").hide();
  this.started = true;
  this.scoreInterval = window.setInterval(this.incrementScore.bind(this), 50);
  this.collisionInterval = window.setInterval(this.checkCollision.bind(this), 10);
  this.doubleScoreInterval = window.setInterval(this.doubleScore.bind(this), this.settings.doubleScoreInterval);
  this.slideBackgroundInterval = window.setInterval(this.slideBackground.bind(this), 10);

  this.init();
};

Game.prototype.stop = function () {
  //show user their score

  var finalScore = document.getElementById("final-score");
  finalScore.innerHTML = this.score;
  $("#scoreboard").show();

  //stop all obstacle animations
  //this.obstalces
  this.obstacles.forEach(function(obstalce){
    var styles = window.getComputedStyle(obstalce);
    var newLeft = styles.getPropertyValue('left');
    obstalce.style.left = newLeft;
  });

  var dinoStyles = window.getComputedStyle(this.dino);
  var currentBottom = dinoStyles.getPropertyValue('bottom');
  this.dino.style.bottom = currentBottom;

  //clear timers
  window.clearInterval(this.scoreInterval);
  window.clearInterval(this.collisionInterval);
  window.clearInterval(this.obstacleInterval);
  window.clearInterval(this.doubleScoreInterval);
  window.clearInterval(this.slideBackgroundInterval);


  this.started = false;
  this.score = 0;
  // this.obstacles = [];
};

//Adds obstacle to Game's queue of obstalces
Game.prototype.addObstacle = function (obstacle) {
  this.obstacles.push(obstacle);
};

Game.prototype.removeObstacle = function () {
  this.obstacles.shift();
};

Game.prototype.clearAllObstacles = function () {
  if (this.obstacles.length > 0) {
    this.obstacles.forEach(function(obstacle){
      this.removeObstacle();
      this.field.removeChild(obstacle);
    }.bind(this));
  }
};

Game.prototype.incrementScore = function () {
  this.score += 1;
  var scoreLabel = document.getElementById("score");
  scoreLabel.innerHTML = this.score;
};

Game.prototype.doubleScore = function () {
  this.score *= 2;
  var scoreLabel = document.getElementById("score");
  scoreLabel.innerHTML = this.score;

  //show the window notifying player their score has doubled
  var scoreWindow = document.getElementById("double-score-window");
  scoreWindow.style.opacity = 1;
  scoreWindow.style.top = "50px";
  scoreWindow.style.transform = "rotate(360deg)";

  //hide the window 3 seconds later
  window.setTimeout(function() {
    scoreWindow.style.opacity = 0;
    scoreWindow.style.top = "-50px";
    scoreWindow.style.transform = "rotate(-360deg)";
  }, 3000);

};

//keep sliding background to the left
//since the background is set to repeat-x, then this is okay
Game.prototype.slideBackground = function () {
  x -= 1;
  this.field.style.backgroundPosition = x + "px 0";
};

Game.prototype.checkCollision = function () {
  //if collision is true, stop game
  if (this.obstacles.length > 0) {
    var obstacle = this.obstacles[0];

    var dinoLeft = $(this.dino).offset().left;
    var dinoTop = $(this.dino).offset().top;
    var dinoHeight = $(this.dino).outerHeight(true);
    var dinoWidth = $(this.dino).outerWidth(true);
    var totalDinoHeight = dinoTop + dinoHeight + 22;
    var totalDinoWidth = dinoLeft + dinoWidth;

    var obsLeft = $(obstacle).offset().left;
    var obsTop = $(obstacle).offset().top;
    var obsHeight = $(obstacle).outerHeight(true);
    var obsWidth = $(obstacle).outerWidth(true);
    var totalObsHeight = obsHeight + obsTop;
    var totalObsWidth = obsLeft + obsWidth;

    if ( (totalDinoHeight < obsTop) ||
          (dinoTop > totalObsHeight) ||
          ((totalDinoWidth) < obsLeft) ||
          ((dinoLeft + 35) > totalObsWidth)) {

    }
    else {
      this.stop();
    }

  }
};

module.exports = Game;
