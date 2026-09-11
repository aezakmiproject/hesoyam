<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<{
  as?: string
  class?: HTMLAttributes['class']
}>(), {
  as: 'ul',
})
</script>

<template>
  <component
    :is="as"
    data-slot="entity-list"
    :class="cn(
      'm-0 flex w-full list-none flex-col divide-y divide-[var(--ds-gray-alpha-400)] p-0',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
