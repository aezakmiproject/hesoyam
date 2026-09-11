<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { radioGroupKey } from './context'
import { computed, provide, ref, useId } from 'vue'

const props = defineProps<{
  value?: string
  modelValue?: string
  defaultValue?: string
  label?: string
  name?: string
  disabled?: boolean
  required?: boolean
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  change: [value: string]
  'update:modelValue': [value: string]
  'update:value': [value: string]
}>()

const generatedName = useId()
const uncontrolled = ref(props.defaultValue)

const current = computed(() => {
  if (props.value !== undefined)
    return props.value
  if (props.modelValue !== undefined)
    return props.modelValue
  return uncontrolled.value
})

function setValue(next: string) {
  if (props.value === undefined && props.modelValue === undefined)
    uncontrolled.value = next
  emit('change', next)
  emit('update:modelValue', next)
  emit('update:value', next)
}

provide(radioGroupKey, {
  name: computed(() => props.name ?? generatedName),
  value: current,
  disabled: computed(() => !!props.disabled),
  required: computed(() => !!props.required),
  setValue,
})
</script>

<template>
  <fieldset
    data-slot="radio-group"
    :aria-required="required || undefined"
    :aria-disabled="disabled || undefined"
    :disabled="disabled ? true : undefined"
    :class="cn(
      'm-0 flex min-w-0 flex-col border-0 p-0',
      props.class,
    )"
  >
    <legend
      v-if="label"
      class="mb-2 px-0 text-[13px] font-medium text-[var(--ds-gray-1000)]"
    >
      {{ label }}
    </legend>
    <slot />
  </fieldset>
</template>
