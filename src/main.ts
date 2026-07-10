import './style.css'

const canvas = document.getElementById("game") as HTMLCanvasElement;

if (!canvas) {
  throw new Error("Canvas not found");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Could not get 2D context");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "#1f2937";
ctx.fillRect(0, 0, canvas.width, canvas.height);