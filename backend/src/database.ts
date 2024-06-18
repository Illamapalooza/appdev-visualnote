// no use for now

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DB_URL || '';

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

export default db;
