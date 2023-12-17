class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.createGameGraph();
    this.createBoundingBoxGraph();
    this.listenToMouse();
    this.listenToClick();
    this.currentSelectedPoint = null;
    this.currentLetterChain = [];
    this.completedLetterChains = [];
  }

  debug() {}

  listenToMouse() {
    this.ctx.canvas.addEventListener("mousemove", (e) => {
      const mousePosition = this.getMousePosition(e);
      this.gameGraph.points.forEach((point) =>
        point.hover(mousePosition.x, mousePosition.y)
      );
    });
  }

  samePointValidator(activePoint) {
    if (this.currentSelectedPoint == activePoint) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove(activePoint) {
    return (
      !this.sameSideValidator(activePoint) &&
      !this.samePointValidator(activePoint)
    );
  }

  sameSideValidator(activePoint) {
    const indexActivePoint = this.gameGraph.points.indexOf(activePoint);
    const indexCurrentSelectedPoint = this.gameGraph.points.indexOf(
      this.currentSelectedPoint
    );

    return (
      Math.floor(indexActivePoint / 3) ===
      Math.floor(indexCurrentSelectedPoint / 3)
    );
  }

  addSegment(toPoint) {
    this.gameGraph.segments.push(
      new Segment(this.currentSelectedPoint, toPoint)
    );
  }

  undoAddSegment() {
    const segment = this.gameGraph.segments.pop();
    if (segment) {
      this.currentSelectedPoint = segment.p1;
    } else {
      this.currentSelectedPoint = null;
    }
    this.currentLetterChain.pop();
    this.updateCurrentLetterChainText();
  }

  updateCurrentLetterChainText() {
    const currentLetterChainText = document.getElementById(
      "current-letter-chain"
    );
    currentLetterChainText.innerHTML = this.currentLetterChain.join("");
  }

  validateCurrentLetterChain() {
    const currentWord = this.currentLetterChain.join("");
    const wordList = ["ABC", "DEF", "GHI", "JKL"];
    if (wordList.includes(currentWord)) {
      this.completedLetterChains.push(this.currentLetterChain);
      this.currentLetterChain = [];
      this.updateCurrentLetterChainText();
    }
  }

  listenToClick() {
    this.ctx.canvas.addEventListener("click", (e) => {
      const mousePosition = this.getMousePosition(e);
      const pointClicked = this.gameGraph.points.find((point) =>
        point.click(mousePosition.x, mousePosition.y)
      );
      if (pointClicked && this.isValidMove(pointClicked)) {
        if (this.currentSelectedPoint) {
          this.addSegment(pointClicked);
        }
        this.currentSelectedPoint = pointClicked;
        this.currentLetterChain.push(
          this.gameGraph.labels[this.gameGraph.points.indexOf(pointClicked)]
            .letter
        );
        console.log(this.currentLetterChain);
      }
      this.updateCurrentLetterChainText();
    });
  }

  getMousePosition(e) {
    const rect = this.ctx.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  }

  createBoundingBoxGraph() {
    const p1 = new HiddenPoint(50, 100);
    const p2 = new HiddenPoint(350, 100);
    const p3 = new HiddenPoint(50, 400);
    const p4 = new HiddenPoint(350, 400);

    const s1 = new Segment(p1, p2);
    const s2 = new Segment(p1, p3);
    const s3 = new Segment(p3, p4);
    const s4 = new Segment(p2, p4);

    this.boundingBoxGraph = new Graph(
      this.ctx,
      [p1, p2, p3, p4],
      [s1, s2, s3, s4]
    );
  }

  createGameGraph() {
    // top edge
    const p1 = new Point(100, 100);
    const p2 = new Point(200, 100);
    const p3 = new Point(300, 100);
    const letter1 = new Letter(100, 100, "A", "top");
    const letter2 = new Letter(200, 100, "B", "top");
    const letter3 = new Letter(300, 100, "C", "top");

    // bottom edge
    const p4 = new Point(100, 400);
    const p5 = new Point(200, 400);
    const p6 = new Point(300, 400);
    const letter4 = new Letter(100, 400, "D", "bottom");
    const letter5 = new Letter(200, 400, "E", "bottom");
    const letter6 = new Letter(300, 400, "F", "bottom");

    // left edge
    const p7 = new Point(50, 150);
    const p8 = new Point(50, 250);
    const p9 = new Point(50, 350);
    const letter7 = new Letter(50, 150, "G", "left");
    const letter8 = new Letter(50, 250, "H", "left");
    const letter9 = new Letter(50, 350, "I", "left");

    // right edge
    const p10 = new Point(350, 150);
    const p11 = new Point(350, 250);
    const p12 = new Point(350, 350);
    const letter10 = new Letter(350, 150, "J", "right");
    const letter11 = new Letter(350, 250, "K", "right");
    const letter12 = new Letter(350, 350, "L", "right");

    this.gameGraph = new Graph(
      this.ctx,
      [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12],
      [],
      [
        letter1,
        letter2,
        letter3,
        letter4,
        letter5,
        letter6,
        letter7,
        letter8,
        letter9,
        letter10,
        letter11,
        letter12,
      ]
    );
  }

  draw() {
    this.boundingBoxGraph.draw();
    this.gameGraph.draw();
  }
}
