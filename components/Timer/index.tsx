import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './Timer.style';

import {
  fmtMSS,
  getIconColor,
  getNextRoundSecondsDisplay,
  getRoundLoadingText,
} from '../../utils/TimerUtils';
import { TimerContext } from './TimerContextProvider';

const Timer = ({ test }: any) => {
  const time = useContext(TimerContext);

  const activeTimerComponent = (
    <Text style={styles.timeHeader}>
      {time.timerActive
        ? time.secondsLeft > 0
          ? fmtMSS(time.secondsLeft)
          : '0:00'
        : getNextRoundSecondsDisplay(time.roundNumber)}
    </Text>
  );

  const idleTimerComponent = <Text style={styles.timeHeader}>...</Text>;

  return time.enabled || test ? (
    <View style={styles.container} testID={'play-button'}>
      <View style={styles.timeHeaderContainer}>
        {time.appStateVisible ? activeTimerComponent : idleTimerComponent}
      </View>
      <View style={styles.starContainer}>
        <Ionicons
          name='hammer'
          color={getIconColor(0, time.roundNumber, time.timerActive)}
          size={24}
          style={styles.star}
        />
        <Ionicons
          name='walk'
          color={getIconColor(1, time.roundNumber, time.timerActive)}
          size={24}
          style={styles.star}
        />
        <Ionicons
          name='hammer'
          color={getIconColor(2, time.roundNumber, time.timerActive)}
          size={24}
          style={styles.star}
        />
        <Ionicons
          name='walk'
          color={getIconColor(3, time.roundNumber, time.timerActive)}
          size={24}
          style={styles.star}
        />
        <Ionicons
          name='hammer'
          color={getIconColor(4, time.roundNumber, time.timerActive)}
          size={24}
          style={styles.star}
        />
        <Ionicons
          name='pizza'
          color={getIconColor(5, time.roundNumber, time.timerActive)}
          size={24}
          style={styles.star}
        />
      </View>
      <View style={styles.actionButton}>
        {!time.timerActive ? (
          <Ionicons
            name='play-circle-outline'
            color={time.startButtonEnabled ? 'white' : 'grey'}
            size={104}
            onPress={() => time.startRound()}
          ></Ionicons>
        ) : (
          <Ionicons
            name='stop-circle-outline'
            color='white'
            size={104}
            onPress={() => time.stopRound()}
          ></Ionicons>
        )}
      </View>
      <Button style={!time.timerActive ? styles.skipButton : styles.hideSkip}>
        {' '}
        <Ionicons
          name='play-skip-forward-circle'
          color='white'
          size={50}
          onPress={() => time.advanceRound()}
          testID='test'
        ></Ionicons>
      </Button>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.timeHeaderContainer}>
        <Text style={styles.loadingCaption}>
          {getRoundLoadingText(time.roundNumber)}
        </Text>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    </View>
  );
};

export default Timer;
