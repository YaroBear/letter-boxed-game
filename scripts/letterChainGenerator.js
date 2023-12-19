class LetterChainGenerator {
  constructor() {}

  generateLetterChain(letterChainLength = 12) {
    let letterChain = [];
    while (letterChain.length < letterChainLength) {
      const letter = this.generateRandomLetter();
      if (!letterChain.includes(letter)) letterChain.push(letter);
    }
    return letterChain;
  }

  generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  // A -> DEFGHIJKL : A -> [3:11]
  // B -> DEFGHIJKL : B -> [3:11]
  // C -> DEFGHIJKL : C -> [3:11]
  // D -> ABCGHIKJL : D -> [0:2, 6:11]
  // E -> ABCGHIKJL : E -> [0:2, 6:11]
  // F -> ABCGHIKJL : F -> [0:2, 6:11]
  // G -> ABCDEFJKL : G -> [0:5, 9:11]
  // H -> ABCDEFJKL : H -> [0:5, 9:11]
  // I -> ABCDEFJKL : I -> [0:5, 9:11]
  // J -> ABCDEFGHI : J -> [0:8]
  // K -> ABCDEFGHI : K -> [0:8]
  // L -> ABCDEFGHI : L -> [0:8]
  generateLetterChainGraph(letterChain) {
    const graph = {};
    for (let i = 0; i < letterChain.length; i++) {
      if (!graph[letterChain[i]]) {
        graph[letterChain[i]] = [];
      }
      if (i < 3) {
        graph[letterChain[i]].push(...letterChain.slice(3, 12));
      }
      if (i > 2 && i < 6) {
        graph[letterChain[i]].push(...letterChain.slice(0, 3));
        graph[letterChain[i]].push(...letterChain.slice(6, 12));
      }
      if (i > 5 && i < 9) {
        graph[letterChain[i]].push(...letterChain.slice(0, 6));
        graph[letterChain[i]].push(...letterChain.slice(9, 12));
      }
      if (i > 8) {
        graph[letterChain[i]].push(...letterChain.slice(0, 9));
      }
    }

    return graph;
  }
}
