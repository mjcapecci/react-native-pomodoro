import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoundData } from '../types';
import { getSecondsReset } from './TimerUtils';

export default async function getTimeRemaining() {
  const roundData: RoundData = JSON.parse(
    (await AsyncStorage.getItem('roundData')) ?? ''
  );
  const startTime = roundData.date;
  const currentTime = new Date().getTime();
  return (
    getSecondsReset(roundData.roundType) -
    getMillisecondsInSeconds(getUnixTimeDifference(startTime, currentTime)) -
    2
  );
}

function getUnixTimeDifference(startTime: number, currentTime: number) {
  return currentTime - startTime;
}

function getMillisecondsInSeconds(milliseconds: number) {
  return Math.floor(milliseconds / 1000);
}
