<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <table
    data-slot="table"
    :class="cn('w-full caption-bottom border-collapse text-[13px]', props.class)"
  >
    <slot />
  </table>
</template>
