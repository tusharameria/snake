import type { Screen } from '../engine/Screen';
import { SCREEN_EVENT, type ScreenEvent } from '../engine/ScreenEvent';

export class HomeScreen implements Screen {
  private startRequested = false;

  public enter(): void {
    window.addEventListener('keydown', this.onKeyDown);
  }
  public exit(): void {
    window.removeEventListener('keydown', this.onKeyDown);
  }
  public update(deltaTime: number): ScreenEvent {
    if (!this.startRequested) {
      return SCREEN_EVENT.None;
    }
    this.startRequested = false;
    return SCREEN_EVENT.StartGame;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('Snake', ctx.canvas.width / 2, ctx.canvas.height / 2);
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'Enter':
        this.startRequested = true;
        break;
    }
  };
}
