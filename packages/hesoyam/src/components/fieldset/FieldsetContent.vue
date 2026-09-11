<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="fieldset-content"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled || undefined"
    :class="cn(
      'flex flex-col gap-1.5 p-6',
      disabled && 'pointer-events-none select-none opacity-50',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
