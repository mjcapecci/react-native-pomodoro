import { openDatabase } from './config'

const db = openDatabase()

export default async (): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx.executeSql('DELETE FROM records WHERE id >= 1', [])
  })
}
