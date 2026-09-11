<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TriangleAlert } from '@lucide/vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="warning-text"
    role="status"
    :class="cn('flex items-start gap-2 text-[14px] leading-5 text-[var(--ds-amber-700)]', props.class)"
  >
    <TriangleAlert :size="16" class="mt-0.5 shrink-0" />
    <span><slot /></span>
  </p>
</template>
