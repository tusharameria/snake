import { DIRECTIONS, type Direction } from './Direction';
import type { Position } from './Position';

export class Snake {
  private body: Position[];
  private direction: Direction;

  public constructor() {
    this.body = [
      { x: 3, y: 5 },
      { x: 4, y: 5 },
      { x: 5, y: 5 },
    ];
    this.direction = DIRECTIONS.Right;
  }

  public get Segments(): readonly Position[] {
    return this.body;
  }

  private getNextHeadPosition(): Position {
    const head = this.body[this.body.length - 1];

    return {
      x: head.x + this.direction.dx,
      y: head.y + this.direction.dy,
    };
  }

  public move(): void {
    const nextHead = this.getNextHeadPosition();
    this.body.shift();
    this.body.push(nextHead);
  }
}
