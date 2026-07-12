import type { Scene } from '../engine/Scene';
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './Constants';
import { Snake } from './Snake';

export class SnakeScene implements Scene {
  private readonly snake: Snake;

  private timeElapsed = 0;
  private timePerStep = 1000;

  public constructor() {
    this.snake = new Snake();
  }

  public update(deltaTime: number): void {
    this.timeElapsed += deltaTime;
    while (this.timeElapsed >= this.timePerStep) {
      this.snake.move();
      this.timeElapsed -= this.timePerStep;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // Fill the wole canvas with color
    ctx.fillStyle = 'white';

    // Make grid borders
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    for (let x = 0; x <= GRID_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }

    for (let y = 0; y <= GRID_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(GRID_WIDTH * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    ctx.fillStyle = '#4CAF50';

    for (const segment of this.snake.Segments) {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}
