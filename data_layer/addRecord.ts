import { SQLResultSet } from 'expo-sqlite'
import { AddRecordProps } from '../types'
import { openDatabase } from './config'

const db = openDatabase()

export default async (record: AddRecordProps): Promise<SQLResultSet> => {
  return await new Promise((resolve, _reject) => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT INTO records (date, type, completed) VALUES (?, ?, ?)',
        [record.date, record.type, record.completed],
        (_tx, results) => {
          resolve(results)
        },
      )
    })
  })
}
