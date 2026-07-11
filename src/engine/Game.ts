export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private frameCount = 0;
  private lastFrameTime = 0;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  public start(): void {
    this.loop(0);
  }

  private update(deltaTime: number): void {
    // this.frameCount = Number((timestamp/60).toFixed(0));
    // this.lastFrameTime = timestamp;
  }

  private render(): void {
    this.ctx.fillStyle = `hsl(${Date.now() / 20}, 100%, 50%)`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '24px sans-serif';
    this.ctx.fillText(`Frame: ${this.frameCount}`, 20, 40);
  }

  private readonly loop = (timestamp: number): void => {
    const deltaTime = this.lastFrameTime === 0 ? 0 : timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    this.update(deltaTime);
    this.render();
    requestAnimationFrame(this.loop);
  };
}
