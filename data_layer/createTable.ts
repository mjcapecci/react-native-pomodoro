import { openDatabase } from 'expo-sqlite';

const db = openDatabase('db.db');

export default async () => {
  await db.transaction(async (tx) => {
    await tx.executeSql(
      'create table if not exists records (id integer primary key not null, time int, rating int);'
    );
  });
};
