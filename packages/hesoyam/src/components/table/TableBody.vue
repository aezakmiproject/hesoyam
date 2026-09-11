<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject, watch } from 'vue'
import { cn } from '@/lib/utils'
import { tableContextKey } from './context'

const props = defineProps<{
  striped?: boolean
  bordered?: boolean
  interactive?: boolean
  virtualize?: boolean
  class?: HTMLAttributes['class']
}>()

const table = inject(tableContextKey, null)

watch(() => props.virtualize, (value) => {
  if (table)
    table.virtualize.value = Boolean(value)
}, { immediate: true })
</script>

<template>
  <tbody
    data-slot="table-body"
    :data-striped="striped ? '' : undefined"
    :data-bordered="bordered ? '' : undefined"
    :data-interactive="interactive ? '' : undefined"
    :data-virtualize="virtualize ? '' : undefined"
    :class="cn(
      striped && '[&_tr:nth-child(even)]:bg-[var(--ds-gray-100)]',
      bordered && '[&_td]:border [&_td]:border-[var(--ds-gray-alpha-400)] [&_th]:border [&_th]:border-[var(--ds-gray-alpha-400)]',
      interactive && '[&_tr]:cursor-pointer [&_tr]:transition-colors [&_tr:hover]:bg-[var(--ds-gray-100)]',
      props.class,
    )"
  >
    <slot />
  </tbody>
</template>
