import type { Event } from '~~/server/db/schemas/events'
import type { Participant } from '~~/server/db/schemas/participants'

export type EventWithParticipants = Event & { participants: Participant[] }

export type PaginatedResponse<T> = {
  count: number
  results: T[]
}
