// Declare DOM variables
const playBtn = document.querySelector("#play-btn");
const gameBoard = document.querySelector("#game-board");
const whoIsPlaying = document.querySelector("#turn-counter h3");
let boardClasses;

// Declare normal variables
let player = "";

// Functions
function makeBoard(event) {
   event.preventDefault();
   let divs = [];
   for (let i = 0; i < 9; i++) {
      divs = document.createElement("div");
      divs.setAttribute("id", i);
      divs.classList.add("square");
      divs.style.cssText = "height: 9rem; width: 9rem; border: 2px solid #1d1e3d";
      gameBoard.appendChild(divs);
      divs.addEventListener("click", fillBox, {once: true});
      divs.addEventListener("click", addClass, {once: true});
      divs.addEventListener("click", switchPlayers, {once: true});
   }
   boardClasses = document.querySelectorAll(".square");
   console.log(boardClasses);
   whoIsPlaying.innerText = "It is Player One's turn";
   player = "Player One";
   console.log(player);
}

function fillBox(event) {
   if (player === "Player One") {
      event.target.style.backgroundImage = "url(./Images/X-image.jpg)";
      event.target.style.backgroundSize = "cover";
      event.target.style.backgroundRepeat = "no-repeat";
   } else if(player === "Player Two"){ 
      event.target.style.backgroundImage = "url(./Images/O-image.jpg)";
      event.target.style.backgroundSize = "cover";
      event.target.style.backgroundRepeat = "no-repeat";
   } else {
      console.log("Can no longer click to change this");
   }
}

function addClass(event) {
   if(player === "Player One") {
      console.log("I should be first");
      event.target.classList.add("X");
      event.target.classList.remove("O");
   } else if(player === "Player Two") {
      console.log("I should be second");
      event.target.classList.add("O");
      event.target.classList.remove("X");
   }
}

function hideBtn(event) {
   event.target.style.visibility = "hidden";
}

function switchPlayers() {
   if(player === "Player One"){
      console.log("I am switching to Two");
      player = "Player Two";

   } else if(player === "Player Two") {
      console.log("I am switching to One");
      player = "Player One";

   } else {
      console.log("Player switch is not working");
   }
   whoIsPlaying.innerText = `It is ${player}'s turn`;
}

// Events
playBtn.addEventListener("click", makeBoard);
playBtn.addEventListener("click", hideBtn);

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];