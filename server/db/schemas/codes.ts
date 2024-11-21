import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { events } from './events'
import { participants } from './participants'

export const codes = sqliteTable('codes', {
  id: integer('id')
    .primaryKey({ autoIncrement: true }),
  publicId: text('public_id', { length: 12 })
    .notNull()
    .unique(),
  eventId: integer('event_id')
    .notNull()
    .references(() => events.id),
  participantId: integer('participant_id')
    .notNull()
    .references(() => participants.id),
  code: text('code', { length: 36 }).notNull(),
  mailSent: integer('mail_sent_at', { mode: 'timestamp' }),
  scanned: integer('scanned_at', { mode: 'timestamp' }),
  updated: integer('updated_at', { mode: 'timestamp' }).$default(() => sql`now()`).notNull(),
  created: integer('created_at', { mode: 'timestamp' }).$default(() => sql`now()`).notNull(),
})

export type Code = typeof codes.$inferSelect
