import { AddRecordProps, UserRecord } from '../types';
import { openDatabase } from './config';

const db = openDatabase();

export default async (record: AddRecordProps) => {
  return new Promise((resolve, _reject) => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT INTO records (date, type, completed) VALUES (?, ?, ?)',
        [record.date, record.roundType, record.completed],
        (_tx, results) => {
          resolve(results);
        }
      );
    });
  });
};
