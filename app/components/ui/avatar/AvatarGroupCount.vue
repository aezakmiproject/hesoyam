<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="avatar-group-count"
    :class="cn(
      'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--ds-gray-200)] text-[var(--ds-gray-1000)] text-xs font-medium ring-2 ring-[var(--ds-background-100)] group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
