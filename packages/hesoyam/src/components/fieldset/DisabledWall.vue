<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="disabled-wall"
    aria-hidden="true"
    :class="cn(
      'absolute inset-0 z-10 cursor-not-allowed rounded-[inherit] bg-[var(--ds-background-100)]/60',
      props.class,
    )"
  />
</template>
