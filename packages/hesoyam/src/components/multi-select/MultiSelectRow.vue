<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { cn } from '../../lib/utils'
import { useMultiSelectContext } from './context'

const props = withDefaults(defineProps<{
  name: string
  checked?: boolean
  selectedCount?: number
  totalCount?: number
  onChange?: () => void
  onSelectOnly?: () => void
  onSelectAll?: () => void
  class?: HTMLAttributes['class']
}>(), {
  checked: false,
  selectedCount: 0,
  totalCount: 0,
})

const emit = defineEmits<{
  change: []
  selectOnly: []
  selectAll: []
}>()

const ctx = useMultiSelectContext()

const rowId = useId()
const checkboxRef = ref<HTMLButtonElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

const action = computed(() => {
  if (props.checked && props.selectedCount === 1 && props.totalCount > 1)
    return 'Select All' as const
  return 'Select Only' as const
})

function toggle() {
  props.onChange?.()
  emit('change')
}

function runAction() {
  if (action.value === 'Select All') {
    props.onSelectAll?.()
    emit('selectAll')
    return
  }
  props.onSelectOnly?.()
  emit('selectOnly')
}

function setCheckboxRef(el: unknown) {
  checkboxRef.value = el instanceof HTMLButtonElement ? el : null
}

function setButtonRef(el: unknown) {
  buttonRef.value = el instanceof HTMLButtonElement ? el : null
}

function onRowKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    ctx.setFocusTarget('checkbox')
  }
  else if (event.key === 'ArrowRight') {
    event.preventDefault()
    ctx.setFocusTarget('button')
  }
}

onMounted(() => {
  ctx.registerRow({
    id: rowId,
    focusCheckbox: () => checkboxRef.value?.focus(),
    focusButton: () => buttonRef.value?.focus(),
  })
})

onBeforeUnmount(() => {
  ctx.unregisterRow(rowId)
})
</script>

<template>
  <div
    :data-row-id="rowId"
    role="option"
    :aria-selected="checked"
    data-slot="multi-select-row"
    :class="cn(
      'group/row flex min-h-8 items-center gap-2 rounded-[6px] px-2 py-1 text-[13px] text-[var(--ds-gray-1000)] outline-none',
      'hover:bg-[var(--ds-gray-100)]',
      props.class,
    )"
    @keydown="onRowKeydown"
  >
    <button
      :ref="setCheckboxRef"
      type="button"
      role="checkbox"
      :aria-checked="checked"
      :aria-label="`Select ${name}`"
      :class="cn(
        'flex size-4 shrink-0 items-center justify-center rounded-[4px] border outline-none transition-colors',
        'focus-visible:ring-1 focus-visible:ring-[var(--ds-gray-1000)]',
        checked
          ? 'border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]'
          : 'border-[var(--ds-gray-alpha-400)] bg-transparent text-transparent',
      )"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <Check
        v-if="checked"
        :size="12"
        :stroke-width="2"
      />
    </button>

    <span class="min-w-0 flex-1 truncate">
      {{ name }}
    </span>

    <button
      :ref="setButtonRef"
      type="button"
      :aria-label="action"
      :class="cn(
        'shrink-0 text-[12px] text-[var(--ds-gray-900)] outline-none transition-opacity',
        'opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 focus:opacity-100 focus:text-[var(--ds-gray-1000)]',
        'focus-visible:ring-1 focus-visible:ring-[var(--ds-gray-1000)] rounded-[4px] px-1',
      )"
      @click="runAction"
      @keydown.enter.prevent="runAction"
      @keydown.space.prevent="runAction"
    >
      {{ action }}
    </button>
  </div>
</template>
