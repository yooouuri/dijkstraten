import { sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { events } from './events'

export const participants = sqliteTable('participants', {
  id: integer('id')
    .primaryKey({ autoIncrement: true }),
  publicId: text('public_id', { length: 12 })
    .notNull()
    .unique(),
  // TODO: user id relation
  eventId: integer('event_id')
    .notNull()
    .references(() => events.id),
  name: text('name', { length: 255 }).notNull(),
  email: text('email', { length: 255 }).notNull(),
  phone: text('phone', { length: 255 }),
  street: text('street'),
  houseNumber: text('house_number'),
  comment: text('comment'),
  questions: text('questions', { mode: 'json' }).$type<boolean[][]>(),
  adults: integer('adults').default(0),
  minors: integer('minors').default(0),
  updated: integer('updated_at', { mode: 'timestamp' }).$default(() => sql`now()`).notNull(),
  created: integer('created_at', { mode: 'timestamp' }).$default(() => sql`now()`).notNull(),
})

export type Participant = typeof participants.$inferSelect
