export const getNextRound = (roundNum: number) => {
  if (roundNum <= 4) {
    return roundNum + 1;
  } else {
    return 0;
  }
};

export const getRoundType = (roundNumber: number) => {
  switch (roundNumber) {
    case 0:
      return 'work';
    case 1:
      return 'short_break';
    case 2:
      return 'work';
    case 3:
      return 'short_break';
    case 4:
      return 'work';
    case 5:
      return 'long_break';
    default:
      return 'invalid_round_number';
  }
};

export const getIconColor = (
  iconId: number,
  roundNumber: number,
  timerActive: boolean
) => {
  if (iconId === roundNumber && timerActive) {
    return 'cyan';
  } else if (iconId < roundNumber) {
    return 'gold';
  } else {
    return 'grey';
  }
};

export const getSecondsReset = (roundType: string): number => {
  switch (roundType) {
    case 'work':
      return 1500;
    case 'short_break':
      return 300;
    case 'long_break':
      return 1200;
    default:
      return 0;
  }
};

export const getNextRoundSecondsDisplay = (roundNumber: number) => {
  switch (roundNumber) {
    case 0:
      return '25:00';
    case 1:
      return '5:00';
    case 2:
      return '25:00';
    case 3:
      return '5:00';
    case 4:
      return '25:00';
    case 5:
      return '20:00';
    default:
      return 'invalid_round_number';
  }
};

export const fmtMSS = (s: number) => {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
};
