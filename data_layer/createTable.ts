import { openDatabase } from 'expo-sqlite'

const db = openDatabase('db.db')

export default async (): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx.executeSql(
      'create table if not exists records (id integer primary key not null, date int, type text, completed boolean);',
    )
  })
}
