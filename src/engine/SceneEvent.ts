export const SCENE_EVENT = {
  None: 0,
  GameOver: 1,
  PauseGame: 2,
} as const;

export type SceneEvent = (typeof SCENE_EVENT)[keyof typeof SCENE_EVENT];
