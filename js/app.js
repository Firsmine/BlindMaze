document.addEventListener("DOMContentLoaded", function () {
  let usernameInput = document.getElementById("usernameInput");
  let btnPlay = document.getElementById("btnPlay");
  // USERNAME VALIDATION
  if (usernameInput && btnPlay) {
    usernameInput.addEventListener("input", function () {
      let nameValue = usernameInput.value.trim();
      if (nameValue.length > 0) {
        btnPlay.removeAttribute("disabled");
      } else {
        btnPlay.setAttribute("disabled", "true");
      }
    });
  }
  //PLAY BUTTON
  if (btnPlay) {
    btnPlay.addEventListener("click", function () {
      let nameValue = usernameInput.value.trim();
      if (nameValue.length > 0) {
        window.BlindMazeGame.startNewGame(nameValue);
      }
    });
  }
  // INSTRUCTION
  let btnOpenInst = document.getElementById("btnOpenInstructions");
  let btnCloseInst = document.getElementById("btnCloseInstructions");
  let btnConfirmInst = document.getElementById("btnConfirmInstructions");
  if (btnOpenInst) {
    btnOpenInst.addEventListener("click", function () {
      window.BlindMazeUI.openModal("modalInstructions");
    });
  }
  if (btnCloseInst) {
    btnCloseInst.addEventListener("click", function () {
      window.BlindMazeUI.closeModal("modalInstructions");
    });
  }
  if (btnConfirmInst) {
    btnConfirmInst.addEventListener("click", function () {
      window.BlindMazeUI.closeModal("modalInstructions");
      if (usernameInput) {
        let nameValue = usernameInput.value.trim();
        if (nameValue.length > 0) {
          window.BlindMazeGame.startNewGame(nameValue);
        } else {
          usernameInput.focus();
        }
      }
    });
  }
  // LEADERBOARD
  let btnOpenLeader = document.getElementById("btnOpenLeaderboard");
  let btnCloseLeader = document.getElementById("btnCloseLeaderboard");
  if (btnOpenLeader) {
    btnOpenLeader.addEventListener("click", function () {
      window.BlindMazeLeaderboard.renderLeaderboardTable();
      window.BlindMazeUI.openModal("modalLeaderboard");
    });
  }
  if (btnCloseLeader) {
    btnCloseLeader.addEventListener("click", function () {
      window.BlindMazeUI.closeModal("modalLeaderboard");
    });
  }
  // HINT BUTTON
  let btnHint = document.getElementById("btnGameHint");
  if (btnHint) {
    btnHint.addEventListener("click", function () {
      window.BlindMazeGame.useGameHint();
    });
  }
  // GAME OVER
  let btnSaveScore = document.getElementById("btnSaveScore");
  let btnCancelGameOver = document.getElementById("btnCancelGameover");
  if (btnSaveScore) {
    btnSaveScore.addEventListener("click", function () {
      let state = window.BlindMazeState;
      window.BlindMazeLeaderboard.saveScore(state.username, state.currentStage);
      window.BlindMazeUI.closeModal("modalGameover");
      window.BlindMazeUI.showScreen("welcomeScreen");
    });
  }
  if (btnCancelGameOver) {
    btnCancelGameOver.addEventListener("click", function () {
      window.BlindMazeUI.closeModal("modalGameover");
      window.BlindMazeUI.showScreen("welcomeScreen");
    });
  }
  // ARROW CONTROLLER
  window.addEventListener("keydown", function (event) {
    let state = window.BlindMazeState;
    if (!state.isGameActive || state.gamePhase !== "move") return;
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        window.BlindMazePlayer.movePlayer(-1, 0);
        break;
      case "ArrowDown":
        event.preventDefault();
        window.BlindMazePlayer.movePlayer(1, 0);
        break;
      case "ArrowLeft":
        event.preventDefault();
        window.BlindMazePlayer.movePlayer(0, -1);
        break;
      case "ArrowRight":
        event.preventDefault();
        window.BlindMazePlayer.movePlayer(0, 1);
        break;
    }
  });
});
