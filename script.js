// Declare DOM variables
const playBtn = document.querySelector("#play-btn");
const gameBoard = document.querySelector("#game-board");
const whoIsPlaying = document.querySelector("#turn-counter h3");
let boardClasses;

// Declare normal variables
let player = "Player One";

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
      divs.addEventListener("click", switchPlayers);
   }
   boardClasses = document.querySelectorAll(".square");
   console.log(boardClasses);
   whoIsPlaying.innerText = "It is Player One's turn";
}

function fillBox(event) {
   if (player === "Player One") {
      event.target.style.backgroundImage = "url(./Images/X-image.jpg)";
      event.target.style.backgroundSize = "cover";
      event.target.style.backgroundRepeat = "no-repeat";
      event.target.addEventListener("click", addClass, {once: false});
   } else if(player === "Player Two"){ 
      event.target.style.backgroundImage = "url(./Images/O-image.jpg)";
      event.target.style.backgroundSize = "cover";
      event.target.style.backgroundRepeat = "no-repeat";
      event.target.addEventListener("click", addClass), {once: false};
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

function switchPlayers(event) {
   if(player === "Player One"){
      player = "Player Two";
      // event.target.classList.add("X");
      // event.target.classList.remove("O");
      // console.log("I should be first");
   } else if(player === "Player Two") {
      player = "Player One";
      // event.target.classList.add("O");
      // event.target.classList.remove("X");
      // console.log("I should be second");
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