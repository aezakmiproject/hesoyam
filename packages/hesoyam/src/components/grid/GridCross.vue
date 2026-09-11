<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { cn } from '../../lib/utils'
import { gridKey } from './utils'

const props = defineProps<{
  column: number
  row: number
  class?: HTMLAttributes['class']
}>()

const grid = inject(gridKey)

const left = computed(() => {
  const cols = grid?.columns.value ?? 1
  return `${((props.column - 1) / cols) * 100}%`
})

const top = computed(() => {
  const rows = grid?.rows.value ?? 1
  return `${((props.row - 1) / rows) * 100}%`
})
</script>

<template>
  <div
    data-slot="grid-cross"
    aria-hidden="true"
    :class="cn('pointer-events-none absolute z-[2] size-3 -translate-x-1/2 -translate-y-1/2', props.class)"
    :style="{ left, top }"
  >
    <span class="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-[var(--ds-gray-1000)]" />
    <span class="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-[var(--ds-gray-1000)]" />
  </div>
</template>
