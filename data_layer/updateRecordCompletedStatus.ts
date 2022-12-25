import { SQLResultSet } from 'expo-sqlite'
import { UserRecord } from '../types'
import { openDatabase } from './config'

const db = openDatabase()

export default async (recordId: string): Promise<UserRecord> => {
  return await new Promise((resolve, _reject) => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        'UPDATE records SET completed = 0 WHERE id = ?',
        [recordId],
        (_tx, results: SQLResultSet) => {
          resolve(results.rows._array[0])
        },
      )
    })
  })
}
