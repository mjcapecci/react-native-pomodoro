import { openDatabase } from 'expo-sqlite';
import { UserRecord } from '../types';

const db = openDatabase('db.db');

export default async (record: UserRecord) => {
  await db.transaction(async (tx) => {
    await tx.executeSql(
      `INSERT INTO records (id, time, rating) VALUES(?, ?, ?);`,
      [record.id, record.time, record.rating]
    );
  });
};
