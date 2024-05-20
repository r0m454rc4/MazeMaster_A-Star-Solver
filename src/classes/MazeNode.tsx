// MazeNode.tsx
// r0m454rc4.

export class MazeNode {
  position: [number, number];
  g: number;
  h: number;
  f: number;
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
