import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading, Box, Button } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  fmtMSS,
  getIconColor,
  getNextRound,
  getNextRoundSecondsDisplay,
  getRoundType,
  getSecondsReset,
} from '../../utils/TimerUtils';

const Timer = () => {
  const [enabled, setEnabled] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [roundNumber, setRoundNumber] = useState(-1);
  const [roundType, setRoundType] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(1500);

  useEffect(() => {
    if (!timerActive) {
      advanceRound();
    }
  }, [timerActive]);

  useEffect(() => {
    if (timerActive && secondsLeft > 0) {
      setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else {
      setTimerActive(false);
      setEnabled(false);
      stopTimer();
    }
  }, [secondsLeft]);

  const advanceRound = () => {
    const nextRound = getNextRound(roundNumber);
    const nextRoundType = getRoundType(nextRound);
    setRoundNumber(nextRound);
    setRoundType(nextRoundType);
    setSecondsLeft(getSecondsReset(nextRoundType));
  };

  const startTimer = () => {
    setSecondsLeft(secondsLeft - 1);
  };

  const stopTimer = async () => {
    await setTimeout(() => {
      setSecondsLeft(
        getSecondsReset(getRoundType(getNextRound(roundNumber - 1)))
      );
      setEnabled(true);
    }, 1000);
  };

  return (
    enabled && (
      <View style={styles.container}>
        <Box style={styles.timeHeaderContainer}>
          <Heading style={styles.timeHeader}>
            {timerActive
              ? fmtMSS(secondsLeft)
              : getNextRoundSecondsDisplay(roundNumber)}
          </Heading>
        </Box>
        <Box style={styles.starContainer}>
          <Ionicons
            name='hammer'
            color={getIconColor(0, roundNumber, timerActive)}
            size={24}
            style={styles.star}
          />
          <Ionicons
            name='walk'
            color={getIconColor(1, roundNumber, timerActive)}
            size={24}
            style={styles.star}
          />
          <Ionicons
            name='hammer'
            color={getIconColor(2, roundNumber, timerActive)}
            size={24}
            style={styles.star}
          />
          <Ionicons
            name='walk'
            color={getIconColor(3, roundNumber, timerActive)}
            size={24}
            style={styles.star}
          />
          <Ionicons
            name='hammer'
            color={getIconColor(4, roundNumber, timerActive)}
            size={24}
            style={styles.star}
          />
          <Ionicons
            name='pizza'
            color={getIconColor(5, roundNumber, timerActive)}
            size={24}
            style={styles.star}
          />
        </Box>
        <Box style={styles.actionButton}>
          {!timerActive ? (
            <Ionicons
              name='play-circle-outline'
              color='white'
              size={104}
              onPress={() => {
                if (enabled) {
                  setTimerActive(true);
                  startTimer();
                }
              }}
            ></Ionicons>
          ) : (
            <Ionicons
              name='stop-circle-outline'
              color='white'
              size={104}
              onPress={() => {
                setTimerActive(false);
                setEnabled(false);
                stopTimer();
              }}
            ></Ionicons>
          )}
        </Box>
        <Button style={!timerActive ? styles.skipButton : styles.hideSkip}>
          {' '}
          <Ionicons
            name='play-skip-forward-circle'
            color='white'
            size={50}
            onPress={() => advanceRound()}
          ></Ionicons>
        </Button>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  timeHeaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeHeader: {
    fontSize: 84,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'left',
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  star: {
    margin: 3,
  },
  actionButton: {
    marginTop: 60,
  },
  skipButton: {
    marginTop: 30,
    backgroundColor: '#000',
  },
  hideSkip: {
    display: 'none',
  },
});

export default Timer;
