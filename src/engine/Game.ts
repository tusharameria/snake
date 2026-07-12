import type { Scene } from './Scene';

export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly scene: Scene;

  private lastFrameTime = 0;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scene: Scene) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scene = scene;
  }

  public start(): void {
    this.loop(0);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private readonly loop = (timestamp: number): void => {
    const deltaTime = this.lastFrameTime === 0 ? 0 : timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    this.scene.update(deltaTime);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scene.render(this.ctx);
    requestAnimationFrame(this.loop);
  };
}
