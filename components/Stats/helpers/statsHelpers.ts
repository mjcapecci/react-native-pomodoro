const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
