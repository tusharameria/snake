import { BaseScreen } from '../../engine/screens/BaseScreen';
import type { InputManager } from '../../engine/input/InputManager';
import { SCREEN_EVENT, type ScreenEvent } from '../../engine/events/ScreenEvent';

export class PauseScreen extends BaseScreen {
  private readonly input: InputManager;

  public constructor(input: InputManager) {
    super();
    this.input = input;
  }

  public enter(): void {}
  public exit(): void {}

  public update(deltaTime: number): ScreenEvent {
    if (!this.input.wasKeyPressed('Enter')) {
      return SCREEN_EVENT.None;
    }
    console.log(deltaTime);
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
}
