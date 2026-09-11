<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SwitchSize } from './context'
import { cn } from '@/lib/utils'
import { switchKey } from './context'

const props = withDefaults(defineProps<{
  name?: string
  size?: SwitchSize
  value?: string
  modelValue?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
})

const emit = defineEmits<{
  change: [value: string]
  'update:modelValue': [value: string]
  'update:value': [value: string]
}>()

const generatedName = useId()
const uncontrolled = ref<string>()

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

function registerDefault(next: string) {
  if (props.value !== undefined || props.modelValue !== undefined)
    return
  if (uncontrolled.value !== undefined)
    return
  uncontrolled.value = next
}

provide(switchKey, {
  name: computed(() => props.name ?? generatedName),
  size: computed(() => props.size),
  disabled: computed(() => !!props.disabled),
  value: current,
  setValue,
  registerDefault,
})
</script>

<template>
  <div
    data-slot="switch"
    role="radiogroup"
    :data-size="size"
    :aria-disabled="disabled || undefined"
    :class="cn(
      'inline-flex items-stretch rounded-[6px] bg-[var(--ds-gray-100)] p-0.5',
      size === 'small' && 'min-h-6',
      size === 'default' && 'min-h-8',
      size === 'large' && 'min-h-10',
      disabled && 'opacity-50',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
