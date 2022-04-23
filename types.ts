/**
 * A user record that is recorded at the end of a Pomodoro session and saved in the SQLite database.
 *
 * @interface UserRecord
 * @id {Number} Unique ID of database record
 * @time {Number} Time in seconds
 * @date {Date} Date of record
 */
export interface UserRecord {
  /** Unique ID of database record */
  id: Number;
  /** Time in seconds */
  time: Number;
  /** Rating, 1-10 */
  date: Number;
}

export interface RoundData {
  date: number;
  roundNumber: number;
  roundType: string;
}
