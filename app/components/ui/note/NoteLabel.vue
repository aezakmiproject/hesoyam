<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <strong
    data-slot="note-label"
    :class="cn('mr-1 font-medium text-[var(--note-icon,var(--ds-gray-1000))]', props.class)"
  >
    <slot />
  </strong>
</template>
