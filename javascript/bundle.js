/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var Dino = __webpack_require__(3);
	var Obstacle = __webpack_require__(2);
	
	$(document).ready(function() {
	  var dino = new Dino(document.getElementById("dino"));
	  var makeJump = true;
	
	  var startButtons = document.getElementsByClassName("level-button");
	  for (var i = 0; i < startButtons.length; i++) {
	    startButtons[i].addEventListener("click", function(e){
	
	      var game = new Game(e.target.value);
	
	      if (!game.started) {
	        game.start();
	        dino.setJumpHeight(game.settings.jumpHeight);
	      }
	
	    });
	  }
	
	  document.addEventListener("keydown", function(e){
	    if (e.keyCode === 40) {
	      e.preventDefault();
	      dino.duck();
	    }
	
	    //32 == space bar
	    if ((e.keyCode === 32) || (e.keyCode == 38)) {
	      e.preventDefault();
	
	      //prevents the dino from being held up if the user
	      //holds down spacebar
	      if (makeJump) {
	        dino.jump();
	      }
	      makeJump = false;
	    }
	  });
	
	  document.addEventListener("keyup", function(e){
	    makeJump = true;
	
	    //40 == down key
	    if (e.keyCode === 40) {
	      e.preventDefault();
	      dino.rise();
	    }
	
	  });
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Obstacle = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Dino = function(dinoElement) {
	  this.dino = dinoElement;
	}
	
	Dino.prototype.setJumpHeight = function (height) {
	  this.jumpHeight = height;
	};
	
	Dino.prototype.jump = function () {
	  if (this.jumpHeight) {
	    this.dino.style.bottom = this.jumpHeight;
	  }
	  else {
	    //makes the dino jump before the game is set
	    //allow user to test out jumping before game starts
	    this.dino.style.bottom = "200px";
	  }
	
	  window.setTimeout(function() {
	    this.dino.style.bottom = "22px";
	  }.bind(this), 500);
	};
	
	//Try rotating the dino forward intead of ducking
	Dino.prototype.duck = function () {
	  // this.dino.style.height = "50px";
	  $(this.dino).addClass("duck");
	};
	
	Dino.prototype.rise = function () {
	  // this.dino.style.height = "100px";
	  $(this.dino).removeClass("duck");
	};
	
	module.exports = Dino;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map