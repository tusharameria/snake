import type { GameEvent } from '../events/GameEvent';

export interface Screen {
  enter(): void;
  exit(): void;
  update(deltaTime: number): GameEvent;
  render(ctx: CanvasRenderingContext2D): void;
}
