export class Game {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  public start(): void {
    this.loop();
  }

  private render(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.fillStyle = `hsl(${Date.now() / 20}, 100%, 50%)`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private loop(): void {
    this.render();
    requestAnimationFrame(() => this.loop());
  }
}