<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MultiSelectAlign } from './context'
import { useEventListener } from '@vueuse/core'
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'
import { cn } from '../../lib/utils'
import { MULTI_SELECT_KEY } from './context'

const props = withDefaults(defineProps<{
  align?: MultiSelectAlign
  class?: HTMLAttributes['class']
}>(), {
  align: 'start',
})

const ctx = inject(MULTI_SELECT_KEY)
if (!ctx)
  throw new Error('MultiSelectContent must be used inside MultiSelectRoot')

ctx.align.value = props.align

const coords = ref({ top: 0, left: 0, width: 0 })

function setContentRef(el: Element | null) {
  ctx.contentRef.value = el as HTMLElement | null
}

function updatePosition() {
  const trigger = ctx.triggerRef.value
  const content = ctx.contentRef.value
  if (!trigger)
    return
  const rect = trigger.getBoundingClientRect()
  const width = Math.max(rect.width, content?.offsetWidth ?? 0)
  let left = rect.left
  if (props.align === 'end')
    left = rect.right - Math.max(rect.width, content?.offsetWidth ?? rect.width)
  if (props.align === 'center')
    left = rect.left + rect.width / 2 - width / 2
  coords.value = {
    top: rect.bottom + 4,
    left,
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

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    ctx.moveFocus(1)
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    ctx.moveFocus(-1)
  }
  else if (event.key === 'Home') {
    event.preventDefault()
    ctx.focusedIndex.value = 0
    ctx.focusActive()
  }
  else if (event.key === 'End') {
    event.preventDefault()
    ctx.focusedIndex.value = Math.max(0, ctx.rows.value.length - 1)
    ctx.focusActive()
  }
  else if (event.key === 'Escape') {
    event.preventDefault()
    ctx.closeAndRestoreFocus()
  }
  else if (event.key === 'Tab') {
    const root = ctx.contentRef.value
    if (!root)
      return
    const focusable = Array.from(root.querySelectorAll<HTMLElement>('input, button'))
    if (!focusable.length)
      return
    const current = document.activeElement as HTMLElement | null
    const index = current ? focusable.indexOf(current) : -1
    event.preventDefault()
    const next = event.shiftKey
      ? (index <= 0 ? focusable.length - 1 : index - 1)
      : (index >= focusable.length - 1 ? 0 : index + 1)
    const nextEl = focusable[next]
    if (nextEl?.tagName === 'BUTTON')
      ctx.focusTarget.value = 'button'
    else
      ctx.focusTarget.value = 'checkbox'
    const rowIndex = ctx.rows.value.findIndex(row => nextEl && (nextEl.id.startsWith(row.id) || nextEl.closest(`[data-row-id="${row.id}"]`)))
    if (rowIndex >= 0)
      ctx.focusedIndex.value = rowIndex
    nextEl?.focus()
  }
}

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
  minWidth: `${coords.value.width}px`,
}))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="ctx.open.value"
      :ref="setContentRef"
      role="listbox"
      aria-multiselectable="true"
      data-slot="multi-select-content"
      :data-align="align"
      :style="style"
      :class="cn(
        'fixed z-50 max-h-72 overflow-y-auto rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-1 shadow-md',
        props.class,
      )"
      @keydown="onKeydown"
    >
      <slot />
    </div>
  </Teleport>
</template>
