import type { Position } from './Position';

export class Board {
  public readonly width: number;
  public readonly height: number;
  private readonly _walls: Position[];

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this._walls = [];
    this.createWalls();
  }

  private createWalls(): void {
    for (let x = 0; x < this.width; x++) {
      this._walls.push({
        x,
        y: 0,
      });
    }
    for (let x = 0; x < this.width; x++) {
      this._walls.push({
        x,
        y: this.height - 1,
      });
    }
    for (let y = 0; y < this.height; y++) {
      this._walls.push({
        x: 0,
        y,
      });
    }
    for (let y = 0; y < this.height; y++) {
      this._walls.push({
        x: this.width - 1,
        y,
      });
    }
  }

  public get walls(): readonly Position[] {
    return this._walls;
  }

  public hasWallAt(position: Position): boolean {
    return this.walls.some((wall) => wall.x === position.x && wall.y === position.y);
  }

  // TODO : Optimise the algo to find empty cells later
  public getEmptyCells(occupiedPositions: readonly Position[]): readonly Position[] {
    const res: Position[] = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.hasWallAt({ x, y })) {
          continue;
        }
        if (!occupiedPositions.some((pos) => pos.x === x && pos.y === y)) {
          res.push({
            x,
            y,
          });
        }
      }
    }
    return res;
  }
}
