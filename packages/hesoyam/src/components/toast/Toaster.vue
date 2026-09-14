<script setup lang="ts">
import Toast from './Toast.vue'
import { toasts } from './useToasts'
import { computed } from 'vue'

const items = computed(() => [...toasts.value].reverse())
</script>

<template>
  <TransitionGroup
    tag="div"
    name="ds-toast"
    data-slot="toaster"
    class="pointer-events-none fixed top-0 right-0 z-50 flex flex-col items-end gap-2 p-4 sm:p-6"
  >
    <div v-for="item in items" :key="item.id">
      <Toast :toast="item" />
    </div>
  </TransitionGroup>
</template>
