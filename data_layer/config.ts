import { Platform } from 'react-native'
import * as SQLite from 'expo-sqlite'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function openDatabase() {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        }
      },
    }
  }

  const db = SQLite.openDatabase('db.db')
  return db
}
