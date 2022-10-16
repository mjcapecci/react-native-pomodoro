import { Headline } from 'react-native-paper'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Chart from './Chart'
import StatViewer from './StatViewer'
import { getWorkTimePerDay } from './helpers/statsHelpers'
import getLastSevenDays from '../../data_layer/getLastSevenDays'
import { useQuery } from '@tanstack/react-query'

const Stats = (): JSX.Element => {
  // Queries
  const query = useQuery(['records'], getLastSevenDays)

  return (
    <View style={styles.container}>
      <Headline style={styles.statsHeading}>Stats</Headline>
      <Chart dataset={getWorkTimePerDay(query.data ?? [], new Date().getTime()) ?? []} />
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

export default Stats
