import * as React from 'react'
import { Modal, Portal, Text, Button } from 'react-native-paper'
import { TimerContext } from './TimerContextProviderV2'
import styles from '../General/General.style'
import ModalDivider from '../General/ModalDivider'

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
        <Text style={styles.centeredModalText}>
          Are you sure you would like to overwrite the last completed round to a status of skipped?
        </Text>
        <ModalDivider />
        <Button onPress={() => hideModal()}>Cancel</Button>

        <ModalDivider />
        <Button
          style={styles.bottomButton}
          color='#ed0d0dc4'
          onPress={async () => await confirmReverse()}
        >
          Confirm Overwrite
        </Button>
      </Modal>
    </Portal>
  )
}

export default ReversePreviousModal
