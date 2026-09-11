<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="fieldset-subtitle"
    :class="cn('text-[14px] leading-5 text-[var(--ds-gray-900)]', props.class)"
  >
    <slot />
  </p>
</template>
