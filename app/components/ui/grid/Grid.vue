<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, provide } from 'vue'
import { cn } from '@/lib/utils'
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

const heightStyle = computed(() => {
  if (props.height === 'preserve-aspect-ratio')
    return undefined
  return props.height
})
</script>

<template>
  <div
    data-slot="grid"
    :data-hide-guides="hideGuides"
    :class="cn('relative isolate grid w-full', props.class)"
    :style="{
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      aspectRatio: height === 'preserve-aspect-ratio' ? `${columns} / ${rows}` : undefined,
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
        v-for="i in columns + 1"
        :key="`col-${i}`"
        v-show="hideGuides !== 'column'"
        class="absolute top-0 bottom-0"
        :class="system.dashedGuides.value
          ? 'border-l border-dashed border-[var(--ds-gray-alpha-400)]'
          : 'bg-[var(--ds-gray-alpha-400)]'"
        :style="{
          left: i === columns + 1 ? undefined : `${((i - 1) / columns) * 100}%`,
          right: i === columns + 1 ? 0 : undefined,
          width: system.dashedGuides.value ? undefined : `${system.guideWidth.value}px`,
        }"
      />
      <div
        v-for="i in rows + 1"
        :key="`row-${i}`"
        v-show="hideGuides !== 'row'"
        class="absolute right-0 left-0"
        :class="system.dashedGuides.value
          ? 'border-t border-dashed border-[var(--ds-gray-alpha-400)]'
          : 'bg-[var(--ds-gray-alpha-400)]'"
        :style="{
          top: i === rows + 1 ? undefined : `${((i - 1) / rows) * 100}%`,
          bottom: i === rows + 1 ? 0 : undefined,
          height: system.dashedGuides.value ? undefined : `${system.guideWidth.value}px`,
        }"
      />
    </div>
    <slot />
  </div>
</template>
