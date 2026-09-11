<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { SwitchSize } from './context'
import { cn } from '../../lib/utils'
import { switchKey } from './context'
import { computed, inject, onMounted, useId, useSlots } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  value: string
  label?: string
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  size?: SwitchSize
  icon?: VNode
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  change: [value: string]
}>()

const ctx = inject(switchKey, null)
const slots = useSlots()
const id = useId()

const hasIcon = computed(() => Boolean(slots.icon || props.icon))
const controlSize = computed(() => props.size ?? ctx?.size.value ?? 'default')
const isDisabled = computed(() => props.disabled || ctx?.disabled.value || false)
const inputName = computed(() => props.name ?? ctx?.name.value)

const isChecked = computed(() => {
  if (props.checked !== undefined)
    return props.checked
  if (ctx?.value.value !== undefined)
    return ctx.value.value === props.value
  return !!props.defaultChecked
})

onMounted(() => {
  if (props.defaultChecked)
    ctx?.registerDefault?.(props.value)
})

function onInputChange() {
  if (isDisabled.value)
    return
  ctx?.setValue(props.value)
  emit('change', props.value)
}
</script>

<template>
  <label
    data-slot="switch-control"
    :data-state="isChecked ? 'checked' : 'unchecked'"
    :data-size="controlSize"
    :data-disabled="isDisabled ? '' : undefined"
    :for="id"
    :class="cn(
      'relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-[5px] font-medium whitespace-nowrap transition-colors select-none',
      controlSize === 'small' && 'min-h-5 px-2 text-xs',
      controlSize === 'default' && 'min-h-7 px-3 text-[13px]',
      controlSize === 'large' && 'min-h-9 px-3.5 text-sm',
      isChecked
        ? 'bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] shadow-sm'
        : 'text-[var(--ds-gray-900)]',
      'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--ds-focus)]/40',
      isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
      props.class,
    )"
  >
    <input
      :id="id"
      type="radio"
      class="peer sr-only"
      :name="inputName"
      :value="value"
      :checked="isChecked"
      :disabled="isDisabled"
      v-bind="$attrs"
      @change="onInputChange"
    >
    <span
      v-if="hasIcon"
      aria-hidden="true"
      class="inline-flex items-center justify-center [&_svg]:shrink-0"
      :class="controlSize === 'small' ? '[&_svg]:size-3.5' : '[&_svg]:size-4'"
    >
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
    <span
      v-if="label"
      :class="hasIcon ? 'sr-only' : undefined"
    >
      {{ label }}
    </span>
    <span
      v-else-if="hasIcon"
      class="sr-only"
    >
      {{ value }}
    </span>
  </label>
</template>
