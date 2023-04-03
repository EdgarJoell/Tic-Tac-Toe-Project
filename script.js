// Declare DOM variables ----------------------------------
const playBtn = document.querySelector("#play-btn");
const resetBtn = document.querySelector("#reset-btn");
const gameBoard = document.querySelector("#game-board");
const whoIsPlaying = document.querySelector("#turn-counter h3");
let playerOneScore = document.querySelector("#player-one span");
let playerTwoScore = document.querySelector("#player-two span");
let gameLog = document.querySelector(".log");

// Player Objects -----------------------------------------
let playerOne = {
   name: "Player One",
   spotsFilled: [],
   score:  0
};

let playerTwo = {
   name: "Player Two",
   spotsFilled: [], 
   score:  0
};

// Declare normal variables -------------------------------
let currentPlayer = playerOne.name;
let squares = [];
let winner = "";
let turnCounter = 0;
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

// Functions ----------------------------------------------

// Make Game Board
function makeBoard() {
   for (let i = 0; i < 9; i++) {
      let divs = document.createElement("div");
      divs.setAttribute("id", i);
      divs.classList.add("square");
      divs.style.cssText = "height: 9rem; width: 9rem";
      if(i == 1){
         divs.classList.add("one");
      }  
      if(i == 3 ) {
         divs.classList.add("three");
      }  
      if(i == 4) {
         divs.classList.add("four");
      } 
      if(i == 5) {
         divs.classList.add("five");
      }  
      if(i == 7) {
         divs.classList.add("seven");
      }
      gameBoard.appendChild(divs);
      divs.addEventListener("click", fillBox, {once: true});
      divs.addEventListener("click", switchPlayers, {once: true});
      squares.push(divs);
   }
   whoIsPlaying.innerText = `It is ${currentPlayer}'s turn`;
   playerOneScore.innerText = playerOne.score;
   playerTwoScore.innerText = playerTwo.score;
}

// Check for the winner, 
function checkWin() {
   if(playerOne.spotsFilled.length > 2) {
      for(arr in winningCombos) {
         if(playerOne.spotsFilled.includes(winningCombos[arr][0]) && playerOne.spotsFilled.includes(winningCombos[arr][1]) && playerOne.spotsFilled.includes(winningCombos[arr][2])) {
            playerOne.score++;
            playerOneScore.innerText = playerOne.score;
            whoIsPlaying.innerText = `The winner is ${playerOne.name}!`;
            winner = playerOne.name;
            moveToLog();
            removeEvent();
            resetBtn.style.visibility = "visible";
         } else if(playerTwo.spotsFilled.includes(winningCombos[arr][0]) && playerTwo.spotsFilled.includes(winningCombos[arr][1]) && playerTwo.spotsFilled.includes(winningCombos[arr][2])) {
            playerTwo.score++;
            playerTwoScore.innerText = playerTwo.score;
            whoIsPlaying.innerText = `The winner is ${playerTwo.name}!`;
            winner = playerTwo.name;
            moveToLog();
            removeEvent();
            resetBtn.style.visibility = "visible";
         }
      }
   }
}

// End the game and click events
function removeEvent() {
   for(let i = 0; i < squares.length; i++) {
      squares[i].removeEventListener("click", fillBox);
      squares[i].removeEventListener("click", switchPlayers);
   }
   winner = "";
}

// Reset the game for the next round
function resetBoard() {
   let board = document.querySelectorAll(".square");
   for(let i = 0; i < 9; i++) {
      gameBoard.removeChild(board[i]);
   }
   playerOne.spotsFilled = [];
   playerTwo.spotsFilled = [];
   squares = [];
   currentPlayer = playerOne.name;
   resetBtn.style.visibility = "hidden";
   turnCounter = 0;
   makeBoard();
}

// Hide play button at beginning
function hideBtn(event) {
   event.target.style.visibility = "hidden";
}

// Fill Grid Spots
function fillBox(event) {
   if (currentPlayer === playerOne.name) {
      event.target.classList.add("player-one");
      event.target.innerText = "X";
      playerOne.spotsFilled.push(parseInt(event.target.id));
   } else if(currentPlayer === playerTwo.name){ 
      event.target.classList.add("player-two");
      event.target.innerText = "O";
      playerTwo.spotsFilled.push(parseInt(event.target.id));
   } else {
      console.log("Can no longer click to change this");
   }
   checkWin();
}

// Switch players when currentPlayer clicks on an empty grid location
function switchPlayers() {
   if(currentPlayer === playerOne.name){
      currentPlayer = playerTwo.name;
      turnCounter++;
   } else if(currentPlayer === playerTwo.name) {
      currentPlayer = playerOne.name;
      turnCounter++;
   } else {
      console.log("Player switch is not working");
   }
   whoIsPlaying.innerText = `It is ${currentPlayer}'s turn`;
   if(turnCounter === 9) {
      removeEvent();
      whoIsPlaying.innerText = "It's a DRAW!";
      moveToLog();
      turnCounter = 0;
      resetBtn.style.visibility = "visible";
   }
}

// Move the winner to the past games history log
function moveToLog() {
   let newLi = document.createElement("li");
   let logs = [];
   let newLog;
   if(winner === playerOne.name || winner === playerTwo.name) {
      newLog = `The winner was ${currentPlayer}`;
      logs.unshift(newLog);
   } else if(turnCounter === 9) {
      newLog = "It was a draw";
      logs.unshift(newLog);
   }

   for(let i = 0; i < logs.length; i++) {
      newLi.innerText = logs[i]
      gameLog.prepend(newLi)
   }
   if(logs.length >= 3) {
      logs.pop()
   }
}

// Events -------------------------------------------------
playBtn.addEventListener("click", makeBoard, {once: true});
resetBtn.addEventListener("click", resetBoard);
playBtn.addEventListener("click", hideBtn);