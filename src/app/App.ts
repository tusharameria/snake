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
    this.homeView = new HomeView(this.showSnakeView);
    this.currentView = this.homeView;
    this.snakeView = new SnakeView(this.showHomeView);
  }

  public start(): void {
    this.currentView.mount(this.container);
  }

  private readonly showHomeView = (): void => {
    this.currentView.unmount();
    this.currentView = this.homeView;
    this.currentView.mount(this.container);
  };

  private readonly showSnakeView = (): void => {
    this.currentView.unmount();
    this.currentView = this.snakeView;
    this.currentView.mount(this.container);
  };
}
