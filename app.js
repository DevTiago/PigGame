var scores, roundScore, activePlayer, dice, goalScore;
goalScore = 100;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  //1. get a random number
  dice = Math.floor(Math.random() * 6) + 1;

  //2. Display the result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  //3. Update the round score IF the rolled number was not 1
  if (dice !== 1) {
    //Add score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //Change player
    nextPlayer();
  }
});

// hold button
document.querySelector(".btn-hold").addEventListener("click", function() {
  //add the CURRENT score to the player GLOBAL score
  scores[activePlayer] += roundScore;

  //Update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  // Check if Player won the game
  if (scores[activePlayer] >= goalScore) {
    document.querySelector("#name-" + activePlayer).innerHTML =
      "<b>YOU WON!</b>";
    document;
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
  } else nextPlayer();
});

document.querySelector(".btn-rules").addEventListener("click", function() {
  document.querySelector(".modal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
  document.querySelector(".modal").style.display = "none";
});

window.onclick = function(event) {
  if (event.target == document.querySelector(".modal")) {
    document.querySelector(".modal").style.display = "none";
  }
};

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".btn-new").addEventListener("click", init);
