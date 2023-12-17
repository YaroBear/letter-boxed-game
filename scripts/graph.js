class Graph {
  constructor(ctx, points = [], segments = [], labels = []) {
    this.ctx = ctx;
    this.points = points;
    this.segments = segments;
    this.labels = labels;
  }

  draw() {
    this.segments.forEach((segment) => segment.draw(this.ctx));
    this.points.forEach((point) => point.draw(this.ctx));
    this.labels.forEach((label) => label.draw(this.ctx));
  }
}
