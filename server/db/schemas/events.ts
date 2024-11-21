import { sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const events = sqliteTable('events', {
  id: integer('id')
    .primaryKey({ autoIncrement: true }),
  publicId: text('public_id', { length: 12 })
    .notNull()
    .unique(),
  slug: text('slug', { length: 255 })
    .unique()
    .notNull(),
  title: text('title', { length: 255 }).notNull(),
  subtitle: text('subtitle').notNull(),
  start: integer('start', { mode: 'timestamp' }).notNull(),
  end: integer('end', { mode: 'timestamp' }).notNull(),
  location: text('location'),
  questions: text('questions', { mode: 'json' }).$type<{ title: string, multiple: boolean, values: string[] }[]>(),
  updated: integer('updated_at', { mode: 'timestamp' }).$default(() => sql`now()`).notNull(),
  created: integer('created_at', { mode: 'timestamp' }).$default(() => sql`now()`).notNull(),
})

export type Event = typeof events.$inferSelect
