(function () {
  window.BlindMazeStorage = {
    getStorageData: function (key) {
      try {
        let data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error("Storage read error: ", error);
        return null;
      }
    },

    setStorageData: function (key, data) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch (error) {
        console.error("Storage write error: ", error);
        return false;
      }
    },
  };
})();
