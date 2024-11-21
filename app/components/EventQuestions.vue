<script setup lang="ts">
const props = defineProps<{
  questions: string[],
  modelValue: string[],
  multiple: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', answers: string[]): void
}>()

const answers = computed({
  get: () => props.modelValue,
  set: (val: string[]) => emit('update:modelValue', val),
})

const selected = computed({
  get: () => props.modelValue[0],
  set: val => emit('update:modelValue', [ val ]),
})
</script>

<template>
  <template v-if="multiple">
    <UCheckbox
      v-model="answers"
      v-for="question in questions"
      :label="question"
      :name="question"
      :value="question"
      :key="question"
    />
  </template>
  <template v-else>
    <URadioGroup v-model="selected" :options="questions" />
  </template>
</template>
