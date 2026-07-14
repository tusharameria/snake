export const GAME_EVENT = {
  None: 0,
  StartGame: 1,
  RestartGame: 2,
  ResumeGame: 3,
  GameOver: 4,
  PauseGame: 5,
} as const;

export type GameEvent = (typeof GAME_EVENT)[keyof typeof GAME_EVENT];
