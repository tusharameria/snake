import type { ScreenEvent } from './ScreenEvent';

export interface Screen {
  enter(): void;
  exit(): void;
  update(deltaTime: number): ScreenEvent;
  render(ctx: CanvasRenderingContext2D): void;
}
