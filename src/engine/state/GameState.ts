export const GAME_STATE = {
  Home: 0,
  Playing: 1,
  Paused: 2,
  GameOver: 3,
} as const;

export type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];
