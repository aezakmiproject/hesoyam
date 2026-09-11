<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  previous?: { title: string, href: string }
  next?: { title: string, href: string }
  class?: string
}>()
</script>

<template>
  <nav
    data-slot="pagination"
    aria-label="Pagination"
    :class="cn('flex w-full items-start justify-between gap-6', props.class)"
  >
    <a
      v-if="previous"
      :href="previous.href"
      :aria-label="`Go to previous page: ${previous.title}`"
      data-slot="pagination-previous"
      :class="cn(
        'group/prev min-w-0 max-w-[50%] rounded-[6px] no-underline outline-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
      )"
    >
      <span class="flex items-center gap-1 text-[13px] text-[var(--ds-gray-900)] transition-colors group-hover/prev:text-[var(--ds-gray-1000)]">
        <ChevronLeft :size="14" class="shrink-0" />
        Previous
      </span>
      <span class="mt-1 block truncate text-[14px] font-medium text-[var(--ds-gray-1000)]">
        {{ previous.title }}
      </span>
    </a>
    <span v-else />

    <a
      v-if="next"
      :href="next.href"
      :aria-label="`Go to next page: ${next.title}`"
      data-slot="pagination-next"
      :class="cn(
        'group/next ml-auto min-w-0 max-w-[50%] rounded-[6px] text-right no-underline outline-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
      )"
    >
      <span class="flex items-center justify-end gap-1 text-[13px] text-[var(--ds-gray-900)] transition-colors group-hover/next:text-[var(--ds-gray-1000)]">
        Next
        <ChevronRight :size="14" class="shrink-0" />
      </span>
      <span class="mt-1 block truncate text-[14px] font-medium text-[var(--ds-gray-1000)]">
        {{ next.title }}
      </span>
    </a>
  </nav>
</template>
