<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { MULTI_SELECT_KEY } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const ctx = inject(MULTI_SELECT_KEY)
if (!ctx)
  throw new Error('MultiSelectTrigger must be used inside MultiSelectRoot')

function setTriggerRef(el: Element | null) {
  ctx.triggerRef.value = el as HTMLElement | null
}

function onToggle() {
  if (ctx.open.value)
    ctx.closeAndRestoreFocus()
  else
    ctx.setOpen(true)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && ctx.open.value) {
    event.preventDefault()
    ctx.closeAndRestoreFocus()
    return
  }
  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    ctx.setOpen(true)
  }
}
</script>

<template>
  <button
    :ref="setTriggerRef"
    type="button"
    data-slot="multi-select-trigger"
    :aria-expanded="ctx.open.value"
    aria-haspopup="listbox"
    :class="cn(
      'flex h-8 w-full min-w-0 items-center justify-between gap-2 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2.5 text-left text-[13px] text-[var(--ds-gray-1000)] outline-none transition-colors',
      'focus-visible:border-[var(--ds-gray-1000)] focus-visible:ring-1 focus-visible:ring-[var(--ds-gray-1000)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
    @click="onToggle"
    @keydown="onKeydown"
  >
    <span class="min-w-0 truncate">
      <slot />
    </span>
    <HugeiconsIcon
      :icon="ArrowDown01Icon"
      :size="16"
      color="currentColor"
      :stroke-width="1.75"
      :class="cn('shrink-0 text-[var(--ds-gray-900)] transition-transform', ctx.open.value && 'rotate-180')"
    />
  </button>
</template>
