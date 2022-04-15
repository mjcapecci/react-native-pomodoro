import React, { useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Headline } from 'react-native-paper';
import addRecord from '../../data_layer/addRecord';
import addSpecificRecord from '../../data_layer/addSpecificRecord';
import deleteAllRecords from '../../data_layer/deleteAllRecords';
import getRecords from '../../data_layer/getRecords';
import { UserRecord } from '../../types';

// import NewRecordModal from './NewRecordModal';

const Profile = () => {
  const alertRecords = async () => {
    console.log(await getRecords());
  };

  const toggleNewRecordModal = () => {
    setIsVisible(!isVisible);
  };

  const submitRecord = (record: UserRecord) => {
    addSpecificRecord(record);
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Headline>Dev Tools</Headline>
      {/* <NewRecordModal
        isVisible={isVisible}
        toggleNewRecordModal={toggleNewRecordModal}
        submitRecord={submitRecord}
      /> */}
      <Button
        onPress={addRecord}
        title='Add Generic Record '
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      >
        Add Generic Record
      </Button>
      <Button
        onPress={toggleNewRecordModal}
        title='Add Specific Record '
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      >
        Add Specific Record
      </Button>
      <Button
        onPress={alertRecords}
        title='Print Records to Console'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      >
        Get Records
      </Button>
      <Button
        onPress={deleteAllRecords}
        title='Delete All Records'
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

export default Profile;
