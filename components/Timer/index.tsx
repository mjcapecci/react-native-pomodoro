import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading, Box } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

const Timer = () => {
  const [timerActive, setTimerActive] = useState(false);

  return (
    <View style={styles.container}>
      <Heading style={styles.timeHeader}>25:00</Heading>
      <Box style={styles.starContainer}>
        <Ionicons name='star' color='gold' size={24} style={styles.star} />
        <Ionicons name='star' color='grey' size={24} style={styles.star} />
        <Ionicons name='star' color='grey' size={24} style={styles.star} />
        <Ionicons name='star' color='grey' size={24} style={styles.star} />
      </Box>
      <Box style={styles.actionButton}>
        {!timerActive ? (
          <Ionicons
            name='play-circle-outline'
            color='white'
            size={104}
            onPress={() => setTimerActive(true)}
          ></Ionicons>
        ) : (
          <Ionicons
            name='stop-circle-outline'
            color='white'
            size={104}
            onPress={() => setTimerActive(false)}
          ></Ionicons>
        )}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeHeader: {
    fontSize: 84,
    color: '#fff',
    marginBottom: 20,
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  star: {
    margin: 3,
  },
  resetButton: {},
  actionButton: {
    marginTop: 30,
  },
});

export default Timer;
