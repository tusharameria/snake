import type { Position } from './Position';

export class Snake {
  private body: Position[];

  public constructor() {
    this.body = [
      { x: 3, y: 5 },
      { x: 4, y: 5 },
      { x: 5, y: 5 },
    ];
  }

  public get Segments(): readonly Position[] {
    return this.body;
  }
}
