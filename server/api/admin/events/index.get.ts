import { drizzle } from 'drizzle-orm/d1'
import { count, eq } from 'drizzle-orm'
import { events } from '~~/server/db/schemas/events'
import { participants } from '~~/server/db/schemas/participants'
import { eventParticipantsAggregator } from '~~/server/aggregators/eventParticipants'

export default defineEventHandler(async (event) => {
  const { page, limit } = getQuery<{
    page: string
    limit?: string
  }>(event)

  const db = drizzle(event.context.cloudflare.env.DB)

  const rows = await db.select({ count: count() }).from(events)

  const data = await db.select({
    event: events,
    participant: participants,
  })
    .from(events)
    .leftJoin(participants, eq(events.id, participants.eventId))
    .offset((Number(page) - 1) * Number(limit ?? 1))
    .limit(Number(limit ?? 1))

  const results = eventParticipantsAggregator(data)

  return {
    count: rows[0].count,
    results,
  }
})
