<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="note-action"
    :class="cn('ml-auto shrink-0 self-center', props.class)"
  >
    <slot />
  </div>
</template>
