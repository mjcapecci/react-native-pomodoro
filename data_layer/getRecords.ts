import { SQLResultSet } from 'expo-sqlite';
import { openDatabase } from './config';

const db = openDatabase();

export default async (): Promise<SQLResultSet> => {
  return new Promise((resolve, _reject) => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        'SELECT * FROM records',
        [],
        (_tx, results: SQLResultSet) => {
          resolve(results);
        }
      );
    });
  });
};
