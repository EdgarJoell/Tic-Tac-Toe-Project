// Declare DOM variables
const playBtn = document.querySelector("#play-btn");
const gameBoard = document.querySelector("#game-board");


let canClick = true;

function makeBoard(event) {
   event.preventDefault();
   let divs = [];
   for (let i = 0; i < 9; i++) {
      let canClick = true;
      divs = document.createElement("div");
      divs.classList.add("square");
      divs.style.cssText = "height: 9rem; width: 9rem; border: 2px solid #1d1e3d";
      gameBoard.appendChild(divs);
      divs.addEventListener("click", fillBox);
   }
}

function fillBox(event) {
   if (canClick === true) {
      event.target.style.backgroundImage = "url(./Images/X-image.jpg)";
      event.target.style.backgroundSize = "cover";
      event.target.style.backgroundRepeat = "no-repeat";
      event.target.canClick = false;
   } else { 
      console.log("Do nothing from here m8");
   }
}

function hideBtn(event) {
   event.target.style.visibility = "hidden";
}

playBtn.addEventListener("click", makeBoard);
playBtn.addEventListener("click", hideBtn);