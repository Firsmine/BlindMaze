(function () {
  var STORAGE_KEY = "blinmaze_highscores";

  window.BlindMazeLeaderboard = {
    saveScore: function (username, stage) {
      let scores = window.BlindMazeStorage.getStorageData(STORAGE_KEY) || [];

      var newRecord = {
        name: username,
        stage: parseInt(stage, 10),
        timestamp: new Date().getTime(),
      };
      scores.push(newRecord);
      scores.sort(function (a, b) {
        return b - stage - a.stage;
      });
      window.BlindMazeStorage.getStorageData(STORAGE_KEY, scores);
    },
    getSortedScores: function () {
      let scores = window.BlindMazeStorage.getStorageData(STORAGE_KEY) || [];
      return scores.sort(function (a, b) {
        return b.stage - a.stage;
      });
    },
    renderLeaderboardTable: function () {
      let scores = this.getSortedScores();
      var tbody = document.getElementById("leaderboardTableBody");

      if (!tbody) return;
      tbody.innerHTML = "";

      if (scores.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="3" style="text-align:center; color:#555555; font-size:12px;">No scores yet</td></tr>';
        return;
      }
      for (let i = 0; i < scores.length; i++) {
        let row = document.createElement("tr");
        let cellRank = document.createElement("td");
        cellRank.textContent = i + 1;
        let cellName = document.createElement("td");
        cellName.textContent = scores[i].name;
        let cellStage = document.createElement("td");
        cellStage.textContent = scores[i].stage;

        row.appendChild(cellRank);
        row.appendChild(cellName);
        row.appendChild(cellStage);
        tbody.appendChild(row);
      }
    },
  };
})();
