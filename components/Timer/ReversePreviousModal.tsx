import * as React from 'react'
import { Modal, Portal, Text, Button } from 'react-native-paper'
import { TimerContext } from './TimerContextProvider'

interface ReversePreviousModalProps {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

const ReversePreviousModal = ({
  showModal,
  setShowModal,
}: ReversePreviousModalProps): JSX.Element => {
  const time = React.useContext(TimerContext)

  const hideModal = (): void => setShowModal(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  const confirmReverse = async (): Promise<void> => {
    if (time?.lastUserRecord?.id != null) {
      await time.reversePreviousRecord(time.lastUserRecord.id)
    }
    hideModal()
  }

  return (
    <Portal>
      <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>
          Are you sure you would like to set the last completed round to a status of skipped?
        </Text>
        <Button onPress={async () => await confirmReverse()}>Skip</Button>
        <Button onPress={() => hideModal()}>Cancel</Button>
      </Modal>
    </Portal>
  )
}

export default ReversePreviousModal
