import React, { createContext, useCallback, useEffect, useState } from 'react'
import { getNextRound, getRoundType, getSecondsReset } from './helpers/timerHelpers'
import { scheduleNotification, cancelAllNotifications } from '../Notifications/notificationManager'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppState, AppStateStatus } from 'react-native'
import getTimeRemaining, { getRoundData } from './helpers/timeRemaining'
import { RoundData, RoundType, UserRecord } from '../../types'
import addRecord from '../../data_layer/addRecord'
import shouldAddRecord from './helpers/shouldAddRecord'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import getMostRecentRecord from '../../data_layer/getMostRecentRecord'
import updateRecordCompletedStatus from '../../data_layer/updateRecordCompletedStatus'
import { useToast } from 'react-native-toast-notifications'
import { debounce, throttle } from 'lodash'

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
  stopRound: (isPreliminarySkip?: boolean) => void
  showConfirmationModal: boolean
  setShowConfirmationModal: (show: boolean) => void
  showReverseModal: boolean
  setShowReverseModal: (show: boolean) => void
  lastUserRecord: UserRecord | undefined
  reversePreviousRecord: (recordId: string) => void
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
  stopRound: (isPreliminarySkip) => null,
  showConfirmationModal: false,
  setShowConfirmationModal: () => null,
  showReverseModal: false,
  setShowReverseModal: () => null,
  lastUserRecord: undefined,
  reversePreviousRecord: async (recordId) => null,
})

interface TimerContextProviderProps {
  children: JSX.Element
}

function TimerContextProvider({ children }: TimerContextProviderProps): JSX.Element {
  // ----- STATE -----
  const [enabled, setEnabled] = useState(true)
  const [startButtonEnabled, setStartButtonEnabled] = useState(true)
  const [timerActive, setTimerActive] = useState(false)
  const [roundNumber, setRoundNumber] = useState(0)
  const [roundType, setRoundType] = useState<RoundType>(RoundType.Work)
  const [secondsLeft, setSecondsLeft] = useState(1500)
  const [appStateVisible, setAppStateVisible] = useState(true)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showReverseModal, setShowReverseModal] = useState(false)
  const [lastUserRecord, setLastUserRecord] = useState<UserRecord | undefined>(undefined)

  const toast = useToast()

  // React Query
  const queryClient = useQueryClient()

  const addRecordMutation = useMutation(addRecord, {
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
    await scheduleNotification(secondsLeft, roundType)
  }
  const startRound = throttle(async (): Promise<void> => {
    if (enabled && startButtonEnabled) {
      setTimerActive(true)
      setSecondsLeft(secondsLeft - 1)
      await startTimer()
    }
  }, 1000)

  const stopRound = throttle(async (isPreliminarySkip?: boolean): Promise<void> => {
    setTimerActive(false)
    setEnabled(false)
    await stopTimer(isPreliminarySkip ?? false)
  }, 500)

  const stopTimer = throttle(async (isPreliminarySkip: boolean): Promise<void> => {
    const roundData: RoundData | undefined = await getRoundData()

    setShowConfirmationModal(false)

    if (timerActive || isPreliminarySkip) {
      advanceRound()
    }

    if (await shouldAddRecord(roundData?.date ?? 0)) {
      await addRecordMutation.mutateAsync({
        date: roundData?.date ?? 0,
        type: roundData?.roundType ?? RoundType.Work,
        completed: secondsLeft < 0 ? 1 : 0,
      })

      await setLastUserRecord(await getMostRecentRecord())
    }

    if (isPreliminarySkip) {
      await addRecordMutation.mutateAsync({
        date: new Date().getTime(),
        type: roundType,
        completed: 0,
      })
    }

    await AsyncStorage.removeItem('roundData')
    await cancelAllNotifications()

    setSecondsLeft(getSecondsReset(getRoundType(getNextRound(roundNumber - 1))))
    setEnabled(true)
  }, 1000)

  function handleReversePreviousRecord(recordId: string): void {
    void updateRecordCompletedStatus(recordId)
    void queryClient.invalidateQueries(['records'])
    if (lastUserRecord != null) {
      setLastUserRecord({ ...lastUserRecord, completed: 0 })
    }
    toast.show('Previous record reversed.', {
      type: 'success',
      duration: 3000,
      placement: 'top',
      animationType: 'slide-in',
    })
  }

  // This effect adds a slight delay to the start button to prevent a known race condition
  useEffect(() => {
    if (enabled) {
      const enableStartButton = throttle(() => {
        setStartButtonEnabled(true)
      }, 1000)
      enableStartButton()
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
      const updateSecondsLeft = debounce(async () => {
        setSecondsLeft((await fetchTime()) ?? secondsLeft)
      }, 1000)
      void updateSecondsLeft()
    } else {
      void (async () => {
        await stopTimer(false)
      })()
      setTimerActive(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft])

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        if (!appStateVisible) {
          setSecondsLeft((await getTimeRemaining()) ?? secondsLeft)
          setAppStateVisible(true)
        }
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
        showReverseModal,
        setShowReverseModal,
        lastUserRecord,
        reversePreviousRecord: handleReversePreviousRecord,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export { TimerContext, TimerContextProvider }
