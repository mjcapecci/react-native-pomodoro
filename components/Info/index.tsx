import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ColorType } from '../../types'
import IconKey, { IconKeyData } from './IconKey'
import DangerZoneButton from './DangerZoneButton'
import DangerModal from './DangerModal'

const Help = (): JSX.Element => {
  const [dangerModalVisible, setDangerModalVisible] = React.useState(false)

  const baseIconTableData: IconKeyData[] = [
    { icon: 'hammer', description: 'Work Round -- 25 Minutes.' },
    { icon: 'walk', description: 'Break Round -- 5 Minutes.' },
    { icon: 'pizza', description: 'Long Break Round -- 20 Minutes.' },
  ]

  const colorKeyTableData: IconKeyData[] = [
    { icon: 'hammer', description: 'Unstarted / Future Round.' },
    { icon: 'hammer', description: 'Active Round.', color: ColorType.Cyan },
    { icon: 'hammer', description: 'Completed Round.', color: ColorType.Gold },
  ]

  const navigationIconTableData: IconKeyData[] = [
    { icon: 'timer-outline', description: 'The main timer screen.', color: ColorType.White },
    { icon: 'stats-chart', description: 'The stats screen.', color: ColorType.White },
    {
      icon: 'information-circle',
      description: 'The help screen. (Color indicates active tab)',
      color: ColorType.Gold,
    },
  ]

  return (
    <View style={styles.container}>
      <IconKey tableTitle='Base Icon Key' tableData={baseIconTableData} />
      <IconKey tableTitle='Color Key' tableData={colorKeyTableData} />
      <IconKey tableTitle='Navigation Icon Key' tableData={navigationIconTableData} />
      <DangerZoneButton setDangerModalVisible={setDangerModalVisible} />
      <DangerModal showModal={dangerModalVisible} setDangerModalVisible={setDangerModalVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000',
    marginBottom: 15,
  },
  text: {
    color: '#fff',
  },
})

export default Help
