// Declare DOM variables ----------------------------------
const playBtn = document.querySelector("#play-btn");
const gameBoard = document.querySelector("#game-board");
const whoIsPlaying = document.querySelector("#turn-counter h3");
let boardClasses;

// Player Objects -----------------------------------------
let playerOne = {
   name: "Player One",
   spotsFilled: []
};

let playerTwo = {
   name: "Player Two",
   spotsFilled: []
};

// Declare normal variables -------------------------------
let currentPlayer = playerOne.name;
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

// Check player objects grid locations and see if they determine a winner
if(playerOne.spotsFilled.length >= 3) {
   playerOne.spotsFilled.sort();
   console.log(playerOne.spotsFilled);
} else if(playerTwo.spotsFilled.length >= 3) {
   playerTwo.spotsFilled.sort();
   console.log(playerOne.spotsFilled);
}

// Functions ----------------------------------------------

// Make Game Board
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
   whoIsPlaying.innerText = `It is ${currentPlayer} turn`;
}

// Hide play button at beginning
function hideBtn(event) {
   event.target.style.visibility = "hidden";
}

// Fill Grid Spots
function fillBox(event) {
   if (currentPlayer === playerOne.name) {
      event.target.style.backgroundImage = "url(./Images/X-image.jpg)";
      event.target.style.backgroundSize = "cover";
      event.target.style.backgroundRepeat = "no-repeat";
      playerOne.spotsFilled.push(event.target.id);
   } else if(currentPlayer === playerTwo.name){ 
      event.target.style.backgroundImage = "url(./Images/O-image.jpg)";
      event.target.style.backgroundSize = "cover";
      event.target.style.backgroundRepeat = "no-repeat";
      playerTwo.spotsFilled.push(event.target.id);
   } else {
      console.log("Can no longer click to change this");
   }
}

// Assign grid spots to their respective class when clicked
function addClass(event) {
   if(currentPlayer === playerOne.name) {
      event.target.classList.add("X");
      event.target.classList.remove("O");
   } else if(currentPlayer === playerTwo.name) {
      event.target.classList.add("O");
      event.target.classList.remove("X");
   }
}

// Switch players when currentPlayer clicks on an empty grid location
function switchPlayers() {
   if(currentPlayer === playerOne.name){
      currentPlayer = playerTwo.name;
   } else if(currentPlayer === playerTwo.name) {
      currentPlayer = playerOne.name;
   } else {
      console.log("Player switch is not working");
   }
   whoIsPlaying.innerText = `It is ${currentPlayer}'s turn`;
}

function checkForId() {
   console.log(playerOne.spotsFilled);
   console.log(playerTwo.spotsFilled);
}

// Events -------------------------------------------------
playBtn.addEventListener("click", makeBoard);
playBtn.addEventListener("click", hideBtn);

gameBoard.addEventListener("click", checkForId);