import type { SceneEvent } from '../events/SceneEvent';

export interface Scene {
  enter(): void;
  exit(): void;
  update(deltaTime: number): SceneEvent;
  render(ctx: CanvasRenderingContext2D): void;
  reset(): void;
}
