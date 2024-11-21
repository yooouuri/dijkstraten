<script setup lang="ts">
import { z } from 'zod'
import { nanoid } from 'nanoid'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'admin',
})

const schema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  subtitle: z.string().min(1, { message: 'Required' }),
  start: z.date(),
  end: z.date(),
  location: z.string().min(1, { message: 'Required' }),
  questions: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, { message: 'Required' }),
      multiple: z.boolean(),
      answers: z.array(
        z.object({
          id: z.string(),
          value: z.string().min(1, { message: 'Required' }),
        }),
      ),
    })
  ),
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  title: '',
  subtitle: '',
  start: new Date(),
  end: new Date(),
  location: '',
  questions: [],
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { title, subtitle, start, end, location, questions } = event.data

  await $fetch('/api/admin/events', {
    method: 'POST',
    body: {
      title,
      subtitle,
      start,
      end,
      location,
      questions: questions.map(q => ({ title: q.title, multiple: q.multiple, values: q.answers.map(a => a.value) })),
    },
  })
}

function addQuestion() {
  state.questions.push({
    id: nanoid(),
    title: '',
    multiple: false,
    answers: [
      {
        id: nanoid(),
        value: '',
      }
    ],
  })
}

function removeAnswerFromQuestion(question: string, answer: string) {
  const q = state.questions.find(q => q.id === question)

  if (q !== undefined) {
    q.answers = q.answers.filter(a => a.id !== answer)

    if (q.answers.length === 0) {
      addAnswerToQuestion(question)
    }
  }
}

function addAnswerToQuestion(id: string) {
  const index = state.questions.findIndex(q => q.id === id)

  if (index !== -1) {
    state.questions[index]?.answers.push({
      id: nanoid(),
      value: '',
    })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4 m-5" @submit="onSubmit">
    <UFormGroup label="Titel van het evenement" name="title">
      <UInput v-model="state.title" type="text" />
    </UFormGroup>

    <UFormGroup label="Sub titel" name="subtitle">
      <UInput v-model="state.subtitle" type="text" />
    </UFormGroup>

    <UFormGroup label="Start" name="start">
      <DateInput v-model="state.start" />
      <TimeInput v-model="state.start" />
    </UFormGroup>

    <UFormGroup label="Einde" name="end">
      <DateInput v-model="state.end" />
      <TimeInput v-model="state.end" />
    </UFormGroup>

    <UFormGroup label="De locatie" name="location">
      <UInput v-model="state.location" type="text" placeholder="Kindcentrum Platijn, Maatstok 1" />
    </UFormGroup>

    <UCard v-for="(question, i) in state.questions" :key="question.id">
      <UFormGroup label="Vraag" :name="`questions.${i}.title`">
        <UTextarea v-model="question.title" />
      </UFormGroup>

      <div class="flex flex-col gap-4 mt-4">
        <div>
          <UCheckbox v-model="question.multiple" name="multiple" label="Meerdere antwoorden mogelijk?" />
        </div>
        <div class="flex gap-2 flex-col">
          <template v-for="(answer, j) in question.answers" :key="answer.id">
            <UFormGroup :name="`questions.${i}.answers.${j}.value`">
              <UInput v-model="answer.value" type="text" placeholder="Antwoord" autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
                <template #trailing>
                  <UButton color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" @click="removeAnswerFromQuestion(question.id, answer.id)" :padded="false" />
                </template>
              </UInput>
            </UFormGroup>
          </template>
        </div>
        <div>
          <UButton icon="lucide:circle-plus" size="sm" color="primary" square variant="solid" @click="addAnswerToQuestion(question.id)" />
        </div>
      </div>
    </UCard>

    <div>
      <UButton
        icon="lucide:circle-plus"
        size="sm"
        color="primary"
        variant="solid"
        label="Voeg vragen toe"
        :trailing="true"
        @click="addQuestion"
      />
    </div>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
