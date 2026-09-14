<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../lib/utils'

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | number

const SIZE_MAP: Record<Exclude<SpinnerSize, number>, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 36,
  '3xl': 48,
  '4xl': 64,
}

interface BladePreset {
  px: number
  count: number
  barW: number
  barH: number
  duration: number
}

const BLADE_PRESETS: BladePreset[] = [
  { px: 12, count: 8, barW: 3, barH: 1.5, duration: 1000 },
  { px: 16, count: 10, barW: 4, barH: 1.5, duration: 1000 },
  { px: 20, count: 12, barW: 5, barH: 2, duration: 1200 },
  { px: 24, count: 12, barW: 6, barH: 2.5, duration: 1200 },
  { px: 32, count: 15, barW: 8, barH: 2.5, duration: 1200 },
  { px: 40, count: 15, barW: 10, barH: 3, duration: 1200 },
  { px: 56, count: 18, barW: 14, barH: 3.5, duration: 1300 },
]

function nearestPreset(px: number): BladePreset {
  return BLADE_PRESETS.reduce((best, preset) =>
    Math.abs(preset.px - px) < Math.abs(best.px - px) ? preset : best,
  )
}

const props = withDefaults(defineProps<{
  size?: SpinnerSize
  circle?: boolean
  class?: HTMLAttributes['class']
}>(), {
  size: 'md',
  circle: false,
})

const px = computed(() =>
  typeof props.size === 'number' ? props.size : SIZE_MAP[props.size],
)

const blades = computed(() => {
  const preset = nearestPreset(px.value)
  const scale = px.value / preset.px
  return Array.from({ length: preset.count }, (_, i) => ({
    rotate: (360 / preset.count) * i,
    delay: -Math.round(preset.duration * (preset.count - 1 - i) / preset.count),
    duration: preset.duration,
    width: preset.barW * scale,
    height: preset.barH * scale,
  }))
})

const rootClass = computed(() =>
  cn(
    'ds-spinner-animated inline-block shrink-0',
    props.circle
      ? 'text-[var(--ds-gray-1000)]'
      : 'relative aspect-square transform-gpu text-[var(--ds-gray-700)]',
    props.class,
  ),
)
</script>

<template>
  <svg
    v-if="circle"
    data-slot="spinner"
    data-circle=""
    viewBox="0 0 16 16"
    fill="none"
    :width="px"
    :height="px"
    :class="rootClass"
    style="animation: ds-spinner-rotate 0.7s linear infinite"
    role="status"
    aria-label="Loading"
  >
    <circle
      cx="8"
      cy="8"
      r="6.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-opacity="0.2"
    />
    <path
      d="M14.5 8a6.5 6.5 0 0 0-6.5-6.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>

  <div
    v-else
    data-slot="spinner"
    role="status"
    aria-label="Loading"
    :class="rootClass"
    :style="{ width: `${px}px`, height: `${px}px` }"
  >
    <div
      v-for="(bar, i) in blades"
      :key="i"
      aria-hidden="true"
      class="absolute top-1/2 left-1/2 origin-center rounded-full bg-current will-change-transform"
      :style="{
        width: `${bar.width}px`,
        height: `${bar.height}px`,
        '--animation-delay': `${bar.delay}ms`,
        '--animation-duration': `${bar.duration}ms`,
        animation: 'ds-spinner-opacity var(--animation-duration, 1.2s) linear infinite',
        animationDelay: 'var(--animation-delay, 0)',
        transform: `rotate(${bar.rotate}deg) translate(146%)`,
      }"
    />
  </div>
</template>
