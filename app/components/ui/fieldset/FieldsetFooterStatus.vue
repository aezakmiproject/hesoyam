<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="fieldset-footer-status"
    :class="cn('min-w-0 flex-1 text-[13px] leading-5 text-[var(--ds-gray-900)]', props.class)"
  >
    <slot />
  </div>
</template>
