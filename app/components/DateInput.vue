<script setup lang="ts">
import { format, setDate, setMonth, setYear } from 'date-fns'

const props = defineProps<{
  modelValue: Date,
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', date: Date): void,
}>()

const formatDate = 'yyyy-MM-dd' as const

const date = computed({
  get: () => format(props.modelValue, formatDate),
  set: val => {
    const parts = val.split('-')

    let date = props.modelValue
    date = setYear(date, Number(parts[0]))
    date = setMonth(date, Number(parts[1]) - 1)
    date = setDate(date, Number(parts[2]))

    emit('update:modelValue', date)

    return val
  }
})
</script>

<template>
  <UInput v-model="date" type="date" />
</template>
