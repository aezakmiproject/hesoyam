<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-header"
    :class="cn('px-4 py-4 group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:py-3 group/card-header @container/card-header grid auto-rows-min gap-1 items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]', props.class)"
  >
    <slot />
  </div>
</template>
