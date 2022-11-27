import * as React from 'react'
import { Modal, Portal, Text, Button } from 'react-native-paper'
import { TimerContext } from './TimerContextProvider'

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
      time.advanceRound()
    }
    hideModal()
  }

  return (
    <Portal>
      <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>Are you sure you would like to skip this round?</Text>
        <Button onPress={() => confirmSkip()}>Skip</Button>
        <Button onPress={() => hideModal()}>Cancel</Button>
      </Modal>
    </Portal>
  )
}

export default ConfirmationModal
