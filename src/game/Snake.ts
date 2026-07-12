import { GRID_HEIGHT, GRID_WIDTH } from './Constants';
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

  public get segments(): readonly Position[] {
    return this.body;
  }

  public setDirection(direction: Direction): void {
    const movingVertically = this.direction.dy !== 0;
    const newDirectionIsVertical = direction.dy !== 0;

    if (movingVertically !== newDirectionIsVertical) {
      this.direction = direction;
    }
  }

  public getNextHeadPosition(): Position {
    const head = this.body[this.body.length - 1];

    return {
      x: (head.x + this.direction.dx + GRID_WIDTH) % GRID_WIDTH,
      y: (head.y + this.direction.dy + GRID_HEIGHT) % GRID_HEIGHT,
    };
  }

  public move(): void {
    const nextHead = this.getNextHeadPosition();
    this.body.shift();
    this.body.push(nextHead);
  }
}
