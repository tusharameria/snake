import { HomeView } from './HomeView';
import { SnakeView } from './SnakeView';
import type { View } from './View';

export class App {
  private readonly container: HTMLElement;
  private readonly snakeView: View;
  private readonly homeView: View;
  private currentView: View;

  public constructor(container: HTMLElement) {
    this.container = container;
    this.homeView = new HomeView(this.handlePlayClicked);
    this.currentView = this.homeView;
    this.snakeView = new SnakeView(this.handleBackClicked);
  }

  public start(): void {
    this.currentView.mount(this.container);
  }

  private readonly switchView = (targetView: View) => {
    this.currentView.unmount();
    this.currentView = targetView;
    this.currentView.mount(this.container);
  };

  private readonly handleBackClicked = (): void => {
    this.switchView(this.homeView);
  };

  private readonly handlePlayClicked = (): void => {
    this.switchView(this.snakeView);
  };
}
