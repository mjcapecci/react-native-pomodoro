import { SQLResultSet } from 'expo-sqlite';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import addRecord from '../data_layer/addRecord';
import deleteAllRecords from '../data_layer/deleteAllRecords';
import deleteDatabase from '../data_layer/deleteDatabase';
import getRecords from '../data_layer/getRecords';

const DevTools = () => {
  async function handleAddRecord() {
    await addRecord();
  }

  async function handleDatabaseLog(): Promise<SQLResultSet | undefined> {
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
        <Button onPress={() => handleAddRecord()}>Add Record</Button>
      </View>
      <View>
        <Button onPress={() => handleDatabaseLog()}>Log Database</Button>
      </View>
      <View>
        <Button onPress={() => handleDeleteAllRecords()}>Delete Records</Button>
      </View>
      <View>
        <Button onPress={() => handleDeleteRecordsTable()}>Delete Table</Button>
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
  devText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default DevTools;
