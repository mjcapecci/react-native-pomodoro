import { Heading } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Chart from './Chart';
import StatViewer from './StatViewer';

const Profile = () => {
  const [chartOption, setChartOption] = useState('today');

  return (
    <View style={styles.container}>
      <Heading style={styles.statsHeading}>Stats</Heading>
      <Chart></Chart>
      <StatViewer />
    </View>
  );
};

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
});

export default Profile;
