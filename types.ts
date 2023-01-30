export interface UserRecord {
  id: string
  date: number
  type: RoundData['roundType']
  completed: 0 | 1
}

export type AddRecordProps = Omit<UserRecord, 'id'>

export enum RoundType {
  Work = 'work',
  ShortBreak = 'short_break',
  LongBreak = 'long_break',
  Invalid = 'invalid_round_number',
}

export enum TimerRoundSeconds {
  Work = 1501,
  ShortBreak = 301,
  LongBreak = 1201,
}

export enum TimerLoadingText {
  Work = 'Loading work round...',
  ShortBreak = 'Loading break round...',
  LongBreak = 'Loading long break...',
  Invalid = 'invalid_round_number',
}

export enum TimerRoundString {
  Work = '25:00',
  ShortBreak = '5:00',
  LongBreak = '20:00',
  Invalid = 'invalid_round_number',
}

export enum ColorType {
  Cyan = 'cyan',
  Gold = 'gold',
  Grey = 'grey',
}

export interface RoundData {
  date: number
  roundNumber: number
  roundType: RoundType
}
