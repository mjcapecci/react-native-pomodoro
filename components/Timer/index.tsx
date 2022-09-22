import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
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
  getRoundLoadingText,
  getRoundType,
  getSecondsReset,
} from '../../utils/TimerUtils';
import getTimeRemaining from '../../utils/getTimeRemaining';

const Timer = ({ test }: any) => {
  const [enabled, setEnabled] = useState(true);
  const [startButtonEnabled, setStartButtonEnabled] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [roundNumber, setRoundNumber] = useState(-1);
  const [roundType, setRoundType] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [appStateVisible, setAppStateVisible] = useState(true);

  const debugMode = false;

  // When the timer status changes, this effect advances the round number.
  useEffect(() => {
    if (!timerActive) {
      advanceRound();
    }
  }, [timerActive]);

  // This effect adds a slight delay to the start button to prevent a known race condition
  useEffect(() => {
    if (enabled) {
      setTimeout(() => {
        setStartButtonEnabled(true);
      }, 1000);
    } else {
      setStartButtonEnabled(false);
    }
  }, [enabled]);

  // This effect updates the display time every second
  useEffect(() => {
    const fetchTime = async () => {
      return await getTimeRemaining();
    };

    if (timerActive && secondsLeft > -1) {
      setTimeout(async () => {
        setSecondsLeft(await fetchTime());
      }, 1000);
    } else {
      stopTimer();
      setTimerActive(false);
      setEnabled(false);
    }
  }, [secondsLeft]);

  async function handleAppStateChange(nextAppState: AppStateStatus) {
    if (nextAppState === 'active') {
      if (!appStateVisible) {
        return setTimeout(async () => {
          setSecondsLeft(await getTimeRemaining());
          setAppStateVisible(true);
        }, 1000);
      }
    }

    if (nextAppState === 'inactive' || nextAppState === 'background') {
      return setAppStateVisible(false);
    }
  }

  // Detecting changes in AppState
  useEffect(() => {
    let subscription = AppState.addEventListener('change', (nextAppState) =>
      handleAppStateChange(nextAppState)
    );

    return () => {
      subscription = AppState.removeEventListener('change', (nextAppState) =>
        handleAppStateChange(nextAppState)
      );
    };
  }, [AppState.currentState]);

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

  const startRound = () => {
    if (enabled && startButtonEnabled) {
      setTimerActive(true);
      setSecondsLeft(secondsLeft - 1);
      startTimer();
    }
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

  const activeTimerComponent = (
    <Text style={styles.timeHeader}>
      {timerActive
        ? secondsLeft > 0
          ? fmtMSS(secondsLeft)
          : '0:00'
        : getNextRoundSecondsDisplay(roundNumber)}
    </Text>
  );

  const idleTimerComponent = <Text style={styles.timeHeader}>...</Text>;

  return enabled || test ? (
    <View style={styles.container} testID={'play-button'}>
      <View style={styles.timeHeaderContainer}>
        {appStateVisible ? activeTimerComponent : idleTimerComponent}
      </View>
      <View style={styles.starContainer}>
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
      </View>
      <View style={styles.actionButton}>
        {!timerActive ? (
          <Ionicons
            name='play-circle-outline'
            color={startButtonEnabled ? 'white' : 'grey'}
            size={104}
            onPress={startRound}
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
      </View>
      <Button style={!timerActive ? styles.skipButton : styles.hideSkip}>
        {' '}
        <Ionicons
          name='play-skip-forward-circle'
          color='white'
          size={50}
          onPress={() => advanceRound()}
          testID='test'
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
      <View style={styles.timeHeaderContainer}>
        <Text style={styles.loadingCaption}>
          {getRoundLoadingText(roundNumber)}
        </Text>
        <ActivityIndicator size='large' color='#fff' />
      </View>
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
    height: 100,
  },
  timeHeader: {
    fontSize: 84,
    color: '#fff',
    marginBottom: 5,
    fontVariant: ['tabular-nums'],
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: 'blue',
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
  loadingCaption: {
    color: '#fff',
    marginBottom: 25,
    fontSize: 24,
  },
});

export default Timer;
