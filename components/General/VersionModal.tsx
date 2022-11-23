import * as React from 'react'
import { Modal, Portal, Text } from 'react-native-paper'
import { AppContext } from './AppContextProvider'

const VersionModal = (): JSX.Element => {
  const { showNewVersionModal, setShowNewVersionModal } = React.useContext(AppContext)
  const hideModal = (): void => setShowNewVersionModal(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  return (
    <Portal>
      <Modal
        visible={showNewVersionModal}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>A new version of Pomodoro App has been released. Please download now!</Text>
      </Modal>
    </Portal>
  )
}

export default VersionModal
