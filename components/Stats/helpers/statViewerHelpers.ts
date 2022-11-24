// getTotalWorkTime

import { RoundType, UserRecord } from '../../../types'

// completed = 1 and type = work
export const getTotalWorkTime = (records: UserRecord[]): string => {
  const workRecords = records.filter(
    (record) => record.completed === 1 && record.type === RoundType.Work,
  )

  return ((workRecords.length * 25) / 60).toFixed(2)
}

// getTotalBreakTime
export const getTotalBreakTime = (records: UserRecord[]): string => {
  let shortBreaks = 0
  let longBreaks = 0

  records.forEach((record) => {
    if (record.completed === 1 && record.type === RoundType.ShortBreak) {
      shortBreaks += 1
    } else if (record.completed === 1 && record.type === RoundType.LongBreak) {
      longBreaks += 1
    }
  })

  return ((shortBreaks * 5 + longBreaks * 20) / 60).toFixed(2)
}

// getAverageWorkTime
export const getAverageWorkTime = (records: UserRecord[]): string => {
  const totalWorkTime = getTotalWorkTime(records)
  return (+totalWorkTime / 7).toFixed(2)
}

// getTotalSkips
export const getTotalSkips = (records: UserRecord[]): string => {
  return records.filter((record) => record.completed === 0).length.toString()
}
