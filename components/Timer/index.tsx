import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';
import { Heading, Box, Button } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  scheduleNotification,
  cancelAllNotifications,
} from '../Notifications/notificationManager';
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
  const [startButtonEnabled, setStartButtonEnabled] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [roundNumber, setRoundNumber] = useState(-1);
  const [roundType, setRoundType] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(1500);

  const debugMode = false;

  useEffect(() => {
    if (!timerActive) {
      advanceRound();
    }
  }, [timerActive]);

  useEffect(() => {
    if (enabled) {
      setTimeout(() => {
        setStartButtonEnabled(true);
      }, 1000);
    } else {
      setStartButtonEnabled(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (timerActive && secondsLeft > -1) {
      setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else {
      stopTimer();
      setTimerActive(false);
      setEnabled(false);
    }
  }, [secondsLeft]);

  const advanceRound = () => {
    const nextRound = getNextRound(roundNumber);
    const nextRoundType = getRoundType(nextRound);
    setRoundNumber(nextRound);
    setRoundType(nextRoundType);
    setSecondsLeft(getSecondsReset(nextRoundType));
  };

  const startTimer = async () => {
    const roundData = {
      date: new Date().getTime(),
      roundNumber: roundNumber,
      roundType: roundType,
    };

    await AsyncStorage.setItem('roundData', JSON.stringify(roundData));
    await scheduleNotification(secondsLeft);
  };

  const stopTimer = async () => {
    await AsyncStorage.removeItem('roundData');
    await cancelAllNotifications();
    await setTimeout(() => {
      setSecondsLeft(
        getSecondsReset(getRoundType(getNextRound(roundNumber - 1)))
      );
      setEnabled(true);
    }, 1000);
  };

  const printAsyncStorage = async () => {
    const startTime = await AsyncStorage.getItem('roundData');
    console.log(startTime);
  };

  return enabled ? (
    <View style={styles.container}>
      <Box style={styles.timeHeaderContainer}>
        <Heading style={styles.timeHeader}>
          {timerActive
            ? secondsLeft > 0
              ? fmtMSS(secondsLeft)
              : '0:00'
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
            color={startButtonEnabled ? 'white' : 'grey'}
            size={104}
            onPress={() => {
              if (enabled && startButtonEnabled) {
                setTimerActive(true);
                setSecondsLeft(secondsLeft - 1);
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
      {debugMode && (
        <Button>
          {' '}
          <Ionicons
            name='play-skip-forward-circle'
            color='white'
            size={50}
            onPress={() => printAsyncStorage()}
          ></Ionicons>
        </Button>
      )}
    </View>
  ) : (
    <View style={styles.container}>
      <Box style={styles.timeHeaderContainer}>
        <Heading>Loading...</Heading>
      </Box>
    </View>
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
    fontVariant: ['tabular-nums'],
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
