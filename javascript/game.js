var Obstacle = require('./obstacle');

var Game = function(level) {
  this.score = 0;
  this.started = false;
  this.dino = document.getElementById("dino");
  this.obstacles = [];
  this.field = document.getElementById("game-field");
  this.difficulty = this.setIntervals(level);
}

//Sets the interval at which obstacles are created
Game.prototype.setIntervals = function (difficulty) {
  //make object with speed and interval
  var settings = {}
  //easy - 2.5s
  //medium 1.5s
  //hard 1.0s
  switch (difficulty) {
    case "easy":
      settings["interval"] = 3000;
      settings["speed"] = "left 2.5s";
      break;
    case "medium":
      settings["interval"] = 2000;
      settings["speed"] = "left 1.5s";
      break;
    case "hard":
      settings["interval"] = 1000;
      settings["speed"] = "left 1.0s";
      break;
  }
  return settings;
};

//Creates obstacle, adds it to Game queue,
//and then slide it
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

  // debugger

};

Game.prototype.init = function () {
  var generateObstacles = function() {
    this.createObstacle();
    var rand = Math.floor((Math.random() * 1000) + this.difficulty.interval);
    this.obstacleInterval = window.setTimeout(generateObstacles, rand);
  }.bind(this);

  generateObstacles();
};

Game.prototype.start = function () {
  $("#welcome-message").hide();
  $("#scoreboard").hide();
  this.started = true;
  this.timeInterval = window.setInterval(this.incrementScore.bind(this), 50);
  this.collisionInterval = window.setInterval(this.checkCollision.bind(this), 10);
  this.init();


  //change interval at which the blocks are generated
  //random number between difficulty and medium?
  //give that to interval

  //also change speed?
  //object.style.transition = ...
  //http://www.w3schools.com/jsref/prop_style_transition.asp

};

Game.prototype.stop = function () {
  var finalScore = document.getElementById("final-score");
  finalScore.innerHTML = this.score;
  $("#scoreboard").show();
  window.clearInterval(this.timeInterval);
  window.clearInterval(this.collisionInterval);
  window.clearInterval(this.obstacleInterval);

  this.started = false;
  this.score = 0;
  this.obstacles = [];

  //stop all transitions?
  //iterate through obstalces and set their left property
};

//Adds obstacle to Game's queue of obstalces
Game.prototype.addObstacle = function (obstacle) {
  this.obstacles.push(obstacle);
  console.log("Length: " + this.obstacles.length);
};

Game.prototype.removeObstacle = function () {
  this.obstacles.shift();
};

Game.prototype.incrementScore = function () {
  this.score += 1;
  var scoreLabel = document.getElementById("score");
  scoreLabel.innerHTML = this.score;
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

    //if dino touches the obstacle from the top (squishes obstacle)
    var heightClearance = (totalDinoHeight >= totalObsHeight);

    //horizontal
    var touching = obsLeft == (dinoLeft + dinoWidth);

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
