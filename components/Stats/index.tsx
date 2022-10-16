import { Headline } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Chart from './Chart'
import StatViewer from './StatViewer'
import { getSevenDaysAgo, getWorkTimePerDay } from './helpers/statsHelpers'
import getLastSevenDays from '../../data_layer/getLastSevenDays'
import { UserRecord } from '../../types'

const Stats = (): JSX.Element => {
  const [records, setRecords] = useState<UserRecord[]>([])

  useEffect(() => {
    const fetchRecords = async (): Promise<UserRecord[]> => {
      return await getLastSevenDays(getSevenDaysAgo(new Date().getTime()))
    }

    fetchRecords()
      .then((data) => setRecords(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <View style={styles.container}>
      <Headline style={styles.statsHeading}>Stats</Headline>
      <Chart dataset={getWorkTimePerDay(records, new Date().getTime()) ?? []} />
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
