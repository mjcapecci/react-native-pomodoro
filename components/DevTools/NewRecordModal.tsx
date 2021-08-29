import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';

import {
  FormControl,
  Input,
  Stack,
  Text,
  ScrollView,
  Button,
  Heading,
} from 'native-base';
import { UserRecord } from '../../types';

interface Props {
  isVisible: boolean;
  toggleNewRecordModal(isVisible: boolean): void;
  submitRecord(record: UserRecord): void;
}

const NewRecordModal = ({
  isVisible,
  toggleNewRecordModal,
  submitRecord,
}: Props) => {
  const [recordId, setRecordId] = useState('');
  const [timeSpent, setTimeSpent] = useState('');

  useEffect(() => {
    setRecordId('');
    setTimeSpent('');
  }, [isVisible]);

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Stack space={4} px={5} safeArea mt={6}>
              <Heading>Add Record:</Heading>
              <FormControl>
                <FormControl.Label>Id:</FormControl.Label>
                <Input
                  isRequired={true}
                  onChangeText={(recordId) => setRecordId(recordId)}
                  defaultValue={recordId}
                />
                <FormControl.ErrorMessage>
                  Something is wrong.
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl>
                <FormControl.Label>Time Spent:</FormControl.Label>
                <Input
                  isRequired={true}
                  onChangeText={(timeSpent) => setTimeSpent(timeSpent)}
                  defaultValue={timeSpent}
                />
                <FormControl.ErrorMessage>
                  Something is wrong.
                </FormControl.ErrorMessage>
              </FormControl>
            </Stack>
          </ScrollView>

          <Button
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              submitRecord({
                id: +recordId,
                time: +timeSpent,
                date: Date.now(),
              });
              toggleNewRecordModal(!isVisible);
            }}
          >
            <Text style={styles.textStyle}>Submit Record</Text>
          </Button>
          <Button
            style={{ ...styles.closeButton, backgroundColor: '#da615d' }}
            onPress={() => {
              toggleNewRecordModal(!isVisible);
            }}
          >
            <Text style={styles.textStyle}>Cancel & Close</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 75,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default NewRecordModal;
