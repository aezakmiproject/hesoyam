<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, provide } from 'vue'
import { cn } from '../../lib/utils'
import {
  gridKey,
  resolveResponsive,
  useGridSystem,
  type HideGuides,
  type Responsive,
} from './utils'

const props = withDefaults(defineProps<{
  columns?: Responsive<number>
  rows?: Responsive<number>
  height?: 'preserve-aspect-ratio' | string
  hideGuides?: HideGuides
  class?: HTMLAttributes['class']
}>(), {
  columns: 1,
  rows: 1,
})

const system = useGridSystem()
const columns = computed(() => resolveResponsive(props.columns, system.breakpoint.value, 1))
const rows = computed(() => resolveResponsive(props.rows, system.breakpoint.value, 1))

provide(gridKey, { columns, rows })

const preserveRatio = computed(() => props.height === 'preserve-aspect-ratio')
const heightStyle = computed(() => {
  if (preserveRatio.value)
    return undefined
  return props.height
})
const rowTemplate = computed(() => {
  // minmax(0, 1fr) with an auto-height grid collapses every row to 0.
  if (props.height)
    return `repeat(${rows.value}, minmax(0, 1fr))`
  return `repeat(${rows.value}, minmax(auto, 1fr))`
})
const guideWidth = computed(() => `${system.guideWidth.value}px`)
const internalColumns = computed(() => Math.max(columns.value - 1, 0))
const internalRows = computed(() => Math.max(rows.value - 1, 0))
</script>

<template>
  <div
    data-slot="grid"
    :data-hide-guides="hideGuides"
    :class="cn(
      'relative isolate grid w-full border-[var(--ds-gray-alpha-400)]',
      system.dashedGuides.value ? 'border-dashed' : 'border-solid',
      hideGuides === 'column' ? 'border-y' : hideGuides === 'row' ? 'border-x' : 'border',
      props.class,
    )"
    :style="{
      '--guide-width': guideWidth,
      borderWidth: guideWidth,
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gridTemplateRows: rowTemplate,
      aspectRatio: preserveRatio ? `${columns} / ${rows}` : undefined,
      height: heightStyle,
    }"
  >
    <div
      aria-hidden="true"
      data-slot="grid-guides"
      :data-hide="hideGuides"
      :data-dashed="system.dashedGuides.value ? '' : undefined"
      class="pointer-events-none absolute inset-0 z-0"
    >
      <div
        v-for="i in internalColumns"
        :key="`col-${i}`"
        v-show="hideGuides !== 'column'"
        class="absolute top-0 bottom-0"
        :class="system.dashedGuides.value
          ? 'border-l border-dashed border-[var(--ds-gray-alpha-400)]'
          : 'bg-[var(--ds-gray-alpha-400)]'"
        :style="{
          left: `calc(${(i / columns) * 100}% - ${guideWidth})`,
          width: system.dashedGuides.value ? undefined : guideWidth,
        }"
      />
      <div
        v-for="i in internalRows"
        :key="`row-${i}`"
        v-show="hideGuides !== 'row'"
        class="absolute right-0 left-0"
        :class="system.dashedGuides.value
          ? 'border-t border-dashed border-[var(--ds-gray-alpha-400)]'
          : 'bg-[var(--ds-gray-alpha-400)]'"
        :style="{
          top: `calc(${(i / rows) * 100}% - ${guideWidth})`,
          height: system.dashedGuides.value ? undefined : guideWidth,
        }"
      />
    </div>
    <slot />
  </div>
</template>
