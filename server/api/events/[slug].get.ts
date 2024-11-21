import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { events } from '~~/server/db/schemas/events'

export default defineEventHandler(async (event) => {
  const db = drizzle(event.context.cloudflare.env.DB)

  const slug = getRouterParam(event, 'slug')

  const data = await db.select().from(events).where(eq(events.slug, slug!))

  if (data.length === 0) {
    throw createError({
      status: 404,
      statusMessage: 'Not found',
    })
  }

  return data[0]
})
