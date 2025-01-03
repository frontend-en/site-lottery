export const WHEEL_ANIMATION_SPEED = {
  FAST: '0.8s',
  SLOW: '2s',
  NONE: '0s'
} as const;

export const WHEEL_ANIMATION_DURATION = {
  SLOW_START: 3000, // 3 seconds
  TOTAL: 5000 // 5 seconds
} as const;

export type SpinSpeed = keyof typeof WHEEL_ANIMATION_SPEED;
