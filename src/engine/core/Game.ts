import { GAME_STATE, type GameState } from '../state/GameState';
import type { InputManager } from '../input/InputManager';
import type { Scene } from '../scenes/Scene';
import type { Screen } from '../screens/Screen';
import { GAME_EVENT } from '../events/GameEvent';

export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly inputManager: InputManager;
  private readonly scene: Scene;
  private readonly homeScreen: Screen;
  private readonly gameOverScreen: Screen;
  private readonly pauseScreen: Screen;
  private state: GameState;

  private lastFrameTime = 0;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    inputManager: InputManager,
    scene: Scene,
    homeScreen: Screen,
    gameOverScreen: Screen,
    pauseScreen: Screen,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.inputManager = inputManager;
    this.scene = scene;
    this.state = GAME_STATE.Home;
    this.homeScreen = homeScreen;
    this.gameOverScreen = gameOverScreen;
    this.pauseScreen = pauseScreen;
  }

  public start(): void {
    this.homeScreen.enter();
    this.loop(0);
  }

  private readonly loop = (timestamp: number): void => {
    const deltaTime = this.lastFrameTime === 0 ? 0 : timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    const currentObject = this.getCurrentObject();
    if (currentObject !== null) {
      const event = currentObject.update(deltaTime);
      switch (event) {
        // SCREEN EVENTS
        case GAME_EVENT.StartGame:
          this.setState(GAME_STATE.Playing);
          break;

        case GAME_EVENT.RestartGame:
          this.scene.reset();
          this.setState(GAME_STATE.Playing);
          break;

        case GAME_EVENT.ResumeGame:
          this.setState(GAME_STATE.Playing);
          break;

        // SCENE EVENTS
        case GAME_EVENT.GameOver:
          this.setState(GAME_STATE.GameOver);
          break;

        case GAME_EVENT.PauseGame:
          this.setState(GAME_STATE.Paused);
          break;

        case GAME_EVENT.None:
          break;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      currentObject.render(this.ctx);
    }

    this.inputManager.clear();
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

      case GAME_STATE.GameOver:
        this.gameOverScreen.exit();
        break;

      case GAME_STATE.Paused:
        this.pauseScreen.exit();
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

      case GAME_STATE.GameOver:
        this.gameOverScreen.enter();
        break;

      case GAME_STATE.Paused:
        this.pauseScreen.enter();
        break;
    }
  }

  private getCurrentObject(): Screen | Scene | null {
    switch (this.state) {
      // SCREENS
      case GAME_STATE.Home:
        return this.homeScreen;

      case GAME_STATE.GameOver:
        return this.gameOverScreen;

      case GAME_STATE.Paused:
        return this.pauseScreen;

      // SCENES
      case GAME_STATE.Playing:
        return this.scene;

      default:
        return null;
    }
  }
}
