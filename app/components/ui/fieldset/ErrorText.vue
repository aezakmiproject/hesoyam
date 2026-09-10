<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="error-text"
    role="alert"
    :class="cn('flex items-start gap-2 text-[14px] leading-5 text-[var(--ds-red-700)]', props.class)"
  >
    <HugeiconsIcon :icon="AlertCircleIcon" :size="16" class="mt-0.5 shrink-0" />
    <span><slot /></span>
  </p>
</template>
