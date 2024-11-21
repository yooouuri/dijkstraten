<script setup lang="ts">
definePageMeta({
  layout: 'event',
})

const route = useRoute<'event'>()

const { data: event } = await useFetch(`/api/events/${route.params.event}`)

const state = reactive({
  adults: undefined,
  minors: undefined,
  questions: event.value?.questions
      .map((q) => q.multiple ? [] : [ q.values[0] ])
})

async function participateForEvent() {
  const answers = event.value?.questions
    .map((q, i) => q.values
      .map(v => state.questions[i].find(a => a === v) ? true : false)
    )

  await $fetch(`/api/events/${route.params.event}`, {
    method: 'POST',
    body: {
      answers,
    },
  })
}
</script>

<template>
  <UCard class="m-5">
    <template #header>
      <div class="relative">
        <h1 class="text-2xl font-semibold">
          {{ event?.title }}
        </h1>
        <div class="text-sm text-gray-600">
          {{ event?.subtitle }}
        </div>

        <div class="mt-5">
          <p>
            Tijd: 09:45 - 11:00
          </p>
          <p>
            Locatie: Platijn, Maatstok 1
          </p>
        </div>

        <div class="absolute top-0 right-0">
          <UButton
              icon="i-heroicons-share"
              size="sm"
              color="primary"
              square
              variant="solid"
          />
        </div>
      </div>
    </template>
    <p>
      Om de aanmelding compleet te maken hebben we wat gegevens nodig.
    </p>
    <div class="flex pt-5 gap-4 flex-col">
      <UFormGroup label="Naam" name="name" required>
        <UInput name="name" />
      </UFormGroup>

      <UFormGroup label="Adres" name="name" required>
        <div class="flex gap-2">
          <UInput name="street" placeholder="Straat" />
          <UInput name="house_number" placeholder="Huisnummer" />
        </div>
      </UFormGroup>

      <UFormGroup label="Email" name="email" required>
        <UInput name="email" type="email" />
      </UFormGroup>

      <UFormGroup label="Telefoonnummer" name="phone">
        <UInput name="phone" />
      </UFormGroup>

      <UFormGroup label="Hoeveel volwassenen zullen aanwezig zijn" name="adults" required>
        <USelect v-model="state.adults" :options="[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]" placeholder="Aantal..." />
      </UFormGroup>

      <UFormGroup label="Aantal kinderen" name="minors" required>
        <USelect v-model="state.minors" :options="[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]" placeholder="Aantal..." />
      </UFormGroup>

      <template v-if="event?.questions.length > 0">
        <UDivider label="Vragen" class="py-10" />

        <template v-for="(question, i) in event?.questions">
          <h3 class="text-lg">
            {{ question.title }}
          </h3>

          <EventQuestions
            v-model="state.questions[i]"
            :questions="question.values"
            :multiple="question.multiple"
          />
        </template>
      </template>
    </div>
    <template #footer>
      <div class="space-y-10">
        <UButton>Aanmelden</UButton>
      </div>
    </template>
  </UCard>
</template>
