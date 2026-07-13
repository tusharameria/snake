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
  private readonly gameOverScreen: Screen;
  private readonly pauseScreen: Screen;
  private state: GameState;

  private lastFrameTime = 0;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    scene: Scene,
    homeScreen: Screen,
    gameOverScreen: Screen,
    pauseScreen: Screen,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
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

    this.updateScreen(deltaTime);
    this.updateScene(deltaTime);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderScreen();
    this.renderScene();

    requestAnimationFrame(this.loop);
  };

  private updateScreen(deltaTime: number): void {
    const currentScreen = this.getCurrentScreen();
    if (currentScreen !== null) {
      const event = currentScreen.update(deltaTime);
      switch (event) {
        case SCREEN_EVENT.StartGame:
          this.setState(GAME_STATE.Playing);
          break;

        case SCREEN_EVENT.RestartGame:
          this.scene.reset();
          this.setState(GAME_STATE.Playing);
          break;

        case SCREEN_EVENT.ResumeGame:
          this.setState(GAME_STATE.Playing);
          break;

        case SCREEN_EVENT.None:
          break;
      }
    }
  }

  private updateScene(deltaTime: number): void {
    const currentScene = this.getCurrentScene();
    if (currentScene !== null) {
      const event = currentScene.update(deltaTime);
      switch (event) {
        case SCENE_EVENT.GameOver:
          this.setState(GAME_STATE.GameOver);
          break;

        case SCENE_EVENT.PauseGame:
          this.setState(GAME_STATE.Paused);
          break;

        case SCENE_EVENT.None:
          break;
      }
    }
  }

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

  private renderScreen(): void {
    const currentScreen = this.getCurrentScreen();
    if (currentScreen !== null) {
      currentScreen.render(this.ctx);
    }
  }

  private renderScene(): void {
    const currentScene = this.getCurrentScene();
    if (currentScene !== null) {
      currentScene.render(this.ctx);
    }
  }

  private getCurrentScreen(): Screen | null {
    switch (this.state) {
      case GAME_STATE.Home:
        return this.homeScreen;

      case GAME_STATE.GameOver:
        return this.gameOverScreen;

      case GAME_STATE.Paused:
        return this.pauseScreen;

      default:
        return null;
    }
  }

  private getCurrentScene(): Scene | null {
    switch (this.state) {
      case GAME_STATE.Playing:
        return this.scene;

      default:
        return null;
    }
  }
}
