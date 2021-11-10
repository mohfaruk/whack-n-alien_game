const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
var lastHole;
var score = 0;
var timeUp = false;

function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randHole() {
  var index = Math.floor(Math.random() * holes.length);
  var hole = holes[index];
  if (hole === lastHole) {
    console.log("Can't be like that");
    return randHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  var time = randTime(200, 1000);
  var hole = randHole(holes);
  hole.classList.add("up");
  setTimeout(function () {
    hole.classList.remove("up");
    if (!timeUp) peep(); //check to see if timeUp is false, then continues running function
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(function () {
    timeUp = true;
  }, 10000);
}

function bonkMole(event) {
  if (!event.isTrusted) return; //user did not click on mole (cheat)
  score++;
  this.classList.remove("up"); //not sure what this does
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonkMole));
