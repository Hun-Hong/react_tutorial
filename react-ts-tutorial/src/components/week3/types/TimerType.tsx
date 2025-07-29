export type TimerState = {
  time: number;
  isRunning: boolean;
  lapTimes: number[];
  startTime: number;
}

export type TimerAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'UPDATE_TIME'}
  | { type: 'ADD_LAP' }
  | { type: 'REMOVE_LAP'}
