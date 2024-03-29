const baseTimerContextValues = {
  enabled: true,
  startButtonEnabled: true,
  timerActive: false,
  roundNumber: 0,
  roundType: 'work',
  secondsLeft: 1500,
  appStateVisible: true,
  advanceRound: () => null,
  startRound: () => null,
  stopRound: () => null,
  showConfirmationModal: false,
  setShowConfirmationModal: () => null,
  showReverseModal: false,
  setShowReverseModal: () => null,
  lastUserRecord: undefined,
  reversePreviousRecord: async () => null,
}

export const disabledTimer = {
  ...baseTimerContextValues,
  enabled: false,
  roundNumber: 0,
}

export const activeRound = {
  ...baseTimerContextValues,
  timerActive: true,
}

export const inactiveRound = {
  ...baseTimerContextValues,
}

export const visibleState = {
  ...baseTimerContextValues,
}

export const invisibleState = {
  ...baseTimerContextValues,
  appStateVisible: false,
}
