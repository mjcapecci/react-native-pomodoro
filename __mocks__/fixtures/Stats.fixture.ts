import { RoundType, UserRecord } from '../../types'

export const testRecordsAllOneday: UserRecord[] = [
  {
    id: '1',
    completed: 1,
    date: 1665403200000,
    type: RoundType.Work,
  },
  {
    id: '2',
    completed: 1,
    date: 1665403200000,
    type: RoundType.ShortBreak,
  },
  {
    id: '3',
    completed: 1,
    date: 1665403200000,
    type: RoundType.LongBreak,
  },
  {
    id: '4',
    completed: 1,
    date: 1665403200000,
    type: RoundType.Work,
  },
  {
    id: '5',
    completed: 0,
    date: 1665403200000,
    type: RoundType.Work,
  },
]

export const testRecordsWithDifferentDays: UserRecord[] = [
  { id: '6', completed: 1, date: 1665489600000, type: RoundType.Work },
  { id: '7', completed: 1, date: 1665403200000, type: RoundType.Work },
  { id: '9', completed: 1, date: 1665316800000, type: RoundType.Work },
  { id: '10', completed: 1, date: 1665230400000, type: RoundType.Work },
  { id: '11', completed: 1, date: 1665230400000, type: RoundType.Work },
  { id: '12', completed: 1, date: 1665144000000, type: RoundType.Work },
  { id: '13', completed: 1, date: 1665057600000, type: RoundType.Work },
  { id: '14', completed: 1, date: 1664971200000, type: RoundType.Work },
  { id: '15', completed: 1, date: 1664971200000, type: RoundType.Work },
  { id: '16', completed: 1, date: 1664971200000, type: RoundType.Work },
]
