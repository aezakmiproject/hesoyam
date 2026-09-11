<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
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
const padding = computed(() => {
  const bp = system.breakpoint.value
  if (bp === 'lg')
    return '48px'
  if (bp === 'md')
    return '40px'
  return '24px'
})
</script>

<template>
  <div
    data-slot="grid-cell"
    :data-solid="solid ? '' : undefined"
    :class="cn(
      'relative z-[2] flex min-w-0 flex-col items-stretch justify-center text-center text-[13px] text-[var(--ds-gray-1000)]',
      solid && 'bg-[var(--ds-background-100)]',
      system.debug.value && 'outline outline-1 outline-[var(--ds-blue-700)]/30',
      props.class,
    )"
    :style="{
      gridColumn,
      gridRow,
      padding,
      marginRight: 'var(--guide-width, 1px)',
      marginBottom: 'var(--guide-width, 1px)',
    }"
  >
    <slot />
  </div>
</template>
