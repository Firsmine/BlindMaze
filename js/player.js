(function () {
  window.BlindMazePlayer = {
    movePlayer: function (dirR, dirC) {
      let state = window.BlindMazeState;
      if (!state.isGameActive || state.gamePhase !== "move") return;

      let targetRow = state.playerPos.r + dirR;
      let targetCol = state.playerPos.c + dirC;

      if (
        targetRow < 0 ||
        targetRow >= state.gridSize ||
        targetCol < 0 ||
        targetCol >= state.gridSize
      ) {
        return;
      }

      state.playerPos.r = targetRow;
      state.playerPos.c = targetCol;

      window.BlindMazeUI.updatePlayerVisualPosition();
      this.checkCollision();
    },
    resetPlayerToStart: function () {
      let state = window.BlindMazeState;
      state.playerPos.r = state.startPos.r;
      state.playerPos.c = state.startPos.c;
    },
    checkCollision: function () {
      let state = window.BlindMazeState;
      let r = state.playerPos.r;
      let c = state.playerPos.c;

      if (state.walls[r][c] === true) {
        window.BlindMazeGame.handleStageFail("You hit a wall!");
        return;
      }

      if (r === state.finishPos.r && c === state.finishPos.c) {
        window.BlindMazeGame.handleStageSuccess();
      }
    },
  };
})();
