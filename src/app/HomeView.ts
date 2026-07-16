import type { View } from './View';

export class HomeView implements View {
  private root: HTMLDivElement | null = null;
  private readonly onPlaySnake: () => void;

  public constructor(onPlaySnake: () => void) {
    this.onPlaySnake = onPlaySnake;
  }

  public mount(container: HTMLElement): void {
    const root = document.createElement('div');

    const title = document.createElement('h1');
    title.textContent = 'Mini Games';

    const playButton = document.createElement('button');
    playButton.textContent = 'Play Snake';
    playButton.addEventListener('click', this.onPlayClicked);

    root.appendChild(title);
    root.appendChild(playButton);

    container.appendChild(root);

    this.root = root;
  }

  private readonly onPlayClicked = (): void => {
    this.onPlaySnake();
  };

  public unmount(): void {
    this.root?.remove();
    this.root = null;
  }
}
