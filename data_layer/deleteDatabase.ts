import { openDatabase } from './config'

const db = openDatabase()

export default async (): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx.executeSql('DROP TABLE records', [], (tx, results) => {
      console.log('Database deleted...')
    })
  })
}
