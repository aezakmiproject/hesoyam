<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="dropdown-menu-shortcut"
    :class="cn('text-[var(--ds-gray-900)] group-focus/dropdown-menu-item:text-[var(--ds-gray-1000)] ml-auto text-[0.625rem] tracking-widest', props.class)"
  >
    <slot />
  </span>
</template>
