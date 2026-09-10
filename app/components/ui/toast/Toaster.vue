<script setup lang="ts">
import Toast from './Toast.vue'
import { toasts } from './useToasts'

const items = computed(() => toasts.value)
</script>

<template>
  <div
    data-slot="toaster"
    class="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-start gap-2 p-4 sm:p-6"
  >
    <Toast v-for="item in items" :key="item.id" :toast="item" />
  </div>
</template>
