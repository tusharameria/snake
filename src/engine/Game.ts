export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private stepCount = 0;
  private lastFrameTime = 0;
  private timeElapsed = 0;
  private timePerStep = 150;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  public start(): void {
    this.loop(0);
  }

  private update(deltaTime: number): void {
    this.timeElapsed += deltaTime;
    while (this.timeElapsed >= this.timePerStep) {
      this.stepCount++;
      this.timeElapsed -= this.timePerStep;
    }
  }

  private render(): void {
    this.ctx.fillStyle = `hsl(${Date.now() / 20}, 100%, 50%)`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '24px sans-serif';
    this.ctx.fillText(`Step: ${this.stepCount}`, 20, 40);
  }

  private readonly loop = (timestamp: number): void => {
    const deltaTime = this.lastFrameTime === 0 ? 0 : timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    this.update(deltaTime);
    this.render();
    requestAnimationFrame(this.loop);
  };
}
