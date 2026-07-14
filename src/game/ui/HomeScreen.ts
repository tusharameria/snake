import { BaseScreen } from '../../engine/screens/BaseScreen';
import type { InputManager } from '../../engine/input/InputManager';
import { GAME_EVENT, type GameEvent } from '../../engine/events/GameEvent';

export class HomeScreen extends BaseScreen {
  private readonly input: InputManager;

  public constructor(input: InputManager) {
    super();
    this.input = input;
  }

  public enter(): void {}
  public exit(): void {}

  public update(deltaTime: number): GameEvent {
    if (!this.input.wasKeyPressed('Enter')) {
      return GAME_EVENT.None;
    }
    console.log(deltaTime);
    return GAME_EVENT.StartGame;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('Press ENTER to start', ctx.canvas.width / 2, ctx.canvas.height / 2);
  }
}
