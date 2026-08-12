import { SnakeView } from './SnakeView';
import type { View } from './View';

export class App {
  private readonly container: HTMLElement;
  private readonly snakeView: View;
  private currentView: View;

  public constructor(container: HTMLElement) {
    this.container = container;
    this.snakeView = new SnakeView(this.handleBackClicked);
    this.currentView = this.snakeView;
  }

  public start(): void {
    this.currentView.mount(this.container);
  }

  private readonly handleBackClicked = (): void => {
    window.history.back();
  };
}
