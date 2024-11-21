<script setup lang="ts">
import { format, setHours, setMinutes, setSeconds } from 'date-fns'

const props = defineProps<{
  modelValue: Date
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', date: Date): void
}>()

const date = computed({
  get: () => format(props.modelValue, 'HH:mm'),
  set: val => {
    let date = props.modelValue

    date = setHours(date, Number(val.split(':')[0]))
    date = setMinutes(date, Number(val.split(':')[1]))
    date = setSeconds(date, 0)

    emit('update:modelValue', date)

    return format(date, 'HH:mm')
  }
})
</script>

<template>
  <UInput v-model="date" type="time" />
</template>
