import React, { useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'

import styles from './Timer.style'

import {
  fmtMSS,
  getIconColor,
  getNextRoundSecondsDisplay,
  getRoundLoadingText,
} from './helpers/timerHelpers'
import { TimerContext } from './TimerContextProvider'
import ConfirmationModal from './ConfirmationModal'
import ReversePreviousModal from './ReversePreviousModal'

const Timer = (): JSX.Element => {
  const time = useContext(TimerContext)

  const activeTimerComponent = (
    <Text style={styles.timeHeader} testID={'active-time-header'}>
      {time.timerActive
        ? time.secondsLeft > 0
          ? fmtMSS(time.secondsLeft)
          : '0:00'
        : getNextRoundSecondsDisplay(time.roundNumber)}
    </Text>
  )

  const idleTimerComponent = (
    <Text style={styles.timeHeader} testID={'idle-time-header'}>
      ...
    </Text>
  )

  return time.enabled ? (
    <>
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
        <Button
          style={styles.actionButton}
          onPress={() => {
            !time.timerActive ? time.startRound() : time.setShowConfirmationModal(true)
          }}
          testID={'main-action-button'}
          color='black'
        >
          {!time.timerActive ? (
            <Ionicons
              name='play-circle-outline'
              color={time.startButtonEnabled ? 'white' : 'grey'}
              size={104}
              testID={'play-button-icon'}
            ></Ionicons>
          ) : (
            <Ionicons
              name='stop-circle-outline'
              color='white'
              size={104}
              testID={'stop-button-icon'}
            ></Ionicons>
          )}
        </Button>
        <View style={styles.controlsContainer}>
          <Button style={!time.timerActive ? styles.skipButton : styles.hideSkip} color='black'>
            {' '}
            <Ionicons
              name='play-skip-forward-circle'
              color='white'
              size={50}
              onPress={() => time.setShowConfirmationModal(true)}
            ></Ionicons>
          </Button>
          <Button
            style={
              !time.timerActive && time.lastUserRecord?.completed === 1
                ? styles.skipButton
                : styles.hideSkip
            }
            color='black'
          >
            <Ionicons
              name='play-skip-back-circle'
              color='#ff3b6f'
              size={50}
              onPress={() => time.setShowReverseModal(true)}
            ></Ionicons>
          </Button>
        </View>
      </View>
      <ConfirmationModal
        skipType={!time.timerActive ? 'skip' : 'stop'}
        showModal={time.showConfirmationModal}
        setShowModal={time.setShowConfirmationModal}
      />
      <ReversePreviousModal
        showModal={time.showReverseModal}
        setShowModal={time.setShowReverseModal}
      />
    </>
  ) : (
    <View style={styles.container}>
      <View style={styles.timeHeaderContainer}>
        <Text style={styles.loadingCaption}>{getRoundLoadingText(time.roundNumber)}</Text>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    </View>
  )
}

export default Timer
