import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import addRecord from '../../data_layer/addRecord';
import deleteAllRecords from '../../data_layer/deleteAllRecords';
import getRecords from '../../data_layer/getRecords';

const Timer = () => {
  const alertRecords = async () => {
    console.log(await getRecords());
  };

  return (
    <View style={styles.container}>
      <Text>Timer Page</Text>
      <Button
        onPress={addRecord}
        title='Add Record '
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      >
        Add Record
      </Button>
      <Button
        onPress={alertRecords}
        title='Get Records'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      >
        Get Records
      </Button>
      <Button
        onPress={deleteAllRecords}
        title='Delete All Records (Testing)'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      >
        Get Records
      </Button>
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
