import { Game } from '../engine/core/Game';
import { InputManager } from '../engine/input/InputManager';
import { ClassicScene } from './scenes/ClassicScene';
import { GameOverScreen } from './ui/GameOverScreen';
import { HomeScreen } from './ui/HomeScreen';
import { PauseScreen } from './ui/PauseScreen';

export function mount(container: HTMLElement): void {
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('Failed to get 2D context.');
  }

  const inputManager = new InputManager();
  const scene = new ClassicScene(inputManager);
  const homeScreen = new HomeScreen(inputManager);
  const gameOverScreen = new GameOverScreen(inputManager);
  const pauseScreen = new PauseScreen(inputManager);

  const game = new Game(canvas, ctx, inputManager, scene, homeScreen, gameOverScreen, pauseScreen);

  game.start();
}
export function unmount(): void {}
