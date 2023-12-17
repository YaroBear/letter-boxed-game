class Point {
  constructor(x, y, active = false) {
    this.x = x;
    this.y = y;
    this.hovered = active;
    this.clicked = false;
  }

  isPoint(x, y) {
    return (
      this.x - 10 < x && x < this.x + 10 && this.y - 10 < y && y < this.y + 10
    );
  }

  hover(x, y) {
    this.hovered = this.isPoint(x, y);
  }

  click(x, y) {
    if (this.isPoint(x, y)) {
      this.clicked = true;
      return this;
    } else {
      this.clicked = false;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    if (this.hovered) {
      ctx.fillStyle = "rgb(0, 0, 0)";
    } else {
      ctx.fillStyle = "rgb(191, 250, 164)";
    }
    ctx.fill();
    ctx.stroke();
  }
}

class HiddenPoint extends Point {
  draw(ctx) {
    // no-op
  }
}

Offset = {
  left: (x, y) => new Point(x - 35, y + 7),
  right: (x, y) => new Point(x + 20, y + 7),
  top: (x, y) => new Point(x - 7.5, y - 20),
  bottom: (x, y) => new Point(x - 7.5, y + 35),
};

class Letter extends Point {
  constructor(x, y, letter, offset) {
    const offsetx = Offset[offset](x, y).x;
    const offsety = Offset[offset](x, y).y;
    super(offsetx, offsety);
    this.letter = letter;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.font = "20px Arial";
    ctx.fillText(this.letter, this.x, this.y);
  }
}
