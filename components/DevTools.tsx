import { SQLResultSet } from 'expo-sqlite';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import addRecord from '../data_layer/addRecord';
import deleteAllRecords from '../data_layer/deleteAllRecords';
import deleteDatabase from '../data_layer/deleteDatabase';
import getRecords from '../data_layer/getRecords';
import { RoundType, UserRecord } from '../types';

const DevTools = () => {
  async function handleAddRecord() {
    await addRecord({ date: 12345, roundType: RoundType.Work, completed: 0 });
  }

  async function handleDatabaseLog(): Promise<UserRecord[] | undefined> {
    const records = await getRecords();
    console.log(records);
    return records ?? undefined;
  }

  async function handleDeleteAllRecords() {
    await deleteAllRecords();
  }

  async function handleDeleteRecordsTable() {
    await deleteDatabase();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.devText}>DevTools</Text>
      <View>
        <Button onPress={() => handleAddRecord()} style={styles.devButton}>
          Add Record
        </Button>
      </View>
      <View>
        <Button onPress={() => handleDatabaseLog()} style={styles.devButton}>
          Log Database
        </Button>
      </View>
      <View>
        <Button
          onPress={() => handleDeleteAllRecords()}
          style={styles.devButton}
        >
          Delete Records
        </Button>
      </View>
      <View>
        <Button
          onPress={() => handleDeleteRecordsTable()}
          style={styles.devButton}
        >
          Delete Table
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000',
    color: '#fff',
  },
  devButton: {
    backgroundColor: '#fff',
    color: '#000',
  },
  devText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default DevTools;
