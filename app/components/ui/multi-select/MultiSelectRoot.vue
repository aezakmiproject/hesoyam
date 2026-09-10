<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MultiSelectAlign, MultiSelectContext, MultiSelectFocusTarget, MultiSelectRowApi } from './context'
import { onClickOutside } from '@vueuse/core'
import { computed, nextTick, provide, ref } from 'vue'
import { cn } from '@/lib/utils'
import { MULTI_SELECT_KEY } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const align = ref<MultiSelectAlign>('start')
const rows = ref<MultiSelectRowApi[]>([])
const focusedIndex = ref(0)
const focusTarget = ref<MultiSelectFocusTarget>('checkbox')

function focusActive() {
  const row = rows.value[focusedIndex.value]
  if (!row)
    return
  if (focusTarget.value === 'button')
    row.focusButton()
  else
    row.focusCheckbox()
}

function setOpen(next: boolean) {
  open.value = next
  if (next) {
    focusedIndex.value = 0
    focusTarget.value = 'checkbox'
    nextTick(() => focusActive())
  }
}

function closeAndRestoreFocus() {
  open.value = false
  nextTick(() => triggerRef.value?.focus())
}

function registerRow(row: MultiSelectRowApi) {
  rows.value = [...rows.value.filter(item => item.id !== row.id), row]
}

function unregisterRow(id: string) {
  rows.value = rows.value.filter(item => item.id !== id)
}

function moveFocus(delta: number) {
  if (!rows.value.length)
    return
  const next = Math.min(rows.value.length - 1, Math.max(0, focusedIndex.value + delta))
  focusedIndex.value = next
  nextTick(() => focusActive())
}

function setFocusTarget(target: MultiSelectFocusTarget) {
  focusTarget.value = target
  nextTick(() => focusActive())
}

onClickOutside(contentRef, (event) => {
  if (!open.value)
    return
  const target = event.target as Node | null
  if (target && triggerRef.value?.contains(target))
    return
  closeAndRestoreFocus()
})

const context: MultiSelectContext = {
  open,
  triggerRef,
  contentRef,
  align,
  rows,
  focusedIndex,
  focusTarget,
  setOpen,
  registerRow,
  unregisterRow,
  moveFocus,
  setFocusTarget,
  focusActive,
  closeAndRestoreFocus,
}

provide(MULTI_SELECT_KEY, context)

const rootClass = computed(() => cn('relative inline-flex w-full min-w-0 flex-col', props.class))
</script>

<template>
  <div
    data-slot="multi-select"
    :data-open="open ? '' : undefined"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
