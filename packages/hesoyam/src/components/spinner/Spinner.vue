<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

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

const props = withDefaults(defineProps<{
  size?: SpinnerSize
  class?: HTMLAttributes['class']
}>(), {
  size: 'md',
})

const px = computed(() =>
  typeof props.size === 'number' ? props.size : SIZE_MAP[props.size],
)
</script>

<template>
  <svg
    data-slot="spinner"
    viewBox="0 0 16 16"
    fill="none"
    :width="px"
    :height="px"
    :class="cn('ds-spinner-animated inline-block shrink-0 text-[var(--ds-gray-1000)]', props.class)"
    style="animation: ds-spinner-rotate 0.7s linear infinite"
    role="status"
    aria-hidden="true"
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
</template>
