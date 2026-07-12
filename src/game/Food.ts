import type { Position } from './Position';

export class Food {
  public position: Position;

  public constructor(position: Position) {
    this.position = position;
  }

  public respawn(position: Position): void {
    this.position = position;
  }
}
