<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn('border-b border-[var(--ds-gray-alpha-400)] last:border-b-0 px-4 pb-4 group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:pb-3', props.class)"
  >
    <slot />
  </div>
</template>
