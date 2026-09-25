<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: 'default' | 'sm'
}>(), {
  size: 'default',
})
</script>

<template>
  <div
    data-slot="card"
    :data-size="size"
    :class="cn('bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] rounded-lg border border-[var(--ds-gray-alpha-400)] text-[13px] group/card flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
