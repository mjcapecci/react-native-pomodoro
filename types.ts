/**
 * A user record that is recorded at the end of a Pomodoro session and saved in the SQLite database.
 *
 * @interface UserRecord
 * @id {String} Unique ID (guid) of database record
 * @date {Number} Date of record (starting date in epoch time)
 * @roundType {RoundData['roundType']} Type of round (Work, Short Break, Long Break)
 */
export interface UserRecord {
  id: String;
  date: Number;
  roundType: RoundData['roundType'];
  completed: Boolean;
}

export enum RoundType {
  Work = 'work',
  ShortBreak = 'short_break',
  LongBreak = 'long_break',
  Invalid = 'invalid_round_number',
}

export enum TimerRoundSeconds {
  Work = 1500,
  ShortBreak = 300,
  LongBreak = 1200,
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
  date: number;
  roundNumber: number;
  roundType: RoundType;
}
