import { SQLResultSet } from 'expo-sqlite'
import { UserRecord } from '../types'
import { openDatabase } from './config'

const db = openDatabase()

export default async (sevenDaysAgo: number): Promise<UserRecord[]> => {
  return await new Promise((resolve, _reject) => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        'SELECT * FROM records WHERE CAST(date AS INT) >= ?',
        [sevenDaysAgo],
        (_tx, results: SQLResultSet) => {
          resolve(results.rows._array)
        },
      )
    })
  })
}
