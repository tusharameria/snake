import { Game } from '../engine/core/Game';
import { Viewport } from '../engine/core/Viewport';
import { InputManager } from '../engine/input/InputManager';
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './Constants';
import { ClassicScene } from './scenes/ClassicScene';
import { GameOverScreen } from './ui/GameOverScreen';
import { HomeScreen } from './ui/HomeScreen';
import { PauseScreen } from './ui/PauseScreen';

let game: Game | null = null;
let inputManager: InputManager | null = null;

export function mount(container: HTMLElement): void {
  const canvas = document.createElement('canvas');
  Viewport.attach(canvas);
  canvas.width = GRID_WIDTH * CELL_SIZE;
  canvas.height = GRID_HEIGHT * CELL_SIZE;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('Failed to get 2D context.');
  }

  inputManager = new InputManager();
  const scene = new ClassicScene(inputManager);
  const homeScreen = new HomeScreen(inputManager);
  const gameOverScreen = new GameOverScreen(inputManager);
  const pauseScreen = new PauseScreen(inputManager);

  game = new Game(canvas, ctx, inputManager, scene, homeScreen, gameOverScreen, pauseScreen);
  game.start();
}

export function unmount(): void {
  inputManager?.dispose();
  inputManager = null;
  game?.stop();
  game = null;
}
