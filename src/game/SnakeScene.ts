import type { Scene } from '../engine/Scene';
import { Board } from './Board';
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './Constants';
import { DIRECTIONS } from './Direction';
import { Snake } from './Snake';

export class SnakeScene implements Scene {
  private readonly snake: Snake;
  private readonly board: Board;

  private timeElapsed = 0;
  private timePerStep = 200;

  public constructor() {
    this.snake = new Snake();
    this.board = new Board(GRID_WIDTH, GRID_HEIGHT);
    window.addEventListener('keydown', this.onKeyDown);
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowUp':
        this.snake.setDirection(DIRECTIONS.Up);
        break;
      case 'ArrowDown':
        this.snake.setDirection(DIRECTIONS.Down);
        break;
      case 'ArrowLeft':
        this.snake.setDirection(DIRECTIONS.Left);
        break;
      case 'ArrowRight':
        this.snake.setDirection(DIRECTIONS.Right);
        break;
    }
  };

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
    this.renderBoard(ctx);
    this.renderGrids(ctx);
    this.renderSnake(ctx);
  }

  private renderBoard(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red';
    for (const wall of this.board.walls) {
      ctx.fillRect(wall.x * CELL_SIZE, wall.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }

  private renderGrids(ctx: CanvasRenderingContext2D): void {
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
  }

  private renderSnake(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#4CAF50';
    for (const segment of this.snake.segments) {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}
