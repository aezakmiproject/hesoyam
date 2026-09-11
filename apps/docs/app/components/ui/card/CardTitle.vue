<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@aezakmiproject/hesoyam'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-title"
    :class="cn('text-[13px] font-medium', props.class)"
  >
    <slot />
  </div>
</template>
