<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  highlight?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="fieldset-footer"
    :data-highlight="highlight ? '' : undefined"
    :class="cn(
      'flex min-h-12 flex-wrap items-center justify-between gap-3 border-t px-6 py-3',
      highlight
        ? 'border-[var(--ds-amber-400)] bg-[var(--ds-amber-100)] text-[var(--ds-gray-1000)]'
        : 'border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
