window.crypto = {
  getRandomValues(array) {
    for (let i = 0; i < array.length; i += 1) {
      array[i] = Math.floor(Math.random() * 1000000);
    }
  },
};
