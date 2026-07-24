(function () {
  window.BlindMazeState = {
    username: "",
    currentStage: 1,
    lives: 3,
    timeLeft: 7,
    gamePhase: "memorize",
    gridSize: 7,
    playerPos: { r: 0, c: 0 },
    startPos: { r: 0, c: 0 },
    finishPos: { r: 0, c: 0 },
    walls: [],
    hintUsed: false,
    isGameActive: false,
  };
  window.BlindMazeGame = {
    startNewGame: function (username) {
      let state = window.BlindMazeState;
      state.username = username;
      state.currentStage = 1;
      state.lives = 3;
      state.hintUsed = false;
      state.isGameActive = true;
      window.BlindMazeUI.showScreen("gameScreen");
      this.loadStage();
    },
    loadStage: function () {
      let state = window.BlindMazeState;
      state.gamePhase = "memorize";
      state.hintUsed = false;
      window.BlindMazeGenerator.generateRandomMaze();
      window.BlindMazePlayer.resetPlayerToStart();
      window.BlindMazeUI.drawMazeGrid();
      window.BlindMazeUI.updateUIDisplay();
      this.startMemorizePhase();
    },
    startMemorizePhase: function () {
      let state = window.BlindMazeState;
      state.gamePhase = "memorize";
      window.BlindMazeUI.setGridWallsVisibility(true);
      window.BlindMazeTimer.startCountdown(
        7,
        function (tickTime) {
          state.timeLeft = tickTime;
          window.BlindMazeUI.updateUIDisplay();
        },
        function () {
          window.BlindMazeGame.startMovePhase();
        },
      );
    },
    startMovePhase: function () {
      let state = window.BlindMazeState;
      state.gamePhase = "move";
      window.BlindMazeUI.setGridWallsVisibility(false);
      window.BlindMazeUI.updateUIDisplay();
      window.BlindMazeTimer.startCountdown(
        20,
        function (tickTime) {
          state.timeLeft = tickTime;
          window.BlindMazeUI.updateUIDisplay();
        },
        function () {
          window.BlindMazeGame.handleStageFail("Time Out!");
        },
      );
    },
    handleStageSuccess: function () {
      window.BlindMazeTimer.stopCountdown();
      alert("Success, moving to the next stage.");

      let state = window.BlindMazeState;
      state.currentStage++;
      this.loadStage();
    },
    handleStageFail: function (reason) {
      window.BlindMazeTimer.stopCountdown();
      alert(reason);
      let state = window.BlindMazeState;
      state.lives--;
      if (state.lives <= 0) {
        this.endGame();
      } else {
        this.loadStage();
      }
    },
    useGameHint: function () {
      let state = window.BlindMazeState;
      if (!state.isGameActive || state.gamePhase !== "move" || state.hintUsed)
        return;
      state.hintUsed = true;
      window.BlindMazeUI.setGridWallsVisibility(true);
      window.BlindMazeUI.updateUIDisplay();

      setTimeout(function () {
        if (state.isGameActive && state.gamePhase === "move") {
          window.BlindMazeUI.setGridWallsVisibility(false);
        }
      }, 1000);
    },
    endGame: function () {
      let state = window.BlindMazeState;
      state.isGameActive = false;
      window.BlindMazeTimer.stopCountdown();
      document.getElementById("summaryPlayerName").textContent = state.username;
      document.getElementById("summaryStageCount").textContent =
        state.currentStage;
      window.BlindMazeUI.openModal("modalGameover");
    },
  };
})();
