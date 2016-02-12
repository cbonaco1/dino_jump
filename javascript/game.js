var Obstacle = require('./obstacle');

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
      break;
    case "medium":
    settings["level"] = "medium";
      settings["interval"] = 1500;
      settings["speed"] = "left 1.5s";
      settings["jumpHeight"] = "150px";
      settings["minObstacleDimension"] = 50;
      settings["maxObstacleDimension"] = 100;
      break;
    case "hard":
      settings["level"] = "hard";
      settings["interval"] = 1000;
      settings["speed"] = "left 1.0s";
      settings["jumpHeight"] = "200px";
      settings["minObstacleDimension"] = 100;
      settings["maxObstacleDimension"] = 140;
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

};

Game.prototype.init = function () {
  var generateObstacles = function() {
    this.createObstacle();
    var rand = Math.floor((Math.random() * 1000) + this.settings.interval);
    console.log("Interval: " + rand);
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
