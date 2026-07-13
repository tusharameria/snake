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
  private state: GameState;

  private lastFrameTime = 0;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    scene: Scene,
    homeScreen: Screen,
    gameOverScreen: Screen,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scene = scene;
    this.state = GAME_STATE.Home;
    this.homeScreen = homeScreen;
    this.gameOverScreen = gameOverScreen;
  }

  public start(): void {
    this.homeScreen.enter();
    this.loop(0);
  }

  private readonly loop = (timestamp: number): void => {
    const deltaTime = this.lastFrameTime === 0 ? 0 : timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // ----------------
    // ----------------
    // Update
    // ----------------
    // ----------------

    // --------
    // Update Screen
    // --------
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

        case SCREEN_EVENT.None:
          break;
      }
    }
    // --------
    // Update Scene
    // --------
    const currentScene = this.getCurrentScene();
    if (currentScene !== null) {
      const event = currentScene.update(deltaTime);
      switch (event) {
        case SCENE_EVENT.GameOver:
          this.setState(GAME_STATE.GameOver);
          break;

        case SCENE_EVENT.None:
          break;
      }
    }

    // ----------------
    // ----------------
    // Render
    // ----------------
    // ----------------

    // --------
    // Clear Canvas
    // --------
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // --------
    // Render Screen
    // --------
    currentScreen?.render(this.ctx);
    // --------
    // Render Scene
    // --------
    currentScene?.render(this.ctx);

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
    }
  }

  private getCurrentScreen(): Screen | null {
    switch (this.state) {
      case GAME_STATE.Home:
        return this.homeScreen;

      case GAME_STATE.GameOver:
        return this.gameOverScreen;

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
