import * as React from 'react'
import { Modal, Portal, Text, Button } from 'react-native-paper'
import { TimerContext } from './TimerContextProvider'
import styles from '../General/General.style'
import ModalDivider from '../General/ModalDivider'

interface ConfirmationModalProps {
  skipType: 'skip' | 'stop'
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

const ConfirmationModal = ({
  skipType,
  showModal,
  setShowModal,
}: ConfirmationModalProps): JSX.Element => {
  const time = React.useContext(TimerContext)

  const hideModal = (): void => setShowModal(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  const confirmSkip = (): void => {
    if (skipType === 'stop') {
      time.stopRound()
    } else {
      time.stopRound(true)
    }
    hideModal()
  }

  return (
    <Portal>
      <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text style={styles.centeredModalText}>
          Are you sure you would like to skip this round?
        </Text>
        <ModalDivider />
        <Button onPress={() => hideModal()}>Cancel</Button>

        <ModalDivider />
        <Button style={styles.bottomButton} color='#ed0d0dc4' onPress={() => confirmSkip()}>
          Skip
        </Button>
      </Modal>
    </Portal>
  )
}

export default ConfirmationModal
