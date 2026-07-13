export const SCREEN_EVENT = {
  None: 0,
  StartGame: 1,
  RestartGame: 2,
  ResumeGame: 3,
} as const;

export type ScreenEvent = (typeof SCREEN_EVENT)[keyof typeof SCREEN_EVENT];
