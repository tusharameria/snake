export interface Scene {
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}
