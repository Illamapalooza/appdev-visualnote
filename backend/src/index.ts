import express from 'express';
import cors from 'cors';
import router from './router/app.router';
import { uploadFilesRoute } from './app/uploads/uploads.contoller';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { sql } from 'drizzle-orm';

import { aiNoteRoute } from './app/aiNote/aiNote.controller';
// import db from './database';
import { notes } from './schema';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const pool = new Pool({
 host: process.env.DB_HOST,
 port: 5432,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
});

const db = drizzle(pool);

const connectToDatabase = async () => {
 try {
  await pool.connect();
  console.log('Connected to the database');
 } catch (error) {
  console.error('Error connecting to the database', error);
 }
};

const startServer = async () => {
 // Middleware
 app.use(router);
 app.use(express.json());
 app.use(cors());

 // Routes

 app.use('/api', uploadFilesRoute, aiNoteRoute);

 // APIS for the database

 app.use('/api/get-users', async (req, res) => {
  // Todo get users
 });

 app.use('/api/insert-users', async (req, res) => {
  // Todo insert users
 });

 app.use('/api/get-user/:id', async (req, res) => {
  // Todo get user by id
 });

 app.use('/api/update-user/:id', async (req, res) => {
  // Todo update user
 });

 app.use('/api/get-notes', async (req, res) => {
  // Todo get notes
 });

 app.use('/api/insert-notes', async (req, res) => {
  // Todo insert notes
 });

 app.use('/api/update-note/:id', async (req, res) => {
  // Todo update notes
 });

 app.use('/api/delete-note/:id', async (req, res) => {
  // Todo delete notes
 });

 app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
 });
};

connectToDatabase().then(() => {
 startServer();
});

export default app;
