<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('px-4 py-4 group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:py-3 flex items-center gap-2', props.class)"
  >
    <slot />
  </div>
</template>
