import './style.css';
import { Game } from './engine/Game';

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

const game = new Game(canvas, ctx);
game.start();
