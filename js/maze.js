(function () {
  window.BlindMazeGenerator = {
    generateRandomMaze: function () {
      let state = window.BlindMazeState;

      state.walls = [];
      for (let r = 0; r < state.gridSize; r++) {
        let rowArray = [];
        for (let c = 0; c < state.gridSize; c++) {
          rowArray.push(false);
        }
        state.walls.push(rowArray);
      }
      let startRow = Math.floor(Math.random() * state.gridSize);
      let finishRow = Math.floor(Math.random() * state.gridSize);

      state.startPos = { r: startRow, c: 0 };
      state.finishPos = { r: finishRow, c: 6 };
      let safePath = this.generateSafePath(state.startPos, state.finishPos);

      for (let r = 0; r < state.gridSize; r++) {
        for (let c = 0; c < state.gridSize; c++) {
          if (
            (r === state.startPos.r && c === state.startPos.c) ||
            (r === state.finishPos.r && c === state.finishPos.c)
          ) {
            continue;
          }
          let isSafe = false;
          for (let p = 0; p < safePath.length; p++) {
            if (safePath[p].r === r && safePath[p].c === c) {
              isSafe = true;
              break;
            }
          }
          if (!isSafe) {
            if (Math.random() < 0.35) {
              state.walls[r][c] = true;
            }
          }
        }
      }
    },
    generateSafePath: function (start, finish) {
      let path = [];
      let current = { r: start.r, c: start.c };
      path.push({ r: current.r, c: current.c });

      while (current.c < finish.c) {
        let moveDecision = Math.random();

        if (moveDecision < 0.4) {
          current.c++;
          path.push({ r: current.r, c: current.c });
        } else if (moveDecision < 0.7 && current.r > 0) {
          current.r--;
          path.push({ r: current.r, c: current.c });
        } else if (current.r < 6) {
          current.r++;
          path.push({ r: current.r, c: current.c });
        }
      }
      while (current.r !== finish.r) {
        if (current.r < finish.r) {
          current.r++;
        } else {
          current.r--;
        }
        path.push({ r: current.r, c: current.c });
      }
      return path;
    },
  };
})();
