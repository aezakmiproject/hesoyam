<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  colSpan?: number
  rowSpan?: number
}>()
</script>

<template>
  <td
    data-slot="table-cell"
    :colspan="colSpan"
    :rowspan="rowSpan"
    :class="cn(
      'px-3 py-2.5 align-middle text-[13px] text-[var(--ds-gray-1000)]',
      props.class,
    )"
  >
    <slot />
  </td>
</template>
