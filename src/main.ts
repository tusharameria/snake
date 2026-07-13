import './style.css';
import { Game } from './engine/core/Game';
import { ClassicScene } from './snake/scenes/ClassicScene';
import { HomeScreen } from './snake/ui/HomeScreen';
import { GameOverScreen } from './snake/ui/GameOverScreen';
import { PauseScreen } from './snake/ui/PauseScreen';
import { InputManager } from './engine/input/InputManager';

const canvas = document.getElementById('game') as HTMLCanvasElement;

if (!canvas) {
  throw new Error('Canvas not found');
}

const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error('Could not get 2D context');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const inputManager = new InputManager();
const scene = new ClassicScene(inputManager);
const homeScreen = new HomeScreen(inputManager);
const gameOverScreen = new GameOverScreen(inputManager);
const pauseScreen = new PauseScreen(inputManager);
const game = new Game(canvas, ctx, inputManager, scene, homeScreen, gameOverScreen, pauseScreen);
game.start();
