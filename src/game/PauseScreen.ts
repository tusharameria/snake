import { BaseScreen } from '../engine/BaseScreen';
import { SCREEN_EVENT, type ScreenEvent } from '../engine/ScreenEvent';

export class PauseScreen extends BaseScreen {
  private resumeRequested = false;

  public enter(): void {
    window.addEventListener('keydown', this.onKeyDown);
  }
  public exit(): void {
    window.removeEventListener('keydown', this.onKeyDown);
  }
  public update(deltaTime: number): ScreenEvent {
    if (!this.resumeRequested) {
      return SCREEN_EVENT.None;
    }
    console.log(deltaTime);
    this.resumeRequested = false;
    return SCREEN_EVENT.ResumeGame;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('Press ENTER to reume', ctx.canvas.width / 2, ctx.canvas.height / 2);
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'Enter':
        this.resumeRequested = true;
        break;
    }
  };
}
