import express from 'express';
import cors from 'cors';
import router from './router/app.router';
import { uploadFilesRoute } from './app/uploads/uploads.contoller';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { sql } from 'drizzle-orm';

import { aiNoteRoute } from './app/aiNote/aiNote.controller';
// import db from './database';
import { notes, users } from './schema';
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
  try {
   const allUsers = await db.select().from(users);
   res.json(allUsers);

   console.log(allUsers);
  } catch (error) {
   console.error('Error getting users', error);
   res.status(500).json({ error: 'An error occurred' });
  }
 });

 app.use('/api/insert-users', async (req, res) => {
  // Todo insert users
  try {
   const { name, email, password } = req.body;

   console.log(name, email, password);

   const insertUser = await db
    .insert(users)
    .values([{ name, email, password }]);
   res.json(insertUser);
  } catch (error) {
   console.log('Error inserting user', error);
  }
 });
 app.use('/api/get-user/:id', async (req, res) => {
  // Todo get user by id
  try {
   const { id } = req.params;
   const user = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${id}`);
   res.json(user);
  } catch (error) {
   console.log('Error getting user by id', error);
  }
 });

 app.use('/api/update-user/:id', async (req, res) => {
  try {
   const { id } = req.params;

   const { name, email, password } = req.body;
   const user = await db
    .update(users)
    .set({ name, email, password })
    .where(sql`${users.id} = ${id}`);
   res.json(user);
  } catch (error) {
   console.log('Error updating user', error);
  }
 });

 app.use('/api/get-notes', async (req, res) => {
  try {
   const allNotes = await db.select().from(notes);
   res.json(allNotes);

   console.log(allNotes);
  } catch (error) {
   console.error('Error updating user', error);
   res.status(500).json({ error: 'An error occurred' });
  }
  // Todo get notes
 });

 app.use('/api/insert-notes', async (req, res) => {
  try {
   const { topic, image_url, content } = req.body;

   console.log(topic, image_url, content);

   const insertNote = await db
    .insert(notes)
    .values([{ topic, image_url, content }]);
   res.json(insertNote);

   console.error(insertNote);
  } catch (error) {
   console.log('Error inserting note', error);
  }
  // Todo insert notes
 });

 app.use('/api/update-note/:id', async (req, res) => {
  try {
   const { id } = req.params;
   const { topic, image_url, content } = req.body;
   const updateNote = await db
    .update(notes)
    .set({ topic, image_url, content })
    .where(sql`${notes.id} = ${id}`);
   res.json(updateNote);
  } catch (error) {
   console.log('Error updating note', error);
  }
 });

 app.use('/api/delete-note/:id', async (req, res) => {
  // Todo delete notes
  try {
   const { id } = req.params;
   const deleteNote = await db.delete(notes).where(sql`${notes.id} = ${id}`);

   res.json(deleteNote);
  } catch (error) {
   console.log('Error deleting note', error);
  }
 });

 app.use('/api/delete-user/:id', async (req, res) => {
  // Todo delete user
  try {
   const { id } = req.params;
   const deleteUsers = await db.delete(users).where(sql`${users.id} = ${id}`);
   res.json(deleteUsers);
  } catch (error) {
   console.log('Error deleting user', error);
  }
 });

 app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
 });
};

connectToDatabase().then(() => {
 startServer();
});

export default app;
