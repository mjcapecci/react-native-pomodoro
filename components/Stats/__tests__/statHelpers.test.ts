import {
  testRecordsAllOneday,
  testRecordsWithDifferentDays,
} from '../../../__mocks__/fixtures/Stats.fixture'
import {
  getBaseDayMilliseconds,
  getHoursFromSeconds,
  getMappedDayIndex,
  getSevenDaysAgo,
  getWeekday,
  getWeekdayOrder,
  getWorkTimePerDay,
} from '../helpers/statsHelpers'

// getWeekday
describe('getWeekday', () => {
  it('returns the correct weekday', () => {
    expect(getWeekday(1665403200)).toBe('Mon')
    expect(getWeekday(1665489600)).toBe('Tue')
    expect(getWeekday(1665576000)).toBe('Wed')
    expect(getWeekday(1665662400)).toBe('Thu')
    expect(getWeekday(1665748800)).toBe('Fri')
    expect(getWeekday(1665835200)).toBe('Sat')
    expect(getWeekday(1665921600)).toBe('Sun')
  })
})

// getWeekdayOrder
describe('getWeekdayOrder', () => {
  it('returns the correct weekday order', () => {
    expect(getWeekdayOrder(1665403200)).toEqual(['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'])
    expect(getWeekdayOrder(1665489600)).toEqual(['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'])
    expect(getWeekdayOrder(1665576000)).toEqual(['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'])
    expect(getWeekdayOrder(1665662400)).toEqual(['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'])
    expect(getWeekdayOrder(1665748800)).toEqual(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    expect(getWeekdayOrder(1665835200)).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    expect(getWeekdayOrder(1665921600)).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  })
})

// getBaseDayMilliseconds
describe('getBaseDayMilliseconds', () => {
  it('returns the correct base day seconds', () => {
    expect(getBaseDayMilliseconds(1665403200)).toBe(1665378000000)
    expect(getBaseDayMilliseconds(1665489600)).toBe(1665464400000)
    expect(getBaseDayMilliseconds(1665921600)).toBe(1665896400000)
  })
})

// getSevensDaysAgo
describe('getSevensDaysAgo', () => {
  it('returns the correct seconds for seven days ago', () => {
    expect(getSevenDaysAgo(1665403200000)).toBe(1664773200000)
    expect(getSevenDaysAgo(1665489600000)).toBe(1664859600000)
    expect(getSevenDaysAgo(1665921600000)).toBe(1665291600000)
  })
})

// getHoursFromSeconds
describe('getHoursFromSeconds', () => {
  it('returns the correct hours from seconds', () => {
    expect(getHoursFromSeconds(3600)).toBe(1)
    expect(getHoursFromSeconds(4200)).toBe(1.1666666666666667)
    expect(getHoursFromSeconds(7200)).toBe(2)
    expect(getHoursFromSeconds(10800)).toBe(3)
  })
})

// getMappedDayIndex
describe('getMappedDayIndex', () => {
  it('returns the correct index', () => {
    expect(getMappedDayIndex(7231)).toBe(7)
    expect(getMappedDayIndex(6562)).toBe(6)
    expect(getMappedDayIndex(5893)).toBe(5)
    expect(getMappedDayIndex(4224)).toBe(4)
    expect(getMappedDayIndex(3555)).toBe(3)
    expect(getMappedDayIndex(2886)).toBe(2)
    expect(getMappedDayIndex(1217)).toBe(1)
    expect(getMappedDayIndex(547)).toBe(0)
  })
})

// getWorkTimePerDay
describe('getWorkTimePerDay', () => {
  it('returns the correct work time per day', () => {
    expect(getWorkTimePerDay([], 1665403200000)).toEqual([0, 0, 0, 0, 0, 0, 0])
    expect(getWorkTimePerDay(testRecordsAllOneday, 1665403200000)).toEqual([
      0, 0, 0, 0, 0, 0, 0.8333333333333334,
    ])
    expect(getWorkTimePerDay(testRecordsWithDifferentDays, 1665489600000)).toEqual([
      1.25, 0.4166666666666667, 0.4166666666666667, 0.8333333333333334, 0.4166666666666667,
      0.4166666666666667, 0.4166666666666667,
    ])
  })
})
