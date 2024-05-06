import { ColorType, RoundType, TimerRoundSeconds, TimerRoundString } from '../../../types'

export const getNextRound = (roundNumber: number): number => {
  if (roundNumber <= 4) {
    return roundNumber + 1
  } else {
    return 0
  }
}

export const getRoundType = (roundNumber: number): RoundType => {
  switch (roundNumber) {
    case 0:
      return RoundType.Work
    case 1:
      return RoundType.ShortBreak
    case 2:
      return RoundType.Work
    case 3:
      return RoundType.ShortBreak
    case 4:
      return RoundType.Work
    case 5:
      return RoundType.LongBreak
    default:
      return RoundType.Invalid
  }
}

export const getIconColor = (
  iconId: number,
  roundNumber: number,
  timerActive: boolean,
): ColorType => {
  if (iconId === roundNumber && timerActive) {
    return ColorType.Cyan
  } else if (iconId < roundNumber) {
    return ColorType.Gold
  } else {
    return ColorType.Grey
  }
}

export const getSecondsReset = (roundType: RoundType): number => {
  switch (roundType) {
    case RoundType.Work:
      return TimerRoundSeconds.Work
    case RoundType.ShortBreak:
      return TimerRoundSeconds.ShortBreak
    case RoundType.LongBreak:
      return TimerRoundSeconds.LongBreak
    default:
      return 0
  }
}

export const getNextRoundSecondsDisplay = (roundNumber: number): TimerRoundString => {
  switch (roundNumber) {
    case 0:
      return TimerRoundString.Work
    case 1:
      return TimerRoundString.ShortBreak
    case 2:
      return TimerRoundString.Work
    case 3:
      return TimerRoundString.ShortBreak
    case 4:
      return TimerRoundString.Work
    case 5:
      return TimerRoundString.LongBreak
    default:
      return TimerRoundString.Invalid
  }
}

export const getRoundLoadingText = (roundNumber: number): string => {
  return ''
}

export const fmtMSS = (s: number): string => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s
}

export const isTimerRoundSecondsType = (seconds: number): seconds is TimerRoundSeconds => {
  return Object.values(TimerRoundSeconds).includes(seconds)
}
