<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { radioGroupKey } from './context'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  value: string
  checked?: boolean
  disabled?: boolean
  name?: string
  required?: boolean
  id?: string
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  change: [value: string]
  'update:checked': [checked: boolean]
}>()

const ctx = inject(radioGroupKey, null)
const id = computed(() => props.id ?? useId())

const isDisabled = computed(() => props.disabled || ctx?.disabled.value || false)
const isRequired = computed(() => props.required || ctx?.required.value || false)
const inputName = computed(() => props.name ?? ctx?.name.value)

const isChecked = computed(() => {
  if (ctx)
    return ctx.value.value === props.value
  return !!props.checked
})

function onInputChange() {
  if (isDisabled.value)
    return
  ctx?.setValue(props.value)
  emit('change', props.value)
  emit('update:checked', true)
}
</script>

<template>
  <span
    data-slot="radio"
    :data-state="isChecked ? 'checked' : 'unchecked'"
    :data-disabled="isDisabled ? '' : undefined"
    :class="cn(
      'relative inline-flex size-4 shrink-0 items-center justify-center',
      isDisabled && 'cursor-not-allowed opacity-50',
      props.class,
    )"
  >
    <input
      :id="id"
      type="radio"
      class="peer absolute inset-0 z-10 size-4 cursor-pointer opacity-0 disabled:cursor-not-allowed"
      :name="inputName"
      :value="value"
      :checked="isChecked"
      :disabled="isDisabled"
      :required="isRequired"
      v-bind="$attrs"
      @change="onInputChange"
    >
    <span
      aria-hidden="true"
      :data-state="isChecked ? 'checked' : 'unchecked'"
      class="pointer-events-none flex size-4 items-center justify-center rounded-full border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background data-[state=checked]:border-[var(--ds-gray-1000)]"
    >
      <span
        :data-state="isChecked ? 'checked' : 'unchecked'"
        class="size-2 rounded-full bg-[var(--ds-gray-1000)] transition-transform duration-150 scale-0 data-[state=checked]:scale-100"
      />
    </span>
  </span>
</template>
