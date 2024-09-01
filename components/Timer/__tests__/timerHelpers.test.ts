import { RoundType, ColorType, TimerRoundSeconds, TimerRoundString } from '../../../types'
import {
  getNextRound,
  getRoundType,
  getIconColor,
  getSecondsReset,
  getNextRoundSecondsDisplay,
  fmtMSS,
  isTimerRoundSecondsType,
} from '../helpers/timerHelpers'

// getNextRound
describe('getNextRound returns the appropriate round number...', () => {
  it('returns incremented round', () => {
    expect(getNextRound(3)).toBe(4)
  })
  it('returns round 0', () => {
    expect(getNextRound(5)).toBe(0)
  })
})

// getRoundType
describe('getRoundType returns the appropriate round name...', () => {
  it('round 0, returns "work"', () => {
    expect(getRoundType(0)).toEqual(RoundType.Work)
  })
  it('round 1, returns short_break', () => {
    expect(getRoundType(1)).toEqual(RoundType.ShortBreak)
  })
  it('round 2, returns work', () => {
    expect(getRoundType(2)).toEqual(RoundType.Work)
  })
  it('round 3, returns short_break', () => {
    expect(getRoundType(3)).toEqual(RoundType.ShortBreak)
  })
  it('round 4, returns work', () => {
    expect(getRoundType(4)).toEqual(RoundType.Work)
  })
  it('round 5, returns long_break', () => {
    expect(getRoundType(5)).toEqual(RoundType.LongBreak)
  })
  it('invalid round, returns invalid_round_number', () => {
    expect(getRoundType(6)).toEqual(RoundType.Invalid)
  })
})

// getIconColor
describe('getIconColor returns the appropriate icon color...', () => {
  it('during round, returns cyan', () => {
    expect(getIconColor(0, 0, true)).toBe(ColorType.Cyan)
  })
  it('completed round, returns gold', () => {
    expect(getIconColor(0, 1, false)).toBe(ColorType.Gold)
  })
  it('upcoming round, returns grey', () => {
    expect(getIconColor(0, 0, false)).toBe(ColorType.Grey)
  })
})

// getSecondsReset
describe('getSecondsReset returns the appropriate number of round seconds...', () => {
  it('work round, returns 1500 seconds', () => {
    expect(getSecondsReset(RoundType.Work)).toBe(TimerRoundSeconds.Work)
  })
  it('short break round, returns 300 seconds', () => {
    expect(getSecondsReset(RoundType.ShortBreak)).toBe(TimerRoundSeconds.ShortBreak)
  })
  it('long break round, returns 1200 seconds', () => {
    expect(getSecondsReset(RoundType.LongBreak)).toBe(TimerRoundSeconds.LongBreak)
  })
  it('default or invalid round, returns 0', () => {
    expect(getSecondsReset(RoundType.Invalid)).toBe(0)
  })
})

// getNextRoundSecondsDisplay
describe('getNextRoundSecondsDisplay returns the appropriate seconds in string format for the next round...', () => {
  it('round 0, returns 25:00', () => {
    expect(getNextRoundSecondsDisplay(0)).toEqual(TimerRoundString.Work)
  })
  it('round 1, returns 5:00', () => {
    expect(getNextRoundSecondsDisplay(1)).toEqual(TimerRoundString.ShortBreak)
  })
  it('round 2, returns 25:00', () => {
    expect(getNextRoundSecondsDisplay(2)).toEqual(TimerRoundString.Work)
  })
  it('round 3, returns 5:00', () => {
    expect(getNextRoundSecondsDisplay(3)).toEqual(TimerRoundString.ShortBreak)
  })
  it('round 4, returns 25:00', () => {
    expect(getNextRoundSecondsDisplay(4)).toEqual(TimerRoundString.Work)
  })
  it('round 5, returns 20:00', () => {
    expect(getNextRoundSecondsDisplay(5)).toEqual(TimerRoundString.LongBreak)
  })
  it('invalid round, returns invalid_round_number', () => {
    expect(getNextRoundSecondsDisplay(6)).toEqual(TimerRoundString.Invalid)
  })
})

// fmtMSS
describe('fmtMSS returns a seconds number formatted for alarm clock time', () => {
  it("1500 returns '25:00'", () => {
    expect(fmtMSS(1500)).toBe('25:00')
  })
  it("45 returns '0:45'", () => {
    expect(fmtMSS(45)).toBe('0:45')
  })
  it("0 returns '0:00'", () => {
    expect(fmtMSS(0)).toBe('0:00')
  })
})

// isTimerRoundSecondsType
describe('isTimerRoundSecondsType returns the correct boolean value', () => {
  it('returns true for work round', () => {
    expect(isTimerRoundSecondsType(TimerRoundSeconds.Work)).toBe(true)
  })
  it('returns true for short break round', () => {
    expect(isTimerRoundSecondsType(TimerRoundSeconds.ShortBreak)).toBe(true)
  })
  it('returns true for long break round', () => {
    expect(isTimerRoundSecondsType(TimerRoundSeconds.LongBreak)).toBe(true)
  })
  it('returns false for invalid round', () => {
    expect(isTimerRoundSecondsType(0)).toBe(false)
  })
  it('returns false for random number', () => {
    expect(isTimerRoundSecondsType(356)).toBe(false)
  })
})
