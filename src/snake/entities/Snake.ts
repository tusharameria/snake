import { GRID_HEIGHT, GRID_WIDTH } from '../Constants';
import { DIRECTIONS, type Direction } from './Direction';
import type { Position } from './Position';

export class Snake {
  private body: Position[];
  private currentDirection: Direction;
  private queuedDirection: Direction;
  private pendingGrowth: number;

  public constructor() {
    this.body = [
      { x: 3, y: 5 },
      { x: 4, y: 5 },
      { x: 5, y: 5 },
    ];
    this.currentDirection = DIRECTIONS.Right;
    this.pendingGrowth = 0;
    this.queuedDirection = this.currentDirection;
  }

  public get segments(): readonly Position[] {
    return this.body;
  }

  public setDirection(currentDirection: Direction): void {
    if (this.currentDirection != this.queuedDirection) return;
    const movingVertically = this.queuedDirection.dy !== 0;
    const newDirectionIsVertical = currentDirection.dy !== 0;

    if (movingVertically !== newDirectionIsVertical) {
      this.queuedDirection = currentDirection;
    }
  }

  public getNextHeadPosition(): Position {
    const head = this.body[this.body.length - 1];

    return {
      x: (head.x + this.queuedDirection.dx + GRID_WIDTH) % GRID_WIDTH,
      y: (head.y + this.queuedDirection.dy + GRID_HEIGHT) % GRID_HEIGHT,
    };
  }

  public move(): void {
    this.currentDirection = this.queuedDirection;
    const nextHead = this.getNextHeadPosition();
    if (this.pendingGrowth == 0) {
      this.body.shift();
    } else {
      this.pendingGrowth--;
    }
    this.body.push(nextHead);
  }

  public feed(): void {
    this.pendingGrowth++;
  }

  public reset(): void {
    this.body = [
      { x: 3, y: 5 },
      { x: 4, y: 5 },
      { x: 5, y: 5 },
    ];
    this.currentDirection = DIRECTIONS.Right;
    this.queuedDirection = this.currentDirection;
    this.pendingGrowth = 0;
  }

  public willCollideWithBody(position: Position): boolean {
    const startIdx = this.pendingGrowth > 0 ? 0 : 1;
    for (let i = startIdx; i < this.body.length; i++) {
      const bodyPart = this.body[i];
      if (bodyPart.x === position.x && bodyPart.y === position.y) {
        return true;
      }
    }
    return false;
  }
}
