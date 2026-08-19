export const INPUT_ACTION = {
  Up: 'up',
  Down: 'down',
  Left: 'left',
  Right: 'right',
  Pause: 'pause',
  Confirm: 'confirm',
  Back: 'back',
  Restart: 'restart',
} as const;

export type InputAction = (typeof INPUT_ACTION)[keyof typeof INPUT_ACTION];
