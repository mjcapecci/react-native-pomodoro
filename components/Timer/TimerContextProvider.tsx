import React, { createContext, useEffect, useState } from 'react';
import {
  getNextRound,
  getRoundType,
  getSecondsReset,
} from './helpers/timerHelpers';
import {
  scheduleNotification,
  cancelAllNotifications,
} from '../Notifications/notificationManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';
import getTimeRemaining, { getRoundData } from './helpers/getTimeRemaining';
import { RoundData, RoundType } from '../../types';
import addRecord from '../../data_layer/addRecord';
import shouldAddRecord from './helpers/shouldAddRecord';

export interface TimerContextProps {
  enabled: boolean;
  startButtonEnabled: boolean;
  timerActive: boolean;
  roundNumber: number;
  roundType: string;
  secondsLeft: number;
  appStateVisible: boolean;
  advanceRound: () => void;
  startRound: () => void;
  stopRound: () => void;
}

const TimerContext = createContext<TimerContextProps>({
  enabled: true,
  startButtonEnabled: true,
  timerActive: false,
  roundNumber: -1,
  roundType: 'work',
  secondsLeft: 1500,
  appStateVisible: true,
  advanceRound: () => null,
  startRound: () => null,
  stopRound: () => null,
});

interface TimerContextProviderProps {
  children: JSX.Element;
}

function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [enabled, setEnabled] = useState(true);
  const [startButtonEnabled, setStartButtonEnabled] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [roundNumber, setRoundNumber] = useState(-1);
  const [roundType, setRoundType] = useState<RoundType>(RoundType.Work);
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [appStateVisible, setAppStateVisible] = useState(true);

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
        setSecondsLeft((await fetchTime()) ?? secondsLeft);
      }, 1000);
    } else {
      stopTimer();
      setTimerActive(false);
      setEnabled(false);
    }
  }, [secondsLeft]);

  // Triggered by the useEffect that runs when app state changes
  async function handleAppStateChange(nextAppState: AppStateStatus) {
    if (nextAppState === 'active') {
      if (!appStateVisible) {
        return setTimeout(async () => {
          setSecondsLeft((await getTimeRemaining()) ?? secondsLeft);
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
      subscription.remove();
    };
  }, [AppState.currentState]);

  // ----- TIMER CONTROL METHODS -----
  const advanceRound = () => {
    const nextRound = getNextRound(roundNumber);
    const nextRoundType = getRoundType(nextRound);
    setRoundNumber(nextRound);
    setRoundType(nextRoundType);
    setSecondsLeft(getSecondsReset(nextRoundType));
  };

  const startTimer = async () => {
    const roundData: RoundData = {
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

  const stopRound = () => {
    setTimerActive(false);
    setEnabled(false);
    stopTimer();
  };

  const stopTimer = async () => {
    const roundData: RoundData | undefined = await getRoundData();
    if (await shouldAddRecord(roundData?.date ?? 0)) {
      await addRecord({
        date: roundData?.date ?? 0,
        roundType: roundData?.roundType ?? RoundType.Work,
        completed: secondsLeft < 0 ? 1 : 0,
      });
    }

    await AsyncStorage.removeItem('roundData');
    await cancelAllNotifications();
    await setTimeout(() => {
      setSecondsLeft(
        getSecondsReset(getRoundType(getNextRound(roundNumber - 1)))
      );
      setEnabled(true);
    }, 1000);
  };

  return (
    <TimerContext.Provider
      value={{
        enabled,
        startButtonEnabled,
        timerActive,
        roundNumber,
        roundType,
        secondsLeft,
        appStateVisible,
        advanceRound,
        startRound,
        stopRound,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext, TimerContextProvider };
