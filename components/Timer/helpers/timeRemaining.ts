import AsyncStorage from '@react-native-async-storage/async-storage'
import { RoundData } from '../../../types'
import { getSecondsReset } from './timerHelpers'

export default async function getTimeRemaining(currentSecondsLeft?: number): Promise<number> {
  const roundData: RoundData = JSON.parse((await AsyncStorage.getItem('roundData')) ?? '""')
  const startTime = roundData.date
  const currentTime = new Date().getTime()
  const secondsLeft =
    getSecondsReset(roundData.roundType) -
    getMillisecondsInSeconds(getUnixTimeDifference(startTime, currentTime)) -
    1

  try {
    if (currentSecondsLeft != null && currentSecondsLeft < secondsLeft) {
      return currentSecondsLeft
    } else {
      return secondsLeft
    }
  } catch (error) {
    // round was manually canceled if this block is hit
    console.log(error)
  }

  return secondsLeft
}

export const getRoundData = async (): Promise<RoundData | undefined> => {
  try {
    const roundData: RoundData = JSON.parse((await AsyncStorage.getItem('roundData')) ?? ' " "')
    return roundData
  } catch (error) {
    console.log(error)
  }
}

export function getUnixTimeDifference(startTime: number, currentTime: number): number {
  return currentTime - startTime
}

export function getMillisecondsInSeconds(milliseconds: number): number {
  return Math.floor(milliseconds / 1000)
}
