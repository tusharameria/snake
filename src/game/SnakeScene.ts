import type { Scene } from '../engine/Scene';
import { SCENE_EVENT, type SceneEvent } from '../engine/SceneEvent';
import { Board } from './Board';
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './Constants';
import { DIRECTIONS } from './Direction';
import { Food } from './Food';
import type { Position } from './Position';
import { Snake } from './Snake';

export class SnakeScene implements Scene {
  private readonly snake: Snake;
  private readonly board: Board;
  private readonly food: Food;
  private pauseRequested: boolean;

  private timeElapsed = 0;
  private timePerStep = 150;

  public constructor() {
    this.board = new Board(GRID_WIDTH, GRID_HEIGHT);
    this.snake = new Snake();
    const randomPosition = this.generateRandomEmptyPosition();
    this.food = new Food(randomPosition);
    this.pauseRequested = false;
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
      case 'P':
      case 'p':
        this.pauseRequested = true;
        break;
    }
  };

  public enter(): void {
    window.addEventListener('keydown', this.onKeyDown);
  }

  public exit(): void {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  public update(deltaTime: number): SceneEvent {
    if (this.pauseRequested) {
      this.pauseRequested = false;
      return SCENE_EVENT.PauseGame;
    }
    this.timeElapsed += deltaTime;
    while (this.timeElapsed >= this.timePerStep) {
      const nextHead = this.snake.getNextHeadPosition();
      if (this.board.hasWallAt(nextHead) || this.snake.willCollideWithBody(nextHead)) {
        return SCENE_EVENT.GameOver;
      } else {
        if (this.food.position.x === nextHead.x && this.food.position.y === nextHead.y) {
          this.snake.feed();
          this.food.respawn(this.generateRandomEmptyPosition());
        }
        this.snake.move();
        this.timeElapsed -= this.timePerStep;
      }
    }
    return SCENE_EVENT.None;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // Fill the wole canvas with color
    ctx.fillStyle = 'white';
    this.renderBoard(ctx);
    this.renderGrids(ctx);
    this.renderSnake(ctx);
    this.renderFood(ctx);
  }

  public reset(): void {
    this.snake.reset();
    this.food.respawn(this.generateRandomEmptyPosition());
    this.timeElapsed = 0;
    this.pauseRequested = false;
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

  private renderFood(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(
      this.food.position.x * CELL_SIZE,
      this.food.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    );
  }

  private generateRandomEmptyPosition(): Position {
    const emptyCells = this.board.getEmptyCells(this.snake.segments);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }
}
