<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Minus, Check } from '@lucide/vue'
import { cn } from '../../lib/utils'
import { computed, ref, useId, watch } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  checked?: boolean
  modelValue?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string | number
  id?: string
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  change: [checked: boolean]
  'update:checked': [checked: boolean]
  'update:modelValue': [checked: boolean]
}>()

const id = computed(() => props.id ?? useId())
const inputRef = ref<HTMLInputElement | null>(null)
const uncontrolled = ref(props.defaultChecked ?? false)

const isControlled = computed(() => props.checked !== undefined || props.modelValue !== undefined)

const isChecked = computed(() => {
  if (props.checked !== undefined)
    return props.checked
  if (props.modelValue !== undefined)
    return props.modelValue
  return uncontrolled.value
})

const state = computed(() => {
  if (props.indeterminate)
    return 'indeterminate'
  return isChecked.value ? 'checked' : 'unchecked'
})

watch(
  [() => props.indeterminate, inputRef],
  () => {
    if (inputRef.value)
      inputRef.value.indeterminate = !!props.indeterminate
  },
  { immediate: true },
)

function onInputChange(event: Event) {
  const next = (event.target as HTMLInputElement).checked
  if (!isControlled.value)
    uncontrolled.value = next
  emit('change', next)
  emit('update:checked', next)
  emit('update:modelValue', next)
}
</script>

<template>
  <label
    data-slot="checkbox"
    :data-state="state"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(
      'inline-flex items-center gap-2 text-[14px] leading-none text-[var(--ds-gray-1000)] select-none',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      props.class,
    )"
  >
    <span class="relative size-4 shrink-0">
      <input
        :id="id"
        ref="inputRef"
        type="checkbox"
        class="peer absolute inset-0 z-10 size-4 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :required="required"
        v-bind="$attrs"
        @change="onInputChange"
      >
      <span
        aria-hidden="true"
        :data-state="state"
        class="pointer-events-none flex size-4 items-center justify-center rounded-[3px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-background-100)] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ds-focus)]/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--ds-background-100)] data-[state=checked]:border-[var(--ds-gray-1000)] data-[state=checked]:bg-[var(--ds-gray-1000)] data-[state=indeterminate]:border-[var(--ds-gray-1000)] data-[state=indeterminate]:bg-[var(--ds-gray-1000)]"
      >
        <Minus
          v-if="state === 'indeterminate'"
          :size="12"
          :stroke-width="2"
        />
        <Check
          v-else-if="state === 'checked'"
          :size="12"
          :stroke-width="2"
        />
      </span>
    </span>
    <span v-if="$slots.default" class="min-w-0">
      <slot />
    </span>
  </label>
</template>
