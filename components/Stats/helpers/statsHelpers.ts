import { RoundType, UserRecord } from '../../../types'

export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getWeekday = (date: number): string => {
  return weekdays[new Date(date * 1000).getDay()]
}

export const getWeekdayOrder = (date: number): string[] => {
  const startDay = getWeekday(date)
  let currentDayIndex = weekdays.indexOf(startDay)
  const weekdayOrder = []
  for (let i = 1; i < 7; i++) {
    if (i === 1) {
      currentDayIndex = currentDayIndex === 6 ? 0 : currentDayIndex + 1
    }

    weekdayOrder.push(weekdays[currentDayIndex])
    currentDayIndex = currentDayIndex === 6 ? 0 : currentDayIndex + 1
  }

  weekdayOrder.push(startDay)

  return weekdayOrder
}

export const getBaseDayMilliseconds = (date: number): number => {
  return new Date(date * 1000).setHours(0, 0, 0, 0)
}

export const getSevenDaysAgo = (date: number): number => {
  return getBaseDayMilliseconds(date / 1000 - 604800)
}

export const getHoursFromSeconds = (seconds: number): number => {
  return seconds / 3600
}

export const getMappedDayIndex = (daysOver: number): number => {
  return Math.floor(daysOver / 1000)
}

export const getWorkTimePerDay = (records: UserRecord[], date: number): number[] => {
  const workTimePerDay = [0, 0, 0, 0, 0, 0, 0]

  const sevenDaysAgo = getSevenDaysAgo(date)

  records.forEach((record) => {
    if (record.completed === 1 && record.type === RoundType.Work) {
      let dayIndex = getMappedDayIndex(Math.floor((record.date - sevenDaysAgo) / 86400))

      if (dayIndex !== 0) {
        dayIndex = dayIndex - 1
      }

      workTimePerDay[dayIndex] += 1500
    }
  })

  return workTimePerDay.map((seconds) => getHoursFromSeconds(seconds))
}
