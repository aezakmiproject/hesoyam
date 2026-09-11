<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export type GaugeSize = 'tiny' | 'small' | 'medium' | 'large'
export type GaugeArcPriority = 'primary' | 'equal'
export type GaugeColors =
  | { primary?: string, secondary?: string }
  | Record<string, string>

const props = withDefaults(defineProps<{
  value: number
  size?: GaugeSize
  showValue?: boolean
  colors?: GaugeColors
  arcPriority?: GaugeArcPriority
  indeterminate?: boolean
  class?: HTMLAttributes['class']
}>(), {
  size: 'medium',
  showValue: false,
  arcPriority: 'primary',
  indeterminate: false,
})

const SIZE_PX: Record<GaugeSize, number> = {
  tiny: 20,
  small: 32,
  medium: 64,
  large: 96,
}

const STROKE: Record<GaugeSize, number> = {
  tiny: 12,
  small: 10,
  medium: 8,
  large: 8,
}

const FONT: Record<GaugeSize, number> = {
  tiny: 0,
  small: 28,
  medium: 28,
  large: 26,
}

const DEFAULT_SCALE: Record<number, string> = {
  0: 'var(--ds-red-700)',
  33: 'var(--ds-amber-700)',
  66: 'var(--ds-green-700)',
}

const circleSize = 100
const gapPercent = 5
const strokePercent = computed(() => Math.min(100, Math.max(0, props.value)))
const strokeWidth = computed(() => STROKE[props.size])
const radius = computed(() => circleSize / 2 - strokeWidth.value / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const percentToPx = computed(() => circumference.value / 100)
const percentToDegree = 360 / 100
const equal = computed(() => props.arcPriority === 'equal')
const offsetFactor = computed(() => (equal.value ? 0.5 : 0))
const offsetFactorSecondary = computed(() => 1 - offsetFactor.value)
const pixelSize = computed(() => SIZE_PX[props.size])

function isNamedColors(colors: GaugeColors): colors is { primary?: string, secondary?: string } {
  return 'primary' in colors || 'secondary' in colors
}

function colorFromScale(scale: Record<string | number, string>, value: number): string {
  const keys = Object.keys(scale)
    .map(Number)
    .filter(n => !Number.isNaN(n))
    .sort((a, b) => a - b)
  let color = scale[keys[0] ?? 0] ?? 'var(--ds-gray-700)'
  for (const key of keys) {
    if (value >= key)
      color = scale[key] ?? color
  }
  return color
}

const primaryStroke = computed(() => {
  const colors = props.colors
  if (colors && isNamedColors(colors) && colors.primary)
    return colors.primary
  if (colors && !isNamedColors(colors))
    return colorFromScale(colors, strokePercent.value)
  return colorFromScale(DEFAULT_SCALE, strokePercent.value)
})

const secondaryStroke = computed(() => {
  const colors = props.colors
  if (colors && isNamedColors(colors) && colors.secondary)
    return colors.secondary
  return 'var(--ds-gray-400)'
})

const primaryStrokeDasharray = computed(() => {
  const subtract = offsetFactor.value > 0 && strokePercent.value > 100 - gapPercent * 2 * offsetFactor.value
    ? -strokePercent.value + 100
    : gapPercent * 2 * offsetFactor.value
  return `${Math.max(strokePercent.value * percentToPx.value - subtract * percentToPx.value, 0)} ${circumference.value}`
})

const secondaryStrokeDasharray = computed(() => {
  const subtract = offsetFactorSecondary.value < 1 && strokePercent.value < gapPercent * 2 * offsetFactorSecondary.value
    ? strokePercent.value
    : gapPercent * 2 * offsetFactorSecondary.value
  return `${Math.max((100 - strokePercent.value) * percentToPx.value - subtract * percentToPx.value, 0)} ${circumference.value}`
})

const primaryTransform = computed(() => {
  const add = offsetFactor.value > 0 && strokePercent.value > 100 - gapPercent * 2 * offsetFactor.value
    ? 0.5 * (-strokePercent.value + 100)
    : gapPercent * offsetFactor.value
  return `rotate(${-90 + add * percentToDegree}deg)`
})

const secondaryTransform = computed(() => {
  const subtract = offsetFactorSecondary.value < 1 && strokePercent.value < gapPercent * 2 * offsetFactorSecondary.value
    ? 0.5 * strokePercent.value
    : gapPercent * offsetFactorSecondary.value
  return `rotate(${360 - 90 - subtract * percentToDegree}deg) scaleY(-1)`
})

const primaryOpacity = computed(() => {
  if (
    offsetFactor.value > 0
    && strokePercent.value < gapPercent * 2 * offsetFactor.value
    && strokePercent.value < gapPercent * 2 * offsetFactorSecondary.value
  ) {
    return 0
  }
  return 1
})

const secondaryOpacity = computed(() => {
  if (
    (offsetFactor.value === 0 && strokePercent.value > 100 - gapPercent * 2)
    || (
      offsetFactor.value > 0
      && strokePercent.value > 100 - gapPercent * 2 * offsetFactor.value
      && strokePercent.value > 100 - gapPercent * 2 * offsetFactorSecondary.value
    )
  ) {
    return 0
  }
  return 1
})

const displayValue = computed(() => Math.round(strokePercent.value))
</script>

<template>
  <div
    data-slot="gauge"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : displayValue"
    :aria-busy="indeterminate || undefined"
    :data-size="size"
    :data-indeterminate="indeterminate ? '' : undefined"
    :class="cn('relative inline-flex items-center justify-center', showValue && size === 'tiny' && 'gap-1.5', props.class)"
    :style="size === 'tiny' && showValue ? undefined : { width: `${pixelSize}px`, height: `${pixelSize}px` }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${circleSize} ${circleSize}`"
      fill="none"
      :width="pixelSize"
      :height="pixelSize"
      :class="cn('block', indeterminate && 'animate-[ds-spinner-rotate_1s_linear_infinite]')"
      style="user-select: none; transform-origin: 50% 50%"
    >
      <circle
        :cx="circleSize / 2"
        :cy="circleSize / 2"
        :r="radius"
        :stroke="secondaryStroke"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke-dasharray="secondaryStrokeDasharray"
        :stroke-dashoffset="0"
        :opacity="secondaryOpacity"
        :style="{ transform: secondaryTransform, transformOrigin: '50% 50%' }"
      />
      <circle
        :cx="circleSize / 2"
        :cy="circleSize / 2"
        :r="radius"
        :stroke="primaryStroke"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke-dasharray="primaryStrokeDasharray"
        :stroke-dashoffset="0"
        :opacity="primaryOpacity"
        :style="{
          transform: primaryTransform,
          transformOrigin: '50% 50%',
          transition: indeterminate ? undefined : 'stroke-dasharray 400ms ease, stroke 400ms ease, transform 400ms ease',
        }"
      />
      <text
        v-if="showValue && size !== 'tiny'"
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--ds-gray-1000)"
        :font-size="FONT[size]"
        font-weight="500"
        font-family="var(--font-sans)"
      >
        {{ displayValue }}
      </text>
    </svg>
    <span
      v-if="showValue && size === 'tiny'"
      class="text-[11px] leading-none font-medium text-[var(--ds-gray-1000)]"
    >{{ displayValue }}</span>
    <div
      v-if="$slots.default"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <slot />
    </div>
  </div>
</template>
