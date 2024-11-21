import { drizzle } from 'drizzle-orm/d1'
import { z } from 'zod'
import { events } from '~~/server/db/schemas/events'
import { randomId } from '~~/server/utils/randomId'

const eventSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string(),
  questions: z.array(
    z.object({
      title: z.string(),
      multiple: z.boolean(),
      values: z.array(z.string())
    })
  ),
})

export default defineEventHandler(async (event) => {
  const {
    title,
    subtitle,
    start,
    end,
    location,
    questions,
  } = await readValidatedBody(event, body => eventSchema.parse(body))

  const db = drizzle(event.context.cloudflare.env.DB)

  await db.insert(events).values({
    publicId: randomId(),
    slug: 'fsdfsdfsdfdsf', // TODO slugify
    title,
    subtitle,
    start: new Date(start),
    end: new Date(end),
    location,
    questions,
    updated: new Date(),
    created: new Date(),
  })

  setResponseStatus(event, 200)
})
