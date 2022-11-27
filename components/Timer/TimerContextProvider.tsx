import React, { createContext, useCallback, useEffect, useState } from 'react'
import { getNextRound, getRoundType, getSecondsReset } from './helpers/timerHelpers'
import { scheduleNotification, cancelAllNotifications } from '../Notifications/notificationManager'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppState, AppStateStatus } from 'react-native'
import getTimeRemaining, { getRoundData } from './helpers/getTimeRemaining'
import { RoundData, RoundType } from '../../types'
import addRecord from '../../data_layer/addRecord'
import shouldAddRecord from './helpers/shouldAddRecord'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface TimerContextProps {
  enabled: boolean
  startButtonEnabled: boolean
  timerActive: boolean
  roundNumber: number
  roundType: string
  secondsLeft: number
  appStateVisible: boolean
  advanceRound: () => void
  startRound: () => void
  stopRound: () => void
  showConfirmationModal: boolean
  setShowConfirmationModal: (show: boolean) => void
}

const TimerContext = createContext<TimerContextProps>({
  enabled: true,
  startButtonEnabled: true,
  timerActive: false,
  roundNumber: 0,
  roundType: 'work',
  secondsLeft: 1500,
  appStateVisible: true,
  advanceRound: () => null,
  startRound: () => null,
  stopRound: () => null,
  showConfirmationModal: false,
  setShowConfirmationModal: () => null,
})

interface TimerContextProviderProps {
  children: JSX.Element
}

function TimerContextProvider({ children }: TimerContextProviderProps): JSX.Element {
  const [enabled, setEnabled] = useState(true)
  const [startButtonEnabled, setStartButtonEnabled] = useState(true)
  const [timerActive, setTimerActive] = useState(false)
  const [roundNumber, setRoundNumber] = useState(0)
  const [roundType, setRoundType] = useState<RoundType>(RoundType.Work)
  const [secondsLeft, setSecondsLeft] = useState(1500)
  const [appStateVisible, setAppStateVisible] = useState(true)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  // React Query
  const queryClient = useQueryClient()

  const mutation = useMutation(addRecord, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['records'])
    },
  })

  // ----- TIMER CONTROL METHODS -----
  const advanceRound = useCallback((): void => {
    const nextRound = getNextRound(roundNumber)
    const nextRoundType = getRoundType(nextRound)
    setRoundNumber(nextRound)
    setRoundType(nextRoundType)
    setSecondsLeft(getSecondsReset(nextRoundType))
  }, [roundNumber])

  const startTimer = async (): Promise<void> => {
    const roundData: RoundData = {
      date: new Date().getTime(),
      roundNumber,
      roundType,
    }

    await AsyncStorage.setItem('roundData', JSON.stringify(roundData))
    await scheduleNotification(secondsLeft)
  }

  const startRound = async (): Promise<void> => {
    if (enabled && startButtonEnabled) {
      setTimerActive(true)
      setSecondsLeft(secondsLeft - 1)
      await startTimer()
    }
  }

  const stopRound = async (): Promise<void> => {
    setTimerActive(false)
    setEnabled(false)
    await stopTimer()
  }

  const stopTimer = async (): Promise<void> => {
    const roundData: RoundData | undefined = await getRoundData()

    if (timerActive) {
      advanceRound()
    }

    if (await shouldAddRecord(roundData?.date ?? 0)) {
      await mutation.mutateAsync({
        date: roundData?.date ?? 0,
        type: roundData?.roundType ?? RoundType.Work,
        completed: secondsLeft < 0 ? 1 : 0,
      })
    }

    await AsyncStorage.removeItem('roundData')
    await cancelAllNotifications()
    await setTimeout(() => {
      setSecondsLeft(getSecondsReset(getRoundType(getNextRound(roundNumber - 1))))
      setEnabled(true)
    }, 1000)
  }

  // This effect adds a slight delay to the start button to prevent a known race condition
  useEffect(() => {
    if (enabled) {
      setTimeout(() => {
        setStartButtonEnabled(true)
      }, 1000)
    } else {
      setStartButtonEnabled(false)
    }
  }, [enabled])

  // This effect updates the display time every second
  useEffect(() => {
    const fetchTime = async (): Promise<number> => {
      return await getTimeRemaining()
    }

    if (timerActive && secondsLeft > -1) {
      setTimeout(async () => {
        setSecondsLeft((await fetchTime()) ?? secondsLeft)
      }, 1000)
    } else {
      void (async () => {
        await stopTimer()
      })()
      setTimerActive(false)
      setEnabled(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft])

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus): Promise<void> => {
      if (nextAppState === 'active') {
        if (!appStateVisible) {
          setTimeout(async () => {
            setSecondsLeft((await getTimeRemaining()) ?? secondsLeft)
            setAppStateVisible(true)
          }, 1000)
        }
      }

      if (nextAppState === 'inactive' || nextAppState === 'background') {
        return setAppStateVisible(false)
      }
    },
    [appStateVisible, secondsLeft],
  )

  // Detecting changes in AppState
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState) => await handleAppStateChange(nextAppState),
    )

    return () => {
      subscription.remove()
    }
  }, [handleAppStateChange])

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
        showConfirmationModal,
        setShowConfirmationModal,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export { TimerContext, TimerContextProvider }
