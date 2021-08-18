import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Timer = () => {
  return (
    <View style={styles.container}>
      <Text>Timer Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Timer;
