import { openDatabase } from './config';

const db = openDatabase();

export default async () => {
  await db.transaction(async (tx) => {
    return await tx.executeSql('DROP TABLE records', [], (tx, results) => {
      console.log(results);
    });
  });
};
