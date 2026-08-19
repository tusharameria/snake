import { INPUT_ACTION } from './InputAction';
import type { InputAction } from './InputAction';
import type { InputManager } from './InputManager';

export class MobileControls {
  private readonly inputManager: InputManager;
  private readonly root: HTMLDivElement;

  public constructor(inputManager: InputManager) {
    this.inputManager = inputManager;

    this.root = document.createElement('div');
    this.root.className = 'mobile-controls';

    this.createButton('↑', INPUT_ACTION.Up);
    this.createButton('←', INPUT_ACTION.Left);
    this.createButton('↓', INPUT_ACTION.Down);
    this.createButton('→', INPUT_ACTION.Right);
  }

  private createButton(label: string, action: InputAction): void {
    const button = document.createElement('button');

    button.textContent = label;
    button.style.touchAction = 'none';

    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.inputManager.press(action);
    });

    this.root.appendChild(button);
  }

  public mount(container: HTMLElement): void {
    container.appendChild(this.root);
  }

  public unmount(): void {
    this.root.remove();
  }
}
