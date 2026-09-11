<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: 'default' | 'sm'
}>(), {
  size: 'default',
})
</script>

<template>
  <div
    data-slot="card"
    :data-size="size"
    :class="cn('bg-card text-card-foreground gap-3 overflow-hidden rounded-lg py-3 text-[13px] ring-1 ring-border has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:py-2.5 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg group/card flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
