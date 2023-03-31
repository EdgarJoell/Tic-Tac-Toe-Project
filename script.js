// Declare DOM variables ----------------------------------
const playBtn = document.querySelector("#play-btn");
const gameBoard = document.querySelector("#game-board");
const whoIsPlaying = document.querySelector("#turn-counter h3");
let playerOneScore = document.querySelector("#player-one span");
let playerTwoScore = document.querySelector("#player-two span");
let gameLog = document.querySelector(".log");
// let boardClasses;
let winner = "";

// Player Objects -----------------------------------------
let playerOne = {
   name: "Player One",
   spotsFilled: []
};

let playerTwo = {
   name: "Player Two",
   spotsFilled: []
};

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

// Declare normal variables -------------------------------
let currentPlayer = playerOne.name;

let squares = [];

// Functions ----------------------------------------------

// Make Game Board
function makeBoard(event) {
   event.preventDefault();
   for (let i = 0; i < 9; i++) {
      let divs = document.createElement("div");
      divs.setAttribute("id", i);
      divs.classList.add("square");
      divs.style.cssText = "height: 9rem; width: 9rem; border: 2px solid #1d1e3d";
      gameBoard.appendChild(divs);
      divs.addEventListener("click", fillBox, {once: true});
      divs.addEventListener("click", switchPlayers, {once: true});
      squares.push(divs);
   }
   whoIsPlaying.innerText = `It is ${currentPlayer} turn`;
}

// Check for the winner
function checkWin() {
   if(playerOne.spotsFilled.length > 2) {
      for(arr in winningCombos) {
         if(playerOne.spotsFilled.includes(winningCombos[arr][0]) && playerOne.spotsFilled.includes(winningCombos[arr][1])  && playerOne.spotsFilled.includes(winningCombos[arr][2])) {
            console.log("Winner P1");
            winner = playerOne.name;
            removeEvent();
         } else if(playerTwo.spotsFilled.includes(winningCombos[arr][0]) && playerTwo.spotsFilled.includes(winningCombos[arr][1])  && playerTwo.spotsFilled.includes(winningCombos[arr][2])) {
            console.log("Winner P2");
            winner = playerTwo.name;
            removeEvent();
         }
      }
   }
   whoIsPlaying.innertext = winner;
}

function removeEvent() {
   for(let i = 0; i < squares.length; i++) {
      squares[i].removeEventListener("click", fillBox);
      squares[i].removeEventListener("click", switchPlayers);
   }
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
      playerOne.spotsFilled.push(parseInt(event.target.id));
   } else if(currentPlayer === playerTwo.name){ 
      event.target.style.backgroundImage = "url(./Images/O-image.jpg)";
      event.target.style.backgroundSize = "cover";
      event.target.style.backgroundRepeat = "no-repeat";
      playerTwo.spotsFilled.push(parseInt(event.target.id));
   } else {
      console.log("Can no longer click to change this");
   }
   checkWin();
}

// Assign grid spots to their respective class when clicked


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

// Events -------------------------------------------------
playBtn.addEventListener("click", makeBoard);
playBtn.addEventListener("click", hideBtn);

// gameBoard.addEventListener("click", function(event) {
//    console.log(playerOne.spotsFilled.length);
//    console.log(playerOne.spotsFilled);
//    console.log(playerTwo.spotsFilled.length);
//    console.log(playerTwo.spotsFilled);
// });


// gameBoard.addEventListener("click", checkWin);

