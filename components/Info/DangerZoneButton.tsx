import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

interface DangerZoneButtonProps {
  setDangerModalVisible: (visible: boolean) => void
}

const DangerZoneButton = ({ setDangerModalVisible }: DangerZoneButtonProps): JSX.Element => {
  return (
    <Button style={styles.dangerButton} color={'white'} onPress={() => setDangerModalVisible(true)}>
      Danger Zone
    </Button>
  )
}

const styles = StyleSheet.create({
  dangerButton: {
    backgroundColor: 'red',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 15,
  },
})

export default DangerZoneButton
