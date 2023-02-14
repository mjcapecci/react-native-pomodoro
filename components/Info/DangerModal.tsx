import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import { Modal, Portal, Text, Button } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import deleteAllRecords from '../../data_layer/deleteAllRecords'
import styles from '../General/General.style'
import ModalDivider from '../General/ModalDivider'
interface DangerModalProps {
  showModal: boolean
  setDangerModalVisible: (visible: boolean) => void
}

const ConfirmationModal = ({ showModal, setDangerModalVisible }: DangerModalProps): JSX.Element => {
  const hideModal = (): void => setDangerModalVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  const toast = useToast()

  // React Query
  const queryClient = useQueryClient()

  async function handleDeleteAllRecords(): Promise<void> {
    await deleteAllRecords()
    void queryClient.invalidateQueries(['records'])
    hideModal()
    toast.show('All records deleted', {
      type: 'success',
      duration: 3000,
      animationType: 'slide-in',
      placement: 'top',
    })
  }

  return (
    <Portal>
      <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text style={styles.centeredModalText}>
          The actions taken in this menu cannot be undone:
        </Text>
        <ModalDivider />
        <Button onPress={() => hideModal()}>Close</Button>
        <ModalDivider />
        <Button
          style={styles.bottomButton}
          color='#ed0d0dc4'
          onPress={async () => await handleDeleteAllRecords()}
        >
          Delete all records
        </Button>
      </Modal>
    </Portal>
  )
}

export default ConfirmationModal
