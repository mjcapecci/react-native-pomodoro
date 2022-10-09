import { SQLResultSet } from 'expo-sqlite';
import { UserRecord } from '../types';
import { openDatabase } from './config';

const db = openDatabase();

export default async (): Promise<UserRecord[]> => {
  return new Promise((resolve, _reject) => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        'SELECT * FROM records ORDER BY date DESC LIMIT 5',
        [],
        (_tx, results: SQLResultSet) => {
          resolve(results.rows._array);
        }
      );
    });
  });
};
