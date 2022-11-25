import React from 'react'
import { Headline } from 'react-native-paper'
import { Text, StyleSheet, View } from 'react-native'
import { UserRecord } from '../../types'
import {
  getAverageWorkTime,
  getTotalBreakTime,
  getTotalSkips,
  getTotalWorkTime,
} from './helpers/statViewerHelpers'

interface StatViewerProps {
  dataset?: UserRecord[]
}

const StatViewer = ({ dataset }: StatViewerProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Headline style={styles.statsHeader}>7-Day Totals</Headline>
      <Text style={styles.statLabel}>
        Total Work Time:
        <Text style={styles.statText}> {getTotalWorkTime(dataset ?? [])} Hours</Text>
      </Text>
      <Text style={styles.statLabel}>
        Total Break Time:
        <Text style={styles.statText}> {getTotalBreakTime(dataset ?? [])} Hours</Text>
      </Text>
      <Text style={styles.statLabel}>
        Average Work Time:
        <Text style={styles.statText}> {getAverageWorkTime(dataset ?? [])} Hours per Day</Text>
      </Text>
      <Text style={styles.statLabel}>
        Total Skips:<Text style={styles.statText}> {getTotalSkips(dataset ?? [])} Skips</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '33%',
    width: '74%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: '#000',
    marginTop: -45,
  },
  statsHeader: {
    color: '#fff',
    fontSize: 22,
  },
  statLabel: {
    color: '#fff',
  },
  statText: {
    color: '#fff',
  },
})

export default StatViewer
