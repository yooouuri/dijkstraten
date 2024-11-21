import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import { participants } from '~~/server/db/schemas/participants'
import { events } from '~~/server/db/schemas/events'
import { randomId } from '~~/server/utils/randomId'

// https://nodejs.org/api/dns.html
// https://github.com/egulias/EmailValidator/blob/master/src/Validation/DNSCheckValidation.php

const schema = z.object({
  name: z.string(),
  street: z.string(),
  houseNumber: z.string(),
  phone: z.string().optional(),
  email: z.string()
    .email(),
  adults: z.number().optional(),
  minors: z.number().optional(),
  comment: z.string().optional(),
  questions: z.array(
    z.array(
      z.boolean()
    )
  ).optional(),
})

export default defineEventHandler(async (event) => {
  const {
    name,
    email,
    phone,
    street,
    houseNumber,
    adults,
    minors,
    comment,
    questions,
  } = await readValidatedBody(event, body => schema.parse(body))

  const db = drizzle(event.context.cloudflare.env.DB)

  const slug = getRouterParam(event, 'slug')

  const data = await db.select().from(events).where(eq(events.slug, slug!))

  if (data.length === 0) {
    throw createError({
      status: 404,
      statusMessage: 'Not found',
    })
  }

  await db.insert(participants).values({
    publicId: randomId(),
    eventId: data[0].id,
    name,
    email,
    phone,
    street,
    houseNumber,
    adults,
    minors,
    comment,
    questions,
  })
})
