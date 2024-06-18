import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
 schema: './src/schema.ts',
 out: './supabase/migrations',
 dialect: 'postgresql',
 dbCredentials: {
  url: process.env.DB_URL!,
 },
});
