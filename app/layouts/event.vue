<script setup lang="ts">
// import { useScroll } from '@vueuse/core'

// const { x, y, isScrolling, arrivedState, directions } = useScroll(window, {
//   offset: {
//     top: 30,
//   },
// })
//
// watch(() => arrivedState.top, (state) => {
//   console.log(state)
// })
</script>

<template>
  <UContainer class="mt-10">
    <slot />
  </UContainer>

  <div class="my-20">
    <p class="text-sm text-center text-gray-600">Tot snel, buurtvereniging Dijkstraten</p>
  </div>
</template>
