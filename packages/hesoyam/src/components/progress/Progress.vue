<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import type { CSSProperties, HTMLAttributes } from 'vue'
import type { ProgressStop, ProgressType } from '.'
import { reactiveOmit } from '@vueuse/core'
import {
  ProgressIndicator,
  ProgressRoot,
} from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip'

const TYPE_COLORS: Record<ProgressType, string> = {
  success: 'var(--ds-green-700)',
  error: 'var(--ds-red-700)',
  warning: 'var(--ds-amber-700)',
  secondary: 'var(--ds-gray-700)',
}

const props = withDefaults(
  defineProps<ProgressRootProps & {
    class?: HTMLAttributes['class']
    value?: number | null
    colors?: Record<number, string>
    type?: ProgressType
    stops?: ProgressStop[]
    width?: number | string
    height?: number | string
  }>(),
  {
    modelValue: 0,
    max: 100,
  },
)

const delegatedProps = reactiveOmit(
  props,
  'class',
  'value',
  'colors',
  'type',
  'stops',
  'width',
  'height',
)

const currentValue = computed(() => {
  const raw = props.value ?? props.modelValue ?? 0
  return raw ?? 0
})

const maxValue = computed(() => props.max ?? 100)

const percent = computed(() => {
  const max = maxValue.value || 100
  return Math.min(100, Math.max(0, (Number(currentValue.value) / max) * 100))
})

function colorForPercent(value: number) {
  if (props.type)
    return TYPE_COLORS[props.type]
  if (!props.colors)
    return 'var(--ds-gray-1000)'
  const keys = Object.keys(props.colors).map(Number).sort((a, b) => a - b)
  let color = props.colors[keys[0]!] ?? 'var(--ds-gray-1000)'
  for (const key of keys) {
    if (value >= key)
      color = props.colors[key]!
  }
  return color
}

const indicatorColor = computed(() => colorForPercent(percent.value))

const rootStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.width != null)
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  if (props.height != null)
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  return style
})
</script>

<template>
  <TooltipProvider>
    <ProgressRoot
      data-slot="progress"
      v-bind="delegatedProps"
      :model-value="currentValue"
      :max="maxValue"
      :class="cn(
        'relative flex w-full items-center overflow-hidden rounded-full bg-[var(--ds-gray-100)]',
        height == null && 'h-1',
        props.class,
      )"
      :style="rootStyle"
    >
      <ProgressIndicator
        data-slot="progress-indicator"
        class="size-full flex-1 rounded-full transition-all"
        :style="{
          transform: `translateX(-${100 - percent}%)`,
          backgroundColor: indicatorColor,
        }"
      />

      <span
        v-for="stop in stops"
        :key="stop.value"
        class="absolute top-0 z-10 h-full w-px -translate-x-1/2 bg-[var(--ds-background-100)]"
        :style="{ left: `${Math.min(100, Math.max(0, (stop.value / maxValue) * 100))}%` }"
        :aria-label="stop.ariaLabel || stop.tooltip"
      >
        <Tooltip v-if="stop.tooltip">
          <TooltipTrigger as-child>
            <span class="absolute inset-y-0 -left-1.5 w-3 cursor-default" />
          </TooltipTrigger>
          <TooltipContent>
            {{ stop.tooltip }}
          </TooltipContent>
        </Tooltip>
      </span>
    </ProgressRoot>
  </TooltipProvider>
</template>
