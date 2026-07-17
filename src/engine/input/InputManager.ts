export class InputManager {
  private readonly pressedKeys = new Set<string>();

  public constructor() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    this.pressedKeys.add(event.key);
  };

  public wasKeyPressed(key: string): boolean {
    return this.pressedKeys.has(key);
  }

  public clear(): void {
    this.pressedKeys.clear();
  }

  public dispose() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
