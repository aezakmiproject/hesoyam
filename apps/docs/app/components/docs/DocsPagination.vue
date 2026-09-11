<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const { t } = useI18n()
const { previousPage, nextPage } = useGeistNav()
</script>

<template>
  <nav
    v-if="previousPage || nextPage"
    class="docs-pad flex w-full items-start justify-between gap-6 py-12 lg:py-14"
    :aria-label="$t('geist.pagination.label')"
  >
    <NuxtLink
      v-if="previousPage"
      :to="previousPage.href"
      :aria-label="t('geist.pagination.previousAria', { title: previousPage.title })"
      class="group/prev min-w-0 max-w-[50%] rounded-[6px] no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]"
    >
      <span class="flex items-center gap-1 text-[13px] text-[var(--ds-gray-900)] transition-colors group-hover/prev:text-[var(--ds-gray-1000)]">
        <ChevronLeft :size="14" class="shrink-0" />
        {{ $t('geist.pagination.previous') }}
      </span>
      <span class="mt-1 block truncate text-[14px] font-medium text-[var(--ds-gray-1000)]">
        {{ previousPage.title }}
      </span>
    </NuxtLink>
    <span v-else />

    <NuxtLink
      v-if="nextPage"
      :to="nextPage.href"
      :aria-label="t('geist.pagination.nextAria', { title: nextPage.title })"
      class="group/next ml-auto min-w-0 max-w-[50%] rounded-[6px] text-right no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]"
    >
      <span class="flex items-center justify-end gap-1 text-[13px] text-[var(--ds-gray-900)] transition-colors group-hover/next:text-[var(--ds-gray-1000)]">
        {{ $t('geist.pagination.next') }}
        <ChevronRight :size="14" class="shrink-0" />
      </span>
      <span class="mt-1 block truncate text-[14px] font-medium text-[var(--ds-gray-1000)]">
        {{ nextPage.title }}
      </span>
    </NuxtLink>
  </nav>
</template>
