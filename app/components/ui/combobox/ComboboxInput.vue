<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowDown01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'
import { COMBOBOX_KEY } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
  onChange?: (event: Event) => void
}>()

const emit = defineEmits<{
  change: [event: Event]
}>()

const ctx = inject(COMBOBOX_KEY)
if (!ctx)
  throw new Error('ComboboxInput must be used inside Combobox')

const iconSize = computed(() => ctx.size.value === 'large' ? 18 : ctx.size.value === 'small' ? 14 : 16)

const sizeClass = computed(() => {
  if (ctx.size.value === 'small')
    return 'h-6 text-xs pl-2 pr-14'
  if (ctx.size.value === 'large')
    return 'h-10 text-sm pl-3.5 pr-16'
  return 'h-8 text-[13px] pl-2.5 pr-14'
})

const showClear = computed(() => ctx.clearable.value && Boolean(ctx.value.value) && !ctx.disabled.value)

function onInput(event: Event) {
  const next = (event.target as HTMLInputElement).value
  ctx.setQuery(next)
  emit('change', event)
  props.onChange?.(event)
}

function onFocus(event: FocusEvent) {
  ctx.setOpen(true)
  ;(event.target as HTMLInputElement).select()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!ctx.open.value)
      ctx.setOpen(true)
    else
      ctx.highlightMove(1)
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!ctx.open.value)
      ctx.setOpen(true)
    else
      ctx.highlightMove(-1)
  }
  else if (event.key === 'Enter') {
    if (ctx.open.value) {
      event.preventDefault()
      if (ctx.highlighted.value)
        ctx.select(ctx.highlighted.value)
    }
  }
  else if (event.key === 'Escape') {
    if (ctx.open.value) {
      event.preventDefault()
      ctx.setOpen(false)
    }
  }
}

function clear(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  ctx.select(null)
}
</script>

<template>
  <div class="relative w-full" data-slot="combobox-input-wrap">
    <input
      :id="ctx.id.value"
      :value="ctx.displayValue.value"
      :placeholder="ctx.placeholder.value"
      :disabled="ctx.disabled.value"
      :aria-label="ctx.ariaLabel.value"
      :aria-invalid="ctx.errored.value ? true : undefined"
      :aria-expanded="ctx.open.value"
      aria-autocomplete="list"
      role="combobox"
      autocomplete="off"
      data-slot="combobox-input"
      :class="cn(
        'w-full appearance-none rounded-[6px] border bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] outline-none transition-colors',
        'border-[var(--ds-gray-alpha-400)] placeholder:text-[var(--ds-gray-900)]',
        'focus-visible:border-[var(--ds-gray-1000)] focus-visible:ring-1 focus-visible:ring-[var(--ds-gray-1000)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        ctx.errored.value && 'border-[var(--ds-red-700)] focus-visible:border-[var(--ds-red-700)] focus-visible:ring-[var(--ds-red-700)]',
        sizeClass,
        props.class,
      )"
      @input="onInput"
      @focus="onFocus"
      @keydown="onKeydown"
    >
    <div class="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1 text-[var(--ds-gray-900)]">
      <button
        v-if="showClear"
        type="button"
        aria-label="Clear"
        class="pointer-events-auto flex size-5 items-center justify-center rounded-[4px] outline-none hover:text-[var(--ds-gray-1000)] focus-visible:ring-1 focus-visible:ring-[var(--ds-gray-1000)]"
        @mousedown="clear"
      >
        <HugeiconsIcon
          :icon="Cancel01Icon"
          :size="iconSize"
          color="currentColor"
          :stroke-width="1.75"
        />
      </button>
      <HugeiconsIcon
        :icon="ArrowDown01Icon"
        :size="iconSize"
        color="currentColor"
        :stroke-width="1.75"
        :class="cn('transition-transform', ctx.open.value && 'rotate-180')"
      />
    </div>
  </div>
</template>
