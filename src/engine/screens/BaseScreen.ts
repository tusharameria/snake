import type { Screen } from './state/screens/Screen';
import type { GameEvent } from './events/GameEvent';

export abstract class BaseScreen implements Screen {
  public enter(): void {}

  public exit(): void {}

  public abstract update(deltaTime: number): GameEvent;

  public abstract render(ctx: CanvasRenderingContext2D): void;
}
