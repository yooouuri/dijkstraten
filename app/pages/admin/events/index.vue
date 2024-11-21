<script setup lang="ts">
import type { Participant } from '~~/server/db/schemas/participants'
import type { EventWithParticipants, PaginatedResponse } from '~/types'

definePageMeta({
  layout: 'admin',
})

const columns = [
  {
    key: 'title',
    label: 'Titel',
  },
  {
    key: 'start',
    label: 'Start',
  },
  {
    key: 'end',
    label: 'End',
  },
  {
    key: 'total_people',
    label: 'Totaal aantal aanmeldingen',
  },
]

const page = ref(1)

const { data } = await useFetch<PaginatedResponse<EventWithParticipants>>(() => `/api/admin/events?page=${page.value}&limit=10`)
</script>

<template>
  <div>
    <UTable :columns="columns" :rows="data?.results" class="w-full">
      <template #total_people-data="{ row }">
        {{ row.participants.reduce((acc: number, participant: Participant) => acc + ((participant.adults ?? 0) + (participant.minors ?? 0)), 0) }}
      </template>
    </UTable>

    <UPagination v-model="page" :page-count="1" :total="data?.count"></UPagination>
  </div>
</template>
