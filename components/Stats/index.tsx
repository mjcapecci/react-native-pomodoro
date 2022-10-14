import { Headline } from 'react-native-paper'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Chart from './Chart'
import StatViewer from './StatViewer'

const Profile = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Headline style={styles.statsHeading}>Stats</Headline>
      <Chart></Chart>
      <StatViewer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000',
  },
  statsHeading: {
    color: '#fff',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
})

export default Profile
