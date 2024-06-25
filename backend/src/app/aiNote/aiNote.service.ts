import express from 'express';
import fs from 'fs';
import openai from '../../utils/openai';
import { filepaths } from '../../utils/saveFile';

export const schema = {
 type: 'object',
 properties: {
  topic: {
   type: 'string',
   description:
    'Briefly outline the overarching topic or subject area covered in the lecture snapshot',
  },
  description: {
   type: 'string',
   description:
    'Describe the overall content of the lecture snapshots captured in the photos. Include details about any diagrams, charts, or text visible in the images to provide context for the model.',
  },
  key_concepts: {
   type: 'array',
   description:
    'Transform the photo into concise bullet points or headings that encapsulate the main ideas presented in the lecture snapshot. Focus on identifying the fundamental concepts discussed.',
   items: {
    type: 'string',
   },
  },
  explanation: {
   type: 'string',
   description:
    'Elaborate on each key concept identified in the previous step. Provide clear, detailed explanations that delve deeper into the topic, clarifying any complex or ambiguous points. Write it in an essay format not in numbering format.',
  },
  examples: {
   type: 'array',
   description:
    'Offer illustrative examples or scenarios related to each key concept. These examples should reinforce understanding and help learners connect theoretical knowledge with real-world applications.',
   items: {
    type: 'string',
   },
  },
  resources: {
   type: 'array',
   description:
    'If applicable, specify any resources or materials provided alongside the lecture snapshot, such as slides, textbooks, or additional readings.',
   items: {
    type: 'object',
    properties: {
     url: { type: 'string' },
     title: { type: 'string' },
    },
   },
  },
  exercises: {
   type: 'array',
   description:
    'Create exercises or questions based on the key concepts discussed. These exercises should challenge learners to apply their understanding and critically analyze the material.',
   items: {
    type: 'string',
   },
  },
 },
 required: [
  'topic',
  'description',
  'key_concepts',
  'explanation',
  'examples',
  'resources',
  'exercises',
 ],
};

export const generateNote = async (
 req: express.Request,
 res: express.Response
) => {
 console.log('fetching data from OpenAI');
 try {
  const imagesAsBase64 = filepaths.map((filepath) =>
   fs.readFileSync(filepath, 'base64')
  );
  const response = await openai.chat.completions.create({
   model: 'gpt-4o',
   messages: [
    {
     role: 'system',
     content:
      " You are an expert note taker and mentor tasked with transforming lecture snapshots into insightful, organized notes. Given photos of lecture snapshots, provide detailed, well-structured notes that capture key concepts, explanations, and examples. Your goal is to enhance understanding and provide clarity, offering insights beyond what is visible in the image. Consider the audience's perspective and aim to create notes that are informative and engaging, facilitating learning and retention.",
    },
    {
     role: 'user',
     content: imagesAsBase64.map((image) => ({
      type: 'image_url',
      image_url: { url: `data:image/png;base64,${image}` },
     })),
    },
   ],
   max_tokens: 1000,
   functions: [
    {
     name: 'get_topic_data',
     parameters: schema,
    },
   ],
   function_call: { name: 'get_topic_data' },
  });
  console.log(response.choices[0]);

  const result = response.choices[0]?.message?.function_call?.arguments;

  return res
   .status(200)
   .json(response.choices[0]?.message?.function_call?.arguments);
 } catch (error) {
  console.log(error);
  res.status(500).json({ error: 'An error occurred' });
 }
};

export const generateNoteTest = async (
 req: express.Request,
 res: express.Response
) => {
 return res
  .status(200)
  .json(
   `{"topic":"Database Query Languages - Relational Algebra","description":"The images present a series of database queries formulated in relational algebra. It begins with a schema definition for relations 'Lives', 'Works', 'Located-in', and 'Manages', each describing relationships between 'person-name' and other attributes like 'company-name', 'city', 'salary', 'street', and 'manager-name'. Following this schema, the images delineate seven specific relational algebra queries aimed at extracting data based on certain conditions, primarily focused on the 'Waelhi Company'.","key_concepts":["Relational Algebra","Schema Definitions","Basic Selection and Projection in Queries","Joining Relations","Conditions in Queries","Composite Conditions and Nested Queries"],"explanation":"**Relational Algebra**: This is a procedural query language used to query relational databases. It uses a set of operations that take one or two relations as input and produce a new relation as a result.\\n\\n**Schema Definitions**: The given schemas for 'Lives', 'Works', 'Located-in', and 'Manages' describe the structure of the database. Each schema lists attributes relevant to the entity, for instance, 'Lives' connects 'person-name' with 'street' and 'city'.\\n\\n**Basic Selection and Projection in Queries**: Selection (σ) and Projection (π) are fundamental operations in relational algebra. Selection extracts rows that satisfy a given predicate, while projection extracts specified columns.\\n\\n**Joining Relations**: A join operation combines related tuples from two or more relations into a single tuple, based on a common attribute.\\n\\n**Conditions in Queries**: Adding conditions to queries helps to filter the data according to specific criteria, such as salary, company name, or city.\\n\\n**Composite Conditions and Nested Queries**: Composite conditions combine multiple conditions using logical operators (AND, OR). Nested queries involve a query within another query to achieve more complex data retrieval scenarios.","examples":["Original Image: A common grayscale image showing a village landscape.","First Derivative: Edges of the buildings and other structures become prominent due to intensity changes.","Alpha-order Derivative: Similar to the first derivative but can vary based on the chosen alpha value, showing edge details differently.","Gradient Magnitudes: Visual representation with colors indicating the magnitude of changes, helping in understanding the edge strengths and orientations."],"resources":[{"url":"https://en.wikipedia.org/wiki/Relational_algebra","title":"Relational Algebra - Wikipedia"},{"url":"http://db.labthreesixfive.com/schema_relational_algebra.html","title":"Relational Algebra for SQL - Lab365 Database Course"}],"exercises":["List all tuples in the 'Lives' relation for all persons who live in 'Cagayan de Oro city'.","Find the names of persons who work at any company and earn less than Php 30,000.","Identify the name and company of all managers who manage someone and live in the same city as the person they manage.","Extract names of persons who work for 'Waelhi Company' but do not live in 'Cagayan de Oro city'.","Determine the names of persons who manage themselves (i.e., their person-name is the same as their manager-name)."]}`
  );
};

export default generateNote;
