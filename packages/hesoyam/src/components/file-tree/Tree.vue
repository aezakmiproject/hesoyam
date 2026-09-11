<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide } from 'vue'
import { cn } from '../../lib/utils'
import { treeDepthKey } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

provide(treeDepthKey, 0)
</script>

<template>
  <ul
    data-slot="tree"
    role="tree"
    :class="cn(
      'm-0 flex list-none flex-col gap-0.5 p-0 font-mono text-[13px] leading-5 text-[var(--ds-gray-1000)]',
      props.class,
    )"
  >
    <slot />
  </ul>
</template>
