import { openDatabase } from 'expo-sqlite';

const db = openDatabase('db.db');

export default async () => {
  await db.transaction(async (tx) => {
    await tx.executeSql(
      `INSERT INTO records (id, time, rating) VALUES(?, ?, ?);`,
      [1, 330, 3]
    );
  });
};
