<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'
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
const coords = ref({ top: 0, left: 0, width: 0 })

const visibleCount = computed(() => ctx.options.value.filter(option => !option.isHidden()).length)
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
  const next: Record<string, string> = {
    top: `${coords.value.top}px`,
    left: `${coords.value.left}px`,
    minWidth: `${coords.value.width}px`,
  }
  if (props.maxWidth)
    next.maxWidth = `${props.maxWidth}px`
  return next
})

function updatePosition() {
  const trigger = ctx.triggerRef.value
  if (!trigger)
    return
  const rect = trigger.getBoundingClientRect()
  coords.value = {
    top: rect.bottom + 4,
    left: rect.left,
    width: rect.width,
  }
}

watch(() => ctx.open.value, async (open) => {
  if (!open)
    return
  await nextTick()
  updatePosition()
})

onMounted(() => {
  if (ctx.open.value)
    updatePosition()
})

useEventListener(window, 'resize', () => {
  if (ctx.open.value)
    updatePosition()
}, { passive: true })

useEventListener(window, 'scroll', () => {
  if (ctx.open.value)
    updatePosition()
}, { passive: true, capture: true })

onClickOutside(listRef, (event) => {
  if (!ctx.open.value)
    return
  const target = event.target as Node | null
  if (target && ctx.triggerRef.value?.contains(target))
    return
  ctx.setOpen(false)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-show="ctx.open.value"
      ref="listRef"
      role="listbox"
      data-slot="combobox-list"
      :style="style"
      :class="cn(
        'fixed z-50 max-h-72 overflow-y-auto rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-1 shadow-md',
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
  </Teleport>
</template>
