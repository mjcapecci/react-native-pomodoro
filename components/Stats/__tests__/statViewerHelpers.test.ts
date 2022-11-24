import {
  getAverageWorkTime,
  getTotalBreakTime,
  getTotalSkips,
  getTotalWorkTime,
} from '../helpers/statViewerHelpers'
import {
  completedWorkRound,
  incompleteWorkRound,
  completedShortBreakRound,
  incompleteShortBreakRound,
  completedLongBreakRound,
  incompleteLongBreakRound,
} from '../../../__mocks__/fixtures/StatViewer.fixture'

// getTotalWorkTime
describe('getTotalWorkTime', () => {
  it('should return 0 when no records are passed', () => {
    expect(getTotalWorkTime([])).toBe('0.00')
  })
  it('should return 0 when no work records are passed', () => {
    expect(getTotalWorkTime([completedShortBreakRound])).toBe('0.00')
  })
  it('should return the total work time when work records are passed', () => {
    expect(getTotalWorkTime([completedWorkRound])).toBe('0.42')
  })
  it('should return the total work time when multiple work records are passed', () => {
    expect(getTotalWorkTime([completedWorkRound, completedWorkRound])).toBe('0.83')
  })
  it('should return the total work time when multiple work records are passed and one incomplete is also passed', () => {
    expect(getTotalWorkTime([completedWorkRound, completedWorkRound, incompleteWorkRound])).toBe(
      '0.83',
    )
  })
})

// getTotalBreakTime
describe('getTotalBreakTime', () => {
  it('should return 0 when no records are passed', () => {
    expect(getTotalBreakTime([])).toBe('0.00')
  })
  it('should return 0 when no break records are passed', () => {
    expect(getTotalBreakTime([completedWorkRound])).toBe('0.00')
  })
  it('should return the total break time when break records are passed', () => {
    expect(getTotalBreakTime([completedShortBreakRound])).toBe('0.08')
  })
  it('should return the total break time when multiple short break records are passed', () => {
    expect(getTotalBreakTime([completedShortBreakRound, completedShortBreakRound])).toBe('0.17')
  })
  it('should return the total break time when multiple short break records and one long break record are passed', () => {
    expect(
      getTotalBreakTime([
        completedShortBreakRound,
        completedShortBreakRound,
        completedLongBreakRound,
      ]),
    ).toBe('0.50')
  })
  it('should return the total break time when multiple short break records and one incompleted long break record are passed', () => {
    expect(
      getTotalBreakTime([
        completedShortBreakRound,
        completedShortBreakRound,
        incompleteLongBreakRound,
      ]),
    ).toBe('0.17')
  })
})

// getAverageWorkTime
describe('getAverageWorkTime', () => {
  it('should return 0 when no records are passed', () => {
    expect(getAverageWorkTime([])).toBe('0.00')
  })
  it('should return 0 when no work records are passed', () => {
    expect(getAverageWorkTime([completedShortBreakRound])).toBe('0.00')
  })
  it('should return the average work time when work records are passed', () => {
    expect(getAverageWorkTime([completedWorkRound])).toBe('0.06')
  })
  it('should return the average work time when multiple work records are passed', () => {
    expect(getAverageWorkTime([completedWorkRound, completedWorkRound])).toBe('0.12')
  })
  it('should return the average work time when complete multiple work records and one incomplete work record are passed', () => {
    expect(getAverageWorkTime([completedWorkRound, completedWorkRound, incompleteWorkRound])).toBe(
      '0.12',
    )
  })
})

// getTotalSkips
describe('getTotalSkips', () => {
  it('should return 0 when no records are passed', () => {
    expect(getTotalSkips([])).toBe('0')
  })
  it('should return 0 when no skipped records are passed', () => {
    expect(getTotalSkips([completedWorkRound])).toBe('0')
  })
  it('should return the total skipped records when skipped records are passed', () => {
    expect(getTotalSkips([incompleteWorkRound])).toBe('1')
  })
  it('should return the total skipped records when multiple skipped records are passed', () => {
    expect(getTotalSkips([incompleteWorkRound, incompleteShortBreakRound])).toBe('2')
  })
  it('should return the total skipped records when multiple skipped records and non-skipped records are passed', () => {
    expect(
      getTotalSkips([incompleteWorkRound, incompleteShortBreakRound, completedWorkRound]),
    ).toBe('2')
  })
})
