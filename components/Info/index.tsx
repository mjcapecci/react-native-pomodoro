import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
const Help = (): JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Test</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
})

export default Help
