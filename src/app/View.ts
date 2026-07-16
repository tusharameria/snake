export interface View {
  mount(container: HTMLElement): void;
  unmount(): void;
}
