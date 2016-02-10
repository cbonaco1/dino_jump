var Obstacle = require('./obstacle');

var Game = function() {
  this.score = 0;
  this.started = false;
  this.dino = document.getElementById("dino");
  this.obstacles = [];
  this.DIM_X = 1000;
  this.DIM_Y = 400;
  this.field = document.getElementById("game-field");
  //this.difficulty
}

Game.prototype.start = function () {
  $("#welcome-message").hide();
  $("#scoreboard").hide();
  this.started = true;
  this.timeInterval = window.setInterval(this.incrementScore.bind(this), 50);
  this.collisionInterval = window.setInterval(this.checkCollision.bind(this), 10);

  //make obstacles every 1 second
  //This time interval could change with difficulty level of game
  this.obstacleInterval = window.setInterval(function(){
    var obstacle = new Obstacle(this);

    //append obstacle to game-field
    this.field.appendChild(obstacle.domElement);

    //10ms after obstacle is created, slide it
    window.setTimeout(function() {
      obstacle.slide();
    }.bind(this), 10);

  }.bind(this), 3000);


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
};

Game.prototype.addObstacle = function (obstacle) {
  this.obstacles.push(obstacle);
  console.log("Length: " + this.obstacles.length);
};

Game.prototype.incrementScore = function () {
  this.score += 1;
  var scoreLabel = document.getElementById("score");
  scoreLabel.innerHTML = this.score;
};

Game.prototype.removeObstacle = function () {
  this.obstacles.shift();
};

Game.prototype.checkCollision = function () {
  //if collision is true, stop game
  if (this.obstacles.length > 0) {

    var obstacle = this.obstacles[0];

    var dinoLeft = $(this.dino).offset().left;
    var dinoTop = $(this.dino).offset().top;
    var dinoHeight = $(this.dino).outerHeight(true);
    var dinoWidth = $(this.dino).outerWidth(true);
    var totalDinoHeight = dinoTop + dinoHeight;
    var totalDinoWidth = dinoLeft + dinoWidth;
    // console.log(h + ", " + w);

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

    if ( heightClearance && touching){
      // this.stop();
    }

    if ( (totalDinoHeight < obsTop) ||
          (dinoTop > totalObsHeight) ||
          (totalDinoWidth < obsLeft) ||
          (dinoLeft > totalObsWidth)) {

    }
    else {
      this.stop();
    }




    //tests height
    // if (totalDinoHeight >= totalObsHeight) {
    //   // debugger
    // }
  }

  //check collision with first item in obstacle queue
};

module.exports = Game;
