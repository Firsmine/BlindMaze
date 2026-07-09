(function () {
  let intervalId = null;

  window.BlindMazeTimer = {
    startCountdown: function (duration, onTick, onComplete) {
      this.stopCountdown();

      let timeLeft = duration;
      onTick(timeLeft);

      intervalId = setInterval(function () {
        timeLeft--;
        if (timeLeft >= 0) {
          onTick(timeLeft);
        }
        if (timeLeft <= 0) {
          clearInterval(intervalId);
          intervalId = null;
          if (typeof onComplete === "function") {
            onComplete();
          }
        }
      }, 1000);
    },

    stopCountdown: function () {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
  };
})();
