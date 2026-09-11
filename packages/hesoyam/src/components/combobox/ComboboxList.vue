<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { computed, inject, ref } from 'vue'
import { cn } from '../../lib/utils'
import { COMBOBOX_KEY } from './context'

const props = defineProps<{
  maxWidth?: number
  emptyMessage?: string
  class?: HTMLAttributes['class']
}>()

const ctx = inject(COMBOBOX_KEY)
if (!ctx)
  throw new Error('ComboboxList must be used inside Combobox')

const listRef = ref<HTMLElement | null>(null)

const visibleCount = computed(() => ctx.options.value.filter(option => !option.hidden.value).length)
const showEmpty = computed(() => ctx.open.value && visibleCount.value === 0)

const emptyText = computed(() => {
  if (props.emptyMessage)
    return props.emptyMessage
  const query = ctx.query.value.trim()
  if (query)
    return `No items match "${query}"`
  return 'No items.'
})

const style = computed(() => {
  const next: Record<string, string> = {}
  if (props.maxWidth)
    next.maxWidth = `${props.maxWidth}px`
  return next
})

onClickOutside(listRef, (event) => {
  if (!ctx.open.value)
    return
  const target = event.target as HTMLElement | null
  if (target?.closest('[data-slot="combobox-input"]'))
    return
  ctx.setOpen(false)
})
</script>

<template>
  <div
    v-show="ctx.open.value"
    ref="listRef"
    role="listbox"
    data-slot="combobox-list"
    :style="style"
    :class="cn(
      'absolute top-full right-0 left-0 z-50 mt-1 max-h-72 min-w-full overflow-y-auto rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-1 shadow-md',
      props.maxWidth && 'w-max',
      props.class,
    )"
  >
    <slot />
    <div
      v-if="showEmpty"
      data-slot="combobox-empty"
      class="px-2 py-1.5 text-[13px] text-[var(--ds-gray-900)]"
    >
      {{ emptyText }}
    </div>
  </div>
</template>
