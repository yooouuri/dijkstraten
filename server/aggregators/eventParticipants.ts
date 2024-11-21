import type { Participant } from '../db/schemas/participants'
import type { Event } from '../db/schemas/events'

type EventWithParticipants = Event & { participants: Participant[] }

export const eventParticipantsAggregator = (rows: { event: Event, participant: Participant | null }[]): EventWithParticipants[] => {
  const events = new Map<number, EventWithParticipants>()  

  rows.forEach(row => {
    const { event, participant } = row

    if (!events.has(event.id)) {
      events.set(event.id, { ...event, participants: [] })
    }

    if (participant !== null) {
      events.get(event.id)?.participants.push(participant)
    }
  })

  return Array.from(events.values())
}
