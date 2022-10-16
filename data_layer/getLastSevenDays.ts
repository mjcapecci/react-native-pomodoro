import { SQLResultSet } from 'expo-sqlite'
import { getSevenDaysAgo } from '../components/Stats/helpers/statsHelpers'
import { UserRecord } from '../types'
import { openDatabase } from './config'

const db = openDatabase()

export default async (): Promise<UserRecord[]> => {
  const sevenDaysAgo = getSevenDaysAgo(new Date().getTime())

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
