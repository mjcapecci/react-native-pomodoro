import { openDatabase } from './config';

const db = openDatabase();

export default async () => {
  return new Promise((resolve, _reject) => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT INTO records (date, type, completed) VALUES (?, ?, ?)',
        [12345, 'test', 1],
        (_tx, results) => {
          resolve(results);
        }
      );
    });
  });
};
