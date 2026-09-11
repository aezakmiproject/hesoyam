<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { resolveResponsive, toGridLine, useGridSystem, type Responsive } from './utils'

const props = defineProps<{
  column?: Responsive<string | number>
  row?: Responsive<string | number>
  solid?: boolean
  class?: HTMLAttributes['class']
}>()

const system = useGridSystem()

const gridColumn = computed(() => {
  if (props.column === undefined)
    return undefined
  return toGridLine(resolveResponsive(props.column, system.breakpoint.value, 1))
})
const gridRow = computed(() => {
  if (props.row === undefined)
    return undefined
  return toGridLine(resolveResponsive(props.row, system.breakpoint.value, 1))
})
</script>

<template>
  <div
    data-slot="grid-cell"
    :data-solid="solid ? '' : undefined"
    :class="cn(
      'relative z-[1] flex min-h-0 min-w-0 items-center justify-center p-4 text-[13px] text-[var(--ds-gray-1000)]',
      solid && 'bg-[var(--ds-background-100)]',
      system.debug.value && 'outline outline-1 outline-[var(--ds-blue-700)]/30',
      props.class,
    )"
    :style="{
      gridColumn,
      gridRow,
    }"
  >
    <slot />
  </div>
</template>
