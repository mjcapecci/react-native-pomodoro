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
    backgroundColor: '#ff3b6f',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 30,
    marginBottom: 30,
  },
})

export default DangerZoneButton
