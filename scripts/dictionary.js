class Dictionary {
  constructor(minimumLength = 3) {
    this.minimumLength = minimumLength;
    this.lookup = {};
    this.words = [];
  }

  load() {
    return fetch(
      "https://raw.githubusercontent.com/dolph/dictionary/master/popular.txt"
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        let words = data.split("\n");
        this.words = words.filter((word) => word.length >= this.minimumLength);
        this.words.forEach((word) => {
          this.lookup[word] = true;
        });
      });
  }

  isValidWord(word) {
    return this.lookup[word] === true;
  }
}
