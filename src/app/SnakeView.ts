import type { View } from './View';
import { mount as mountGame, unmount as unmountGame } from '../game';

export class SnakeView implements View {
  private root: HTMLDivElement | null = null;
  private readonly onGoHome: () => void;

  public constructor(onGoHome: () => void) {
    this.onGoHome = onGoHome;
  }

  private readonly onBackClicked = (): void => {
    this.onGoHome();
  };

  public mount(container: HTMLElement): void {
    const root = document.createElement('div');

    const backButton = document.createElement('button');
    backButton.textContent = '← Back';
    backButton.addEventListener('click', this.onBackClicked);

    mountGame(root);
    root.appendChild(backButton);
    container.appendChild(root);
    this.root = root;
  }

  public unmount(): void {
    unmountGame();
    this.root?.remove();
    this.root = null;
  }
}
