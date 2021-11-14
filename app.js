//Storing DOM elements to variables
const displayRocks = document.querySelectorAll(".rock");
const scoreBoard = document.querySelector(".score");
const aliens = document.querySelectorAll(".alien");
const allBtns = document.getElementsByClassName("start-btn");

let lastRock; //Undeclared variables that will record last rock number
let score = 0; //Keeps count of player score
let timeUp = false; //Tracks if game should continue

//Provides random number for aliens to appear
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min); //Random number
}

//Randomly selects which rocks the aliens should appear behind from
function randomRock(displayRocks) {
  let index = Math.floor(Math.random() * displayRocks.length); //Random number based on rock amount
  let rock = displayRocks[index]; //Stores random number to rock element index
  if (rock === lastRock) {
    //If random number selects same number as previously it will run function again
    return randomRock(displayRocks);
  }
  lastRock = rock; //Stores previously selected rock
  return rock;
}

function peep(minTime, maxTime) {
  let time = randomTime(minTime, maxTime); //randomTime provided min or 0.2s and max of 1s
  let rock = randomRock(displayRocks); //Declared randomRock function inside variable
  rock.classList.add("up"); //Triggers CSS so aliens appear
  setTimeout(function () {
    rock.classList.remove("up"); //Removes CSS after a set amount of time
    if (!timeUp) peep(minTime, maxTime); //Checks to see if timeUp is false to end game, otherwise continues running function
  }, time);
}

//Begins game with default variable values
function startGame(id) {
  let minTime; //Initialises variable for minimum time aliens should pop up
  let maxTime; //Initialises variable for maximum time aliens should pop up
  scoreBoard.innerHTML = 0; //Score displayed on HTML
  timeUp = false; //Boolean always set to default until game ends
  score = 0; //Score always set to default when new game is selected

  //Amends minTime & maxTime variable depending on which diffuculty selected
  if (id === "rookie") {
    minTime = 400;
    maxTime = 1000;
  } else if (id === "pro") {
    minTime = 300;
    maxTime = 800;
  } else if (id === "expert") {
    minTime = 200;
    maxTime = 600;
  }

  hideButtons();

  //if timeUp true then run the peep function with minTime & maxTime args
  peep(minTime, maxTime);

  setTimeout(function () {
    //Runs game for 15 secs
    timeUp = true;
    alert("You're score is " + score); //Displays final score
    addButtons();
  }, 15000);
}

//Hides buttons when game starts so multiple onClicks aren't selected
function hideButtons() {
  for (let i = 2; i >= 0; i--) {
    allBtns[i].classList.add("hidden");
  }
}

//Readds buttons
function addButtons() {
  for (let i = 2; i >= 0; i--) {
    allBtns[i].classList.remove("hidden");
  }
}

function clickAlien(event) {
  if (!event.isTrusted) return; //Player did not click on alien
  score++; //Increments score value
  this.classList.remove("up"); //not sure what this does
  scoreBoard.innerHTML = score;
}

//Runs clickAlien function when an alien is clicked
aliens.forEach(alien => alien.addEventListener("click", clickAlien));
