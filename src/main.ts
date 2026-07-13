import './style.css';
import { Game } from './engine/Game';
import { SnakeScene } from './game/SnakeScene';
import { HomeScreen } from './game/HomeScreen';
import { GameOverScreen } from './game/GameOverScreen';
import { PauseScreen } from './game/PauseScreen';

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

const scene = new SnakeScene();
const homeScreen = new HomeScreen();
const gameOverScreen = new GameOverScreen();
const pauseScreen = new PauseScreen();
const game = new Game(canvas, ctx, scene, homeScreen, gameOverScreen, pauseScreen);
game.start();
