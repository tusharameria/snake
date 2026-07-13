import type { Screen } from './state/screens/Screen';
import type { ScreenEvent } from './events/ScreenEvent';

export abstract class BaseScreen implements Screen {
  public enter(): void {}

  public exit(): void {}

  public abstract update(deltaTime: number): ScreenEvent;

  public abstract render(ctx: CanvasRenderingContext2D): void;
}
