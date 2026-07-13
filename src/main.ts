import './style.css';
import { Game } from './engine/Game';
import { type Screen } from './engine/Screen';
import { SnakeScene } from './game/SnakeScene';
import { HomeScreen } from './game/HomeScreen';
import { GameOverScreen } from './game/GameOverScreen';

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
const homeScreen: Screen = new HomeScreen();
const gameOverScreen: Screen = new GameOverScreen();
const game = new Game(canvas, ctx, scene, homeScreen, gameOverScreen);
game.start();
