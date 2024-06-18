// Database Table Schemas

import {
 integer,
 pgTable,
 serial,
 text,
 timestamp,
 json,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
 id: serial('id').primaryKey(),
 name: text('name').notNull(),
 email: text('email').notNull().unique(),
 password: text('password').notNull(),
});

export const notes = pgTable('notes', {
 id: serial('id').primaryKey(),
 topic: text('topic').notNull(),
 content: json('content').notNull(),
 image_url: text('image_url').notNull(),
 created_at: timestamp('created_at').notNull().defaultNow(),
 // user_id: integer('user_id')
 //   .notNull()
 //   .references(() => users.id, { onDelete: 'cascade' }),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertNote = typeof notes.$inferInsert;
export type SelectNote = typeof notes.$inferSelect;
