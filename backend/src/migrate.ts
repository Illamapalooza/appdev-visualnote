// This is just for migrationss

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import db from './database';

export const migrateDB = async () => {
 try {
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migration successful');
 } catch (error) {
  console.error('Migration failed', error);
 }
};

migrateDB();
