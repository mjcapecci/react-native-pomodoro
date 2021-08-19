import { openDatabase } from 'expo-sqlite';

const db = openDatabase('db.db');

export default async () => {
  await db.transaction(async (tx) => {
    return await tx.executeSql('DELETE FROM records WHERE id >= 1', []);
  });
};
