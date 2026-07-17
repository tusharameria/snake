export class Viewport {
  public static attach(canvas: HTMLCanvasElement): void {
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';
    canvas.style.width = '80vmin';
    canvas.style.height = '80vmin';
  }
}
