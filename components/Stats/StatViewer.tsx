import React from 'react';
import { Box, Heading } from 'native-base';
import { Text, StyleSheet } from 'react-native';

const StatViewer = () => {
  return (
    <Box style={styles.container}>
      <Heading style={styles.statsHeader}>7-Day Totals</Heading>
      <Text style={styles.statLabel}>
        Total Work Time:<Text style={styles.statText}>{}</Text>
      </Text>
      <Text style={styles.statLabel}>
        Total Break Time:<Text style={styles.statText}>{}</Text>
      </Text>
      <Text style={styles.statLabel}>
        Average Work Time:<Text style={styles.statText}>{}</Text>
      </Text>
      <Text style={styles.statLabel}>
        Total Skips:<Text style={styles.statText}>{}</Text>
      </Text>
    </Box>
  );
};

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
});

export default StatViewer;
