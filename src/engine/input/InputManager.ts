import { INPUT_ACTION, type InputAction } from './InputAction';

export class InputManager {
  private readonly pressedActions = new Set<InputAction>();

  public constructor() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    const action = this.getAction(event.key);

    if (action !== null) {
      this.pressedActions.add(action);
    }
  };

  private getAction(key: string): InputAction | null {
    switch (key) {
      case 'ArrowUp':
        return INPUT_ACTION.Up;

      case 'ArrowDown':
        return INPUT_ACTION.Down;

      case 'ArrowLeft':
        return INPUT_ACTION.Left;

      case 'ArrowRight':
        return INPUT_ACTION.Right;

      case 'Escape':
        return INPUT_ACTION.Pause;

      case 'Enter':
        return INPUT_ACTION.Confirm;

      default:
        return null;
    }
  }

  public press(action: InputAction): void {
    this.pressedActions.add(action);
  }

  public wasPressed(action: InputAction): boolean {
    return this.pressedActions.has(action);
  }

  public clear(): void {
    this.pressedActions.clear();
  }

  public dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
