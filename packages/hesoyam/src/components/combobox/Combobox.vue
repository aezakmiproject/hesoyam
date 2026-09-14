<script setup lang="ts">
import type { HTMLAttributes, Ref } from 'vue'
import type { ComboboxContext, ComboboxOptionApi, ComboboxSize } from './context'
import { useVModel } from '@vueuse/core'
import { computed, provide, ref, shallowRef, useAttrs, useId, watch } from 'vue'
import { cn } from '../../lib/utils'
import { COMBOBOX_KEY } from './context'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string | null
  value?: string | null
  placeholder?: string
  disabled?: boolean
  errored?: boolean
  clearable?: boolean
  width?: number
  size?: ComboboxSize
  class?: HTMLAttributes['class']
  onChange?: (value: string | null) => void
}>(), {
  size: 'medium',
  placeholder: '',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | null): void
  (e: 'change', payload: string | null): void
}>()

const attrs = useAttrs()
const generatedId = useId()

const selected = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.value ?? null,
})

watch(() => props.value, (value) => {
  if (value !== undefined)
    selected.value = value
})

const query = ref('')
const open = ref(false)
const highlighted = ref<string | null>(null)
const options = shallowRef<ComboboxOptionApi[]>([])
const triggerRef = ref<HTMLElement | null>(null)
const typing = ref(false)

const id = computed(() => (typeof attrs.id === 'string' && attrs.id) || generatedId)
const ariaLabel = computed(() => typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : undefined)
const rootAttrs = computed(() => {
  const { id: _id, 'aria-label': _ariaLabel, class: _class, ...rest } = attrs
  return rest
})
const disabled = computed(() => Boolean(props.disabled))
const errored = computed(() => Boolean(props.errored))
const clearable = computed(() => Boolean(props.clearable))
const size = computed(() => props.size)
const placeholder = computed(() => props.placeholder)

const selectedLabel = computed(() => {
  const match = options.value.find(option => option.value === selected.value)
  return match?.getLabel() ?? ''
})

const displayValue = computed(() => {
  if (typing.value)
    return query.value
  return selectedLabel.value || (selected.value ?? '') || query.value
})

const visibleOptions = computed(() => options.value.filter(option => !option.isHidden()))

function applyFilter() {
  const selectedMatchesQuery = Boolean(selectedLabel.value && query.value === selectedLabel.value)
  const needle = (!typing.value || selectedMatchesQuery) ? '' : query.value.trim().toLowerCase()
  for (const option of options.value) {
    const label = option.getLabel().toLowerCase()
    option.setHidden(needle ? !label.includes(needle) : false)
  }
}

function setQuery(next: string) {
  typing.value = true
  query.value = next
  if (!disabled.value)
    open.value = true
  applyFilter()
  const first = visibleOptions.value[0]
  highlighted.value = first?.value ?? null
}

function setOpen(next: boolean) {
  if (disabled.value) {
    open.value = false
    return
  }
  open.value = next
  if (next) {
    applyFilter()
    highlighted.value = selected.value ?? visibleOptions.value[0]?.value ?? null
  }
  else {
    typing.value = false
    query.value = selectedLabel.value
  }
}

function select(next: string | null) {
  selected.value = next
  emits('change', next)
  props.onChange?.(next)
  typing.value = false
  const match = options.value.find(option => option.value === next)
  query.value = match?.getLabel() ?? ''
  open.value = false
  applyFilter()
}

function highlight(value: string | null) {
  highlighted.value = value
}

function highlightMove(delta: number) {
  const visible = visibleOptions.value
  if (!visible.length)
    return
  const current = visible.findIndex(option => option.value === highlighted.value)
  const nextIndex = current === -1
    ? (delta > 0 ? 0 : visible.length - 1)
    : Math.min(visible.length - 1, Math.max(0, current + delta))
  highlighted.value = visible[nextIndex]?.value ?? null
}

function registerOption(option: ComboboxOptionApi) {
  options.value = [...options.value.filter(item => item.value !== option.value), option]
  applyFilter()
}

function unregisterOption(value: string) {
  options.value = options.value.filter(item => item.value !== value)
}

watch([selectedLabel, () => selected.value], () => {
  if (!typing.value)
    query.value = selectedLabel.value || (selected.value ?? '')
})

const context: ComboboxContext = {
  id,
  ariaLabel,
  query,
  value: selected as Ref<string | null>,
  open,
  disabled,
  errored,
  clearable,
  size,
  placeholder,
  highlighted,
  options,
  triggerRef,
  displayValue,
  setQuery,
  setOpen,
  select,
  highlight,
  highlightMove,
  registerOption,
  unregisterOption,
}

provide(COMBOBOX_KEY, context)

const rootStyle = computed(() => props.width ? { width: `${props.width}px` } : undefined)
</script>

<template>
  <div
    ref="triggerRef"
    data-slot="combobox"
    :data-size="size"
    :data-disabled="disabled ? '' : undefined"
    :data-errored="errored ? '' : undefined"
    :style="rootStyle"
    :class="cn('relative w-full min-w-0', props.class)"
    v-bind="rootAttrs"
  >
    <slot />
  </div>
</template>
