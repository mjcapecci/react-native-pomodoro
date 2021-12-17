import {
  getNextRound,
  getRoundType,
  getIconColor,
  getSecondsReset,
  getNextRoundSecondsDisplay,
  fmtMSS,
  getRoundLoadingText,
} from '../TimerUtils';

// getNextRound
describe('getNextRound returns the appropriate round number...', () => {
  it('returns incremented round', () => {
    expect(getNextRound(3)).toBe(4);
  });
  it('returns round 0', () => {
    expect(getNextRound(5)).toBe(0);
  });
});

// getRoundType
describe('getRoundType returns the appropriate round name...', () => {
  it("round 0, returns 'work'", () => {
    expect(getRoundType(0)).toEqual('work');
  });
  it("round 1, returns 'short_break'", () => {
    expect(getRoundType(1)).toEqual('short_break');
  });
  it("round 2, returns 'work'", () => {
    expect(getRoundType(2)).toEqual('work');
  });
  it("round 3, returns 'short_break'", () => {
    expect(getRoundType(3)).toEqual('short_break');
  });
  it("round 4, returns 'work'", () => {
    expect(getRoundType(4)).toEqual('work');
  });
  it("round 5, returns 'long_break'", () => {
    expect(getRoundType(5)).toEqual('long_break');
  });
  it("invalid round, returns 'invalid_round_number'", () => {
    expect(getRoundType(6)).toEqual('invalid_round_number');
  });
});

// getIconColor
describe('getIconColor returns the appropriate icon color...', () => {
  it('during round, returns cyan', () => {
    expect(getIconColor(0, 0, true)).toBe('cyan');
  });
  it('completed round, returns gold', () => {
    expect(getIconColor(0, 1, false)).toBe('gold');
  });
  it('upcoming round, returns grey', () => {
    expect(getIconColor(0, 0, false)).toBe('grey');
  });
});

// getSecondsReset
describe('getSecondsReset returns the appropriate number of round seconds...', () => {
  it('work round, returns 1500 seconds', () => {
    expect(getSecondsReset('work')).toBe(1500);
  });
  it('short break round, returns 300 seconds', () => {
    expect(getSecondsReset('short_break')).toBe(300);
  });
  it('long break round, returns 1200 seconds', () => {
    expect(getSecondsReset('long_break')).toBe(1200);
  });
  it('default or invalid round, returns 0', () => {
    expect(getSecondsReset('')).toBe(0);
  });
});

// getNextRoundSecondsDisplay
describe('getNextRoundSecondsDisplay returns the appropriate seconds in string format for the next round...', () => {
  it("round 0, returns '25:00'", () => {
    expect(getNextRoundSecondsDisplay(0)).toEqual('25:00');
  });
  it("round 1, returns '5:00", () => {
    expect(getNextRoundSecondsDisplay(1)).toEqual('5:00');
  });
  it("round 2, returns '25:00'", () => {
    expect(getNextRoundSecondsDisplay(2)).toEqual('25:00');
  });
  it("round 3, returns '5:00'", () => {
    expect(getNextRoundSecondsDisplay(3)).toEqual('5:00');
  });
  it("round 4, returns '25:00'", () => {
    expect(getNextRoundSecondsDisplay(4)).toEqual('25:00');
  });
  it("round 5, returns '20:00'", () => {
    expect(getNextRoundSecondsDisplay(5)).toEqual('20:00');
  });
  it("invalid round, returns 'invalid_round_number'", () => {
    expect(getNextRoundSecondsDisplay(6)).toEqual('invalid_round_number');
  });
});

// getRoundLoadingText
describe('getRoundType returns the appropriate round name...', () => {
  it('round 0', () => {
    expect(getRoundLoadingText(0)).toEqual('Loading work round...');
  });
  it('round 1', () => {
    expect(getRoundLoadingText(1)).toEqual('Loading break round...');
  });
  it('round 2', () => {
    expect(getRoundLoadingText(2)).toEqual('Loading work round...');
  });
  it('round 3', () => {
    expect(getRoundLoadingText(3)).toEqual('Loading break round...');
  });
  it('round 4', () => {
    expect(getRoundLoadingText(4)).toEqual('Loading work round...');
  });
  it('round 5', () => {
    expect(getRoundLoadingText(5)).toEqual('Loading long break...');
  });
  it('invalid round', () => {
    expect(getRoundLoadingText(6)).toEqual('invalid_round_number');
  });
});

// fmtMSS
describe('fmtMSS returns a seconds number formatted for alarm clock time', () => {
  it("1500 returns '25:00'", () => {
    expect(fmtMSS(1500)).toBe('25:00');
  });
});
