import type { GameEvent } from '../events/GameEvent';

export interface Scene {
  enter(): void;
  exit(): void;
  update(deltaTime: number): GameEvent;
  render(ctx: CanvasRenderingContext2D): void;
  reset(): void;
}
