<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export type LoadingDotsSize = 'sm' | 'md' | 'lg' | number

const SIZE_MAP: Record<Exclude<LoadingDotsSize, number>, number> = {
  sm: 4,
  md: 6,
  lg: 8,
}

const props = withDefaults(defineProps<{
  size?: LoadingDotsSize
  class?: HTMLAttributes['class']
}>(), {
  size: 'md',
})

const px = computed(() =>
  typeof props.size === 'number' ? props.size : SIZE_MAP[props.size],
)

const gap = computed(() => Math.max(2, Math.round(px.value * 0.5)))
</script>

<template>
  <span
    data-slot="loading-dots"
    aria-live="polite"
    :class="cn('inline-flex items-center text-[var(--ds-gray-900)]', props.class)"
    :style="{ gap: `${gap}px` }"
  >
    <slot />
    <span
      class="inline-flex items-center"
      aria-hidden="true"
      :style="{ gap: `${gap}px` }"
    >
      <span
        v-for="i in 3"
        :key="i"
        class="ds-loading-dot rounded-full bg-current"
        :style="{
          width: `${px}px`,
          height: `${px}px`,
          animation: 'ds-loading-dots 1.2s ease-in-out infinite',
          animationDelay: `${(i - 1) * 0.16}s`,
        }"
      />
    </span>
  </span>
</template>
