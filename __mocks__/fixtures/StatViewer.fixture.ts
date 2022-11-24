import { RoundType, UserRecord } from '../../types'

export const completedWorkRound: UserRecord = {
  id: '1',
  completed: 1,
  date: Date.now(),
  type: RoundType.Work,
}

export const incompleteWorkRound: UserRecord = {
  id: '2',
  completed: 0,
  date: Date.now(),
  type: RoundType.Work,
}

export const completedShortBreakRound: UserRecord = {
  id: '3',
  completed: 1,
  date: Date.now(),
  type: RoundType.ShortBreak,
}

export const incompleteShortBreakRound: UserRecord = {
  id: '4',
  completed: 0,
  date: Date.now(),
  type: RoundType.ShortBreak,
}

export const completedLongBreakRound: UserRecord = {
  id: '5',
  completed: 1,
  date: Date.now(),
  type: RoundType.LongBreak,
}

export const incompleteLongBreakRound: UserRecord = {
  id: '6',
  completed: 0,
  date: Date.now(),
  type: RoundType.LongBreak,
}
