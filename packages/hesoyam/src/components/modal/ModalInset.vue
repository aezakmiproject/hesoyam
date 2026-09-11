<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  last?: boolean
  class?: HTMLAttributes['class']
}>(), {
  last: false,
})
</script>

<template>
  <div
    data-slot="modal-inset"
    :data-last="last ? '' : undefined"
    :class="cn(
      '-mx-6 border-y border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] px-6 py-4',
      last && '-mb-6 border-b-0',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
