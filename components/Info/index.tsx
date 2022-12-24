import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { ColorType } from '../../types'
import HighLevelDescription from './HighLevelDescription'
import IconKey, { IconKeyData } from './IconKey'
import { AppContext } from '../General/AppContextProvider'

const Help = (): JSX.Element => {
  const { appVersion } = React.useContext(AppContext)

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
    <ScrollView>
      <View style={styles.container}>
        <HighLevelDescription
          description='[App Name] is a minimalist app that helps you to implement the Pomodoro method into your life
      with very little setup.'
        />
        <IconKey tableTitle='Base Icon Key' tableData={baseIconTableData} />
        <IconKey tableTitle='Color Key' tableData={colorKeyTableData} />
        <HighLevelDescription description='Navigation through [App Name] is simple and is completed through the use of the bottom navigation bar.' />
        <IconKey tableTitle='Navigation Icon Key' tableData={navigationIconTableData} />
        <HighLevelDescription
          description={`The current installed app version is: ${appVersion} -- Some updates are installed automatically, but please check for updates regularly.`}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
})

export default Help
