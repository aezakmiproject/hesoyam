<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  colSpan?: number
  rowSpan?: number
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup'
}>()
</script>

<template>
  <th
    data-slot="table-head"
    :colspan="colSpan"
    :rowspan="rowSpan"
    :scope="scope ?? 'col'"
    :class="cn(
      'h-10 px-3 text-left align-middle text-[13px] font-medium whitespace-nowrap text-[var(--ds-gray-900)]',
      props.class,
    )"
  >
    <slot />
  </th>
</template>
