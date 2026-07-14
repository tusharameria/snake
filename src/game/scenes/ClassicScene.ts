import type { InputManager } from '../../engine/input/InputManager';
import type { Scene } from '../../engine/scenes/Scene';
import { GAME_EVENT, type GameEvent } from '../../engine/events/GameEvent';
import { Board } from '../entities/Board';
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from '../Constants';
import { DIRECTIONS } from '../entities/Direction';
import { Food } from '../entities/Food';
import type { Position } from '../entities/Position';
import { Snake } from '../entities/Snake';

export class ClassicScene implements Scene {
  private readonly snake: Snake;
  private readonly board: Board;
  private readonly food: Food;
  private readonly input: InputManager;

  private timeElapsed = 0;
  private timePerStep = 150;

  public constructor(input: InputManager) {
    this.board = new Board(GRID_WIDTH, GRID_HEIGHT);
    this.snake = new Snake();
    const randomPosition = this.generateRandomEmptyPosition();
    this.food = new Food(randomPosition);
    this.input = input;
  }

  private readonly checkPressedKey = (): void => {
    if (this.input.wasKeyPressed('ArrowUp')) {
      this.snake.setDirection(DIRECTIONS.Up);
    }

    if (this.input.wasKeyPressed('ArrowDown')) {
      this.snake.setDirection(DIRECTIONS.Down);
    }

    if (this.input.wasKeyPressed('ArrowLeft')) {
      this.snake.setDirection(DIRECTIONS.Left);
    }

    if (this.input.wasKeyPressed('ArrowRight')) {
      this.snake.setDirection(DIRECTIONS.Right);
    }
  };

  public enter(): void {}
  public exit(): void {}

  public update(deltaTime: number): GameEvent {
    if (this.input.wasKeyPressed('Escape')) {
      return GAME_EVENT.PauseGame;
    }
    this.checkPressedKey();
    this.timeElapsed += deltaTime;
    while (this.timeElapsed >= this.timePerStep) {
      const nextHead = this.snake.getNextHeadPosition();
      if (this.board.hasWallAt(nextHead) || this.snake.willCollideWithBody(nextHead)) {
        return GAME_EVENT.GameOver;
      } else {
        if (this.food.position.x === nextHead.x && this.food.position.y === nextHead.y) {
          this.snake.feed();
          this.food.respawn(this.generateRandomEmptyPosition());
        }
        this.snake.move();
        this.timeElapsed -= this.timePerStep;
      }
    }
    return GAME_EVENT.None;
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
