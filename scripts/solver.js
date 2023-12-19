class Solver {
  constructor(dictionary, letterChainGenerator) {
    this.dictionary = dictionary;
    this.letterChainGenerator = letterChainGenerator;
  }

  solve(letterChain) {
    const solutions = [];
    const letterChainGraph =
      this.letterChainGenerator.generateLetterChainGraph(letterChain);

    this.dictionary.words.forEach((word) => {
      const letters = word.split("");
      for (let i = 0; i < letters.length - 1; i++) {
        const letter = letters[i];
        const nextLetter = letters[i + 1];
        if (!letterChainGraph[letter]) {
          return;
        }
        if (!letterChainGraph[letter].includes(nextLetter)) {
          return;
        }
        if (i === letters.length - 2) {
          solutions.push(word);
        }
      }
    });

    console.log(letterChainGraph);
    console.log(solutions);
  }
}
