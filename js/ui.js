(function () {
  window.BlindMazeUI = {
    showScreen: function (screenId) {
      let screens = document.querySelectorAll(".screen-view");
      for (let i = 0; i < screens.length; i++) {
        screens[i].classList.add("hidden");
      }
      document.getElementById(screenId).classList.remove("hidden");
    },
    openModal: function (modalId) {
      document.getElementById(modalId).classList.remove("hidden");
    },
    closeModal: function (modalId) {
      document.getElementById(modalId).classList.add("hidden");
    },
    setGridWallsVisibility: function (isVisible) {
      let gridContainer = document.getElementById("mazeGridWrapper");
      if (!gridContainer) return;
      if (isVisible) {
        gridContainer.classList.add("visible-walls");
      } else {
        gridContainer.classList.remove("visible-walls");
      }
    },
    drawMazeGrid: function () {
      let state = window.BlindMazeState;
      let container = document.getElementById("mazeGridWrapper");
      if (!container) return;
      container.innerHTML = "";

      for (let r = 0; r < state.gridSize; r++) {
        for (let c = 0; c < state.gridSize; c++) {
          let cell = document.createElement("div");
          cell.className = "grid-cell";
          cell.setAttribute("data-row", r);
          cell.setAttribute("data-col", c);
          if (r === state.startPos.r && c === state.startPos.c) {
            cell.classList.add("cell-start");
          } else if (r === state.finishPos.r && c === state.finishPos.c) {
            cell.classList.add("cell-finish");
          } else if (state.walls[r][c] === true) {
            cell.classList.add("cell-wall");
          }
          container.appendChild(cell);
        }
      }
      let playerEl = document.createElement("div");
      playerEl.id = "player-node";
      playerEl.className = "player-entity";
      container.appendChild(playerEl);
      this.updatePlayerVisualPosition();
    },
    updatePlayerVisualPosition: function () {
      let state = window.BlindMazeState;
      let playerEl = document.getElementById("playerNode");
      if (!playerEl) return;
      let targetCell = document.querySelector(
        '.grid-cell[data-row="' +
          state.playerPos.r +
          '"][data-col="' +
          state.playerPos.c +
          '"]',
      );
      if (targetCell) {
        targetCell.appendChild(playerEl);
      }
    },
    updateUIDisplay: function () {
      let state = window.BlindMazeState;
      document.getElementById("labelStageDisplay").textContent =
        "Round " + state.currentStage;
      document.getElementById("timerCountdownDisplay").textContent =
        state.timeLeft + "s";
      let titleEl = document.getElementById("timerStatusTitle");
      if (state.gamePhase === "memorize") {
        titleEl.textContent = "Memorizing Time:";
        titleEl.style.color = "#aaaaaa";
      } else {
        titleEl.textContent = "Move Time:";
        titleEl.style.color = "#ff3333";
      }
      let heartContainer = document.getElementById("hpHeartsContainer");
      if (heartContainer) {
        heartContainer.innerHTML = "";
        for (let i = 0; i < 3; i++) {
          let heart = document.createElement("div");
          heart.className = "heart-icon" + (i >= state.lives ? " lost" : "");
          heartContainer.appendChild(heart);
        }
      }
      let hintBtn = document.getElementById("btnGameHint");
      if (hintBtn) {
        if (state.gamePhase === "move" && !state.hintUsed) {
          hintBtn.classList.remove("hidden");
        } else {
          hintBtn.classList.add("hidden");
        }
      }
    },
  };
})();
