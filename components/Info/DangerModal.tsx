import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Modal, Portal, Text, Button } from 'react-native-paper'
import deleteAllRecords from '../../data_layer/deleteAllRecords'

interface DangerModalProps {
  showModal: boolean
  setDangerModalVisible: (visible: boolean) => void
}

const ConfirmationModal = ({ showModal, setDangerModalVisible }: DangerModalProps): JSX.Element => {
  const hideModal = (): void => setDangerModalVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  // React Query
  const queryClient = useQueryClient()

  async function handleDeleteAllRecords(): Promise<void> {
    await deleteAllRecords()
    void queryClient.invalidateQueries(['records'])
  }

  return (
    <Portal>
      <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text style={styles.centeredText}>The actions taken in this menu cannot be undone:</Text>
        <Button onPress={async () => await handleDeleteAllRecords()}>Delete all records</Button>
        <Button onPress={() => hideModal()}>Close</Button>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
})

export default ConfirmationModal
