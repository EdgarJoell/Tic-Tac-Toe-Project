// Declare DOM variables
const playBtn = document.querySelector("#play-btn");
const gameBoard = document.querySelector("#game-board");
const whoIsPlaying = document.querySelector("#turn-counter h3");

// Declare normal variables
let canClick = false;
let player = "";



// Functions
function makeBoard(event) {
   event.preventDefault();
   let divs = [];
   for (let i = 0; i < 9; i++) {
      canClick = true;
      divs = document.createElement("div");
      divs.classList.add("square");
      divs.style.cssText = "height: 9rem; width: 9rem; border: 2px solid #1d1e3d";
      gameBoard.appendChild(divs);
      divs.addEventListener("click", fillBox);
   }
   whoIsPlaying.innerText = "It is Player One's turn";
   player = "Player One";
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

function hideBtn(event) {
   event.target.style.visibility = "hidden";
}

function switchPlayers(event) {
   if(player === "Player One"){
      player = "Player Two";
   } else if(player === "Player Two") {
      player = "Player One";
   } else {
      console.log("Player switch is not working");
   }
   whoIsPlaying.innerText = `It is ${player}'s turn`;
}






// Events
playBtn.addEventListener("click", makeBoard);
playBtn.addEventListener("click", hideBtn);
gameBoard.addEventListener("click", switchPlayers);