<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="grid-page"
    :class="cn('min-h-dvh w-full bg-[var(--ds-background-100)]', props.class)"
  >
    <slot />
  </div>
</template>
