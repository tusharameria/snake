import type { SceneEvent } from './SceneEvent';

export interface Scene {
  enter(): void;
  exit(): void;
  update(deltaTime: number): SceneEvent;
  render(ctx: CanvasRenderingContext2D): void;
  reset(): void;
}
