import { GAME_STATE, type GameState } from '../game/GameState';
import type { Scene } from './Scene';
import { SCENE_EVENT } from './SceneEvent';
import type { Screen } from './Screen';
import { SCREEN_EVENT } from './ScreenEvent';

export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly scene: Scene;
  private readonly homeScreen: Screen;
  private state: GameState;

  private lastFrameTime = 0;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    scene: Scene,
    homeScreen: Screen,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scene = scene;
    this.state = GAME_STATE.Home;
    this.homeScreen = homeScreen;
  }

  public start(): void {
    this.homeScreen.enter();
    this.loop(0);
  }

  private readonly loop = (timestamp: number): void => {
    const deltaTime = this.lastFrameTime === 0 ? 0 : timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    switch (this.state) {
      case GAME_STATE.Home: {
        const event = this.homeScreen.update(deltaTime);
        switch (event) {
          case SCREEN_EVENT.StartGame:
            this.setState(GAME_STATE.Playing);
            break;

          case SCREEN_EVENT.None:
            break;
        }
        break;
      }

      case GAME_STATE.Playing: {
        const event = this.scene.update(deltaTime);
        switch (event) {
          case SCENE_EVENT.GameOver:
            this.setState(GAME_STATE.GameOver);
            break;

          case SCENE_EVENT.None:
            break;
        }
        break;
      }

      case GAME_STATE.Paused:
        break;

      case GAME_STATE.GameOver:
        break;
    }

    switch (this.state) {
      case GAME_STATE.Home:
        this.homeScreen.render(this.ctx);
        break;

      case GAME_STATE.Playing:
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.scene.render(this.ctx);
        break;

      case GAME_STATE.Paused:
        break;

      case GAME_STATE.GameOver:
        break;
    }

    requestAnimationFrame(this.loop);
  };

  private setState(state: GameState): void {
    if (this.state === state) return;

    switch (this.state) {
      case GAME_STATE.Home:
        this.homeScreen.exit();
        break;

      case GAME_STATE.Playing:
        this.scene.exit();
        break;
    }

    this.state = state;

    switch (this.state) {
      case GAME_STATE.Home:
        this.homeScreen.enter();
        break;

      case GAME_STATE.Playing:
        this.scene.enter();
        break;
    }
  }
}
