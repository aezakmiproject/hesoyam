<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, provide, toRef } from 'vue'
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from 'reka-ui'
import { cn } from '../../lib/utils'
import { modalContextKey } from './context'

export type ModalFocusTarget = HTMLElement | { $el?: unknown } | null

const props = withDefaults(defineProps<{
  active?: boolean
  open?: boolean
  sticky?: boolean
  onClickOutside?: () => void
  initialFocusRef?: ModalFocusTarget
  class?: HTMLAttributes['class']
}>(), {
  sticky: false,
})

const emit = defineEmits<{
  'update:active': [value: boolean]
  'update:open': [value: boolean]
  'clickOutside': []
}>()

const isOpen = computed(() => props.active ?? props.open ?? false)

provide(modalContextKey, {
  sticky: toRef(props, 'sticky'),
})

function resolveFocusEl(target?: ModalFocusTarget) {
  if (!target)
    return null
  if (target instanceof HTMLElement)
    return target
  const el = target.$el
  return el instanceof HTMLElement ? el : null
}

function dismiss() {
  props.onClickOutside?.()
  emit('clickOutside')
  emit('update:active', false)
  emit('update:open', false)
}

function onOpenChange(next: boolean) {
  if (next) {
    emit('update:active', true)
    emit('update:open', true)
    return
  }
  dismiss()
}

function onOpenAutoFocus(event: Event) {
  const el = resolveFocusEl(props.initialFocusRef)
  if (!el)
    return
  event.preventDefault()
  el.focus()
}
</script>

<template>
  <DialogRoot
    data-slot="modal"
    :open="isOpen"
    modal
    @update:open="onOpenChange"
  >
    <DialogPortal>
      <DialogOverlay
        data-slot="modal-overlay"
        class="fixed inset-0 z-50 bg-black/80 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
      />
      <DialogContent
        data-slot="modal-content"
        :data-sticky="sticky ? '' : undefined"
        :class="cn(
          'bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] border-[var(--ds-gray-alpha-400)] fixed z-50 flex w-full max-w-[540px] flex-col border shadow-[0_16px_70px_rgba(0,0,0,0.5)] outline-none',
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl',
          'max-h-[min(90vh,720px)]',
          'max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:rounded-t-xl',
          'duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          'max-sm:data-open:zoom-in-100 max-sm:data-open:slide-in-from-bottom-10 max-sm:data-closed:zoom-out-100 max-sm:data-closed:slide-out-to-bottom-10',
          sticky ? 'overflow-hidden' : 'overflow-y-auto',
          props.class,
        )"
        @open-auto-focus="onOpenAutoFocus"
      >
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
