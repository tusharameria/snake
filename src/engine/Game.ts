export class Game {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private frameCount = 0;

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

  private update(): void {
    this.frameCount++
  }

  private render(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.fillStyle = `hsl(${Date.now() / 20}, 100%, 50%)`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.font = "24px sans-serif";
    this.ctx.fillText(`Frame: ${this.frameCount}`, 20, 40);
  }

  private loop(): void {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }
}