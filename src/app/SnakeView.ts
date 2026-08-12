import type { View } from './View';
import { mount as mountGame, unmount as unmountGame } from '../game';
import '../styles/snakeView.css';
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
    root.className = 'snake-view';

    const header = document.createElement('header');
    header.className = 'snake-view__header';

    const backButton = document.createElement('button');
    backButton.className = 'snake-view__back';
    backButton.textContent = '←';
    backButton.addEventListener('click', this.onBackClicked);

    const gameContainer = document.createElement('main');
    gameContainer.className = 'snake-view__game';

    header.appendChild(backButton);
    root.append(header, gameContainer);

    mountGame(gameContainer);
    container.appendChild(root);
    this.root = root;
  }

  public unmount(): void {
    unmountGame();
    this.root?.remove();
    this.root = null;
  }
}
