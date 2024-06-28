import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { notes } from './schema';
import { sql } from 'drizzle-orm';
import { upload } from './utils/saveFile';
import openai from './utils/openai';
import { aiNoteRoute } from './app/aiNote/aiNote.controller';
import { uploadFilesRoute } from './app/uploads/uploads.contoller';
import router from './router/app.router';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST = process.env.HOST ?? 'localhost';

const pool = new Pool({
 user: process.env.DB_USER,
 host: process.env.DB_HOST,
 database: process.env.DB_NAME,
 password: process.env.DB_PASSWORD,
 port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

const db = drizzle(pool);

const connectToDatabase = async () => {
 try {
  await pool.connect();
  console.log('Connected to database');
 } catch (error) {
  console.error('Error connecting to database', error);
 }
};

connectToDatabase();

app.use('/api', uploadFilesRoute, aiNoteRoute);

app.use('/api/get-notes', async (req, res) => {
 try {
  const allNotes = await db.select().from(notes);
  res.json(allNotes);
 } catch (error) {
  console.error('Error updating user', error);
  res.status(500).json({ error: 'An error occurred' });
 }
});

app.use('/api/delete-note/:id', async (req, res) => {
 // Todo delete notes
 try {
  const id = req.params.id;

  const ID = parseInt(id, 10);

  const deleteNote = await db.delete(notes).where(sql`${notes.id} = ${ID}`);
  res.status(200).json(deleteNote);
 } catch (error) {
  console.log('Error deleting note', error);
  res.status(500).json({ error: 'An error occurred' });
 }
});

app.use('/api/insert-note', upload, async (req, res) => {
 try {
  const data = req.body.data;
  const files = req.files;

  if (!files) {
   throw new Error('No files provided');
  }

  const parsedData = JSON.parse(JSON.parse(data));

  const topic = parsedData.topic;
  const description = parsedData.description;
  const key_concepts = parsedData.key_concepts;
  const explanation = parsedData.explanation;
  const examples = parsedData.examples;
  const resources = parsedData.resources;
  const exercises = parsedData.exercises;

  const content = {
   description,
   key_concepts,
   explanation,
   examples,
   resources,
   exercises,
  };

  let image_urls: string[] = [];

  if (Array.isArray(files)) {
   image_urls = files.map((file: Express.Multer.File) => file.path);
  }

  const insertNote = await db
   .insert(notes)
   .values([{ topic, image_urls, content }]);

  console.log(insertNote);

  res.json(insertNote);
  // }
 } catch (error) {
  console.log('Error inserting note', error);
 }
 // Todo insert notes
});

app.use('/api/edit-note/:id', async (req, res) => {
 try {
  const id = req.params.id;

  const title = req.body.title;
  const key_concepts = req.body.key_concepts;
  const description = req.body.description;
  const explanation = req.body.explanation;
  const examples = req.body.examples;
  const resources = req.body.resources;
  const exercises = req.body.exercises;

  const updateNote = await db
   .update(notes)
   .set({
    topic: title,
    content: {
     key_concepts,
     description,
     explanation,
     examples,
     resources,
     exercises,
    },
   })
   .where(sql`${notes.id} = ${id}`);

  res.status(200).json(updateNote);
 } catch (error) {
  console.log('Error updating note', error);
  res.status(500).json({ error: 'An error occurred while updating the note.' });
 }
});

//  http//:localhost:3000/
app.listen(PORT, HOST, () => {
 console.log(`Server is running at http://${HOST}:${PORT}`);
});
