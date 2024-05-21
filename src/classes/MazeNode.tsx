// MazeNode.tsx
// r0m454rc4.

export class MazeNode {
  // Row, column.
  position: [number, number];
  // Moving cost from the start node to the current one.
  g: number;
  // Heuristic cost, from the current node to the goal.
  h: number;
  // Total cost, adding g-cost plus heuristic.
  f: number;
  // Previous node in the path.
  parent: MazeNode | null;

  constructor(
    position: [number, number],
    g: number,
    h: number,
    f: number,
    parent: MazeNode | null
  ) {
    this.position = position;
    this.g = g;
    this.h = h;
    this.f = f;
    this.parent = parent;
  }
}
