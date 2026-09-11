<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h2
    data-slot="fieldset-title"
    :class="cn('text-[16px] leading-6 font-medium text-[var(--ds-gray-1000)]', props.class)"
  >
    <slot />
  </h2>
</template>
