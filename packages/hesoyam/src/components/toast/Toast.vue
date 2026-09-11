<script setup lang="ts">
import type { ToastItem } from './useToasts'
import { TriangleAlert, X, CircleX, CircleCheck } from '@lucide/vue'
import { dismiss } from './useToasts'
import { computed } from 'vue'

const props = defineProps<{
  toast: ToastItem
}>()

const icon = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return { data: CircleCheck, class: 'text-[var(--ds-green-900)]' }
    case 'warning':
      return { data: TriangleAlert, class: 'text-[var(--ds-amber-900)]' }
    case 'error':
      return { data: CircleX, class: 'text-[var(--ds-red-900)]' }
    default:
      return null
  }
})

const actionLabel = computed(() => {
  if (props.toast.onUndoAction) return 'Undo'
  return props.toast.action
})

function runAction() {
  props.toast.onUndoAction?.()
  props.toast.onAction?.()
  dismiss(props.toast.id)
}

const isStringText = computed(() => typeof props.toast.text === 'string')
</script>

<template>
  <div
    data-slot="toast"
    :role="toast.type === 'error' ? 'alert' : 'status'"
    :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
    :data-type="toast.type"
    :class="[
      'pointer-events-auto flex w-[min(100%,380px)] items-start gap-2.5 rounded-md border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] px-3 py-2.5 text-[13px] leading-5 text-[var(--ds-gray-1000)] shadow-[0_8px_30px_rgba(0,0,0,0.28)]',
      toast.leaving
        ? 'animate-out fade-out-0 slide-out-to-bottom-2 duration-150'
        : 'animate-in fade-in-0 slide-in-from-bottom-2 duration-200',
    ]"
  >
    <component :is="icon.data"
      v-if="icon"
      :size="16"
      :stroke-width="1.75"
      :class="['mt-0.5 shrink-0', icon.class]"
    />

    <div class="min-w-0 flex-1 pt-px">
      <template v-if="isStringText">{{ toast.text }}</template>
      <component :is="() => toast.text" v-else />
    </div>

    <button
      v-if="actionLabel"
      type="button"
      class="mt-px shrink-0 rounded-md border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2 py-1 text-[12px] font-medium text-[var(--ds-gray-1000)] outline-none hover:bg-[var(--ds-gray-200)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]/40"
      @click="runAction"
    >
      {{ actionLabel }}
    </button>

    <button
      type="button"
      aria-label="Dismiss"
      class="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-[var(--ds-gray-900)] outline-none hover:bg-[var(--ds-gray-200)] hover:text-[var(--ds-gray-1000)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]/40"
      @click="dismiss(toast.id)"
    >
      <X :size="14" :stroke-width="1.75" />
    </button>
  </div>
</template>
