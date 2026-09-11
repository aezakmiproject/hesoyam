<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, ref } from 'vue'
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<{
  show?: boolean
  onDismiss?: () => void
  height?: number
  customHeight?: number | string
  verticalScroll?: boolean
  class?: HTMLAttributes['class']
}>(), {
  show: false,
  verticalScroll: false,
})

const emit = defineEmits<{
  'dismiss': []
  'update:show': [value: boolean]
}>()

const dragY = ref(0)
const dragging = ref(false)
const startY = ref(0)

const frameHeight = computed(() => {
  const value = props.height ?? props.customHeight
  if (value == null)
    return undefined
  return typeof value === 'number' ? `${value}px` : value
})

function dismiss() {
  props.onDismiss?.()
  emit('dismiss')
  emit('update:show', false)
}

function onOpenChange(next: boolean) {
  if (!next)
    dismiss()
}

function onHandlePointerDown(event: PointerEvent) {
  dragging.value = true
  startY.value = event.clientY
  dragY.value = 0
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onHandlePointerMove(event: PointerEvent) {
  if (!dragging.value)
    return
  dragY.value = Math.max(0, event.clientY - startY.value)
}

function onHandlePointerUp() {
  if (!dragging.value)
    return
  const shouldDismiss = dragY.value > 72
  dragging.value = false
  dragY.value = 0
  if (shouldDismiss)
    dismiss()
}
</script>

<template>
  <DialogRoot
    data-slot="drawer"
    :open="show"
    modal
    @update:open="onOpenChange"
  >
    <DialogPortal>
      <DialogOverlay
        data-slot="drawer-overlay"
        class="fixed inset-0 z-50 bg-black/40 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
      />
      <DialogContent
        data-slot="drawer-content"
        aria-label="Drawer"
        :class="cn(
          'bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] border-[var(--ds-gray-alpha-400)] fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] w-full flex-col rounded-t-xl border-t shadow-[0_-12px_40px_rgba(0,0,0,0.35)] outline-none',
          'duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-10',
          verticalScroll && 'overflow-hidden',
          props.class,
        )"
        :style="{
          height: frameHeight,
          transform: dragY ? `translateY(${dragY}px)` : undefined,
        }"
      >
        <div
          data-slot="drawer-handle"
          class="flex shrink-0 cursor-grab touch-none items-center justify-center py-3 active:cursor-grabbing"
          @pointerdown="onHandlePointerDown"
          @pointermove="onHandlePointerMove"
          @pointerup="onHandlePointerUp"
          @pointercancel="onHandlePointerUp"
        >
          <span class="h-1 w-9 rounded-full bg-[var(--ds-gray-500)]" />
        </div>
        <div
          data-slot="drawer-body"
          :class="cn(
            'min-h-0 flex-1',
            verticalScroll && 'overflow-y-auto overscroll-contain',
          )"
        >
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
