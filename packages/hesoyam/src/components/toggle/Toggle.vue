<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { isDev } from '../../lib/env'
import { cn } from '../../lib/utils'
import { computed, onMounted, ref, useAttrs, useId, useSlots } from 'vue'

defineOptions({ inheritAttrs: false })

export type ToggleSize = 'default' | 'medium' | 'large'
export type ToggleColor = 'blue' | 'amber' | 'red'
export type ToggleDirection = 'label-first' | 'switch-first'
export type ToggleLabelCasing = 'title' | 'normal'

const props = withDefaults(defineProps<{
  checked?: boolean
  modelValue?: boolean
  disabled?: boolean
  size?: ToggleSize
  color?: ToggleColor
  direction?: ToggleDirection
  labelCasing?: ToggleLabelCasing
  icon?: { checked?: VNode; unchecked?: VNode }
  id?: string
  name?: string
  class?: HTMLAttributes['class']
}>(), {
  checked: undefined,
  modelValue: undefined,
  size: 'default',
  color: 'blue',
  direction: 'label-first',
  labelCasing: 'title',
})

const emit = defineEmits<{
  change: [checked: boolean]
  'update:checked': [checked: boolean]
  'update:modelValue': [checked: boolean]
}>()

const attrs = useAttrs()
const slots = useSlots()
const id = computed(() => props.id ?? useId())
const uncontrolled = ref(false)

const isControlled = computed(() => props.checked !== undefined || props.modelValue !== undefined)
const isChecked = computed(() => {
  if (props.checked !== undefined)
    return props.checked
  if (props.modelValue !== undefined)
    return props.modelValue
  return uncontrolled.value
})

if (isDev) {
  onMounted(() => {
    const labelled = Boolean(
      slots.default
      || attrs['aria-label']
      || attrs['aria-labelledby'],
    )
    if (!labelled)
      console.warn('[Toggle] Provide children, aria-label, or aria-labelledby.')
  })
}

const trackClass = computed(() => cn(
  'relative inline-flex shrink-0 items-center rounded-full transition-colors',
  'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ds-focus)]/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--ds-background-100)]',
  props.size === 'large' && 'h-6 w-10',
  props.size === 'medium' && 'h-5 w-8',
  props.size === 'default' && 'h-4 w-7',
  isChecked.value
    ? props.color === 'amber'
      ? 'bg-[var(--ds-amber-700)]'
      : props.color === 'red'
        ? 'bg-[var(--ds-red-700)]'
        : 'bg-[var(--ds-blue-700)]'
    : 'bg-[var(--ds-gray-400)]',
))

const thumbClass = computed(() => cn(
  'pointer-events-none flex items-center justify-center rounded-full bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)] shadow-sm transition-transform',
  props.size === 'large' && 'size-5',
  props.size === 'medium' && 'size-4',
  props.size === 'default' && 'size-3',
  isChecked.value
    ? props.size === 'large'
      ? 'translate-x-[18px]'
      : props.size === 'medium'
        ? 'translate-x-[14px]'
        : 'translate-x-3.5'
    : 'translate-x-0.5',
))

const iconSize = computed(() => {
  if (props.size === 'large')
    return 12
  if (props.size === 'medium')
    return 10
  return 8
})

function onToggle() {
  if (props.disabled)
    return
  const next = !isChecked.value
  if (!isControlled.value)
    uncontrolled.value = next
  emit('change', next)
  emit('update:checked', next)
  emit('update:modelValue', next)
}
</script>

<template>
  <label
    data-slot="toggle"
    :data-state="isChecked ? 'checked' : 'unchecked'"
    :data-size="size"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(
      'inline-flex items-center gap-2 text-[13px] leading-none text-[var(--ds-gray-1000)] select-none',
      direction === 'switch-first' && 'flex-row-reverse',
      size === 'large' && 'text-[14px]',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      props.class,
    )"
  >
    <span
      v-if="$slots.default"
      class="min-w-0"
      :class="labelCasing === 'title' ? undefined : 'normal-case'"
    >
      <slot />
    </span>
    <span class="relative inline-flex">
      <input
        :id="id"
        type="checkbox"
        role="switch"
        class="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        :name="name"
        :checked="isChecked"
        :disabled="disabled"
        :aria-checked="isChecked"
        v-bind="attrs"
        @change="onToggle"
      >
      <span
        aria-hidden="true"
        :data-state="isChecked ? 'checked' : 'unchecked'"
        :class="trackClass"
      >
        <span :class="thumbClass">
          <span
            v-if="$slots['icon-checked'] || $slots['icon-unchecked'] || icon"
            class="flex items-center justify-center"
            :style="{ width: `${iconSize}px`, height: `${iconSize}px` }"
          >
            <slot v-if="isChecked" name="icon-checked">
              <component :is="icon?.checked" />
            </slot>
            <slot v-else name="icon-unchecked">
              <component :is="icon?.unchecked" />
            </slot>
          </span>
        </span>
      </span>
    </span>
  </label>
</template>
