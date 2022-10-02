export const activeRound = {
  enabled: true,
  startButtonEnabled: true,
  timerActive: true,
  roundNumber: 0,
  roundType: 'work',
  secondsLeft: 1500,
  appStateVisible: true,
  advanceRound: () => null,
  startRound: () => null,
  stopRound: () => null,
};

export const inactiveRound = {
  enabled: true,
  startButtonEnabled: true,
  timerActive: false,
  roundNumber: -1,
  roundType: 'work',
  secondsLeft: 1500,
  appStateVisible: true,
  advanceRound: () => null,
  startRound: () => null,
  stopRound: () => null,
};
