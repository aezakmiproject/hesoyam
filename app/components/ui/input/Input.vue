<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { InputSize } from '.'
import { useVModel } from '@vueuse/core'
import { computed, useAttrs, useId, useSlots } from 'vue'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { inputVariants } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  size?: InputSize
  prefix?: string | VNode
  suffix?: string | VNode
  prefixStyling?: boolean
  suffixStyling?: boolean
  suffixContainer?: boolean
  rounded?: boolean
  error?: string
  label?: string
  id?: string
  disabled?: boolean
}>(), {
  size: 'default',
  prefixStyling: true,
  suffixStyling: true,
  suffixContainer: true,
  rounded: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const generatedId = useId()
const inputId = computed(() => props.id ?? (props.label ? generatedId : undefined))
const errorId = computed(() => (props.error && inputId.value ? `${inputId.value}-error` : undefined))

const hasPrefix = computed(() => Boolean(props.prefix || slots.prefix))
const hasSuffix = computed(() => Boolean(props.suffix || slots.suffix))

const describedBy = computed(() => {
  const fromAttrs = attrs['aria-describedby']
  const parts = [errorId.value, typeof fromAttrs === 'string' ? fromAttrs : undefined].filter(Boolean)
  return parts.length ? parts.join(' ') : undefined
})

const addonBase = 'inline-flex shrink-0 items-center text-[var(--ds-gray-900)]'
const prefixClass = computed(() => cn(
  addonBase,
  props.size === 'large' ? 'px-3.5' : props.size === 'small' ? 'px-2.5' : 'px-3',
  hasPrefix.value && props.prefixStyling && 'border-r border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]',
  hasPrefix.value && !props.prefixStyling && 'pr-0',
))
const suffixClass = computed(() => cn(
  addonBase,
  props.size === 'large' ? 'px-3.5' : props.size === 'small' ? 'px-2.5' : 'px-3',
  hasSuffix.value && props.suffixStyling && props.suffixContainer && 'border-l border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]',
  hasSuffix.value && !props.suffixStyling && 'pl-0',
))
</script>

<template>
  <div class="flex w-full flex-col items-stretch">
    <Label
      v-if="label"
      :html-for="inputId"
      :value="label"
      with-input
    />

    <div
      data-slot="input"
      :data-size="size"
      :data-invalid="error ? '' : undefined"
      :data-disabled="disabled ? '' : undefined"
      :class="cn(inputVariants({ size, rounded }), props.class)"
    >
      <span v-if="hasPrefix" data-slot="input-prefix" :class="prefixClass">
        <slot name="prefix">
          <template v-if="typeof prefix === 'string'">{{ prefix }}</template>
          <component :is="prefix" v-else-if="prefix" />
        </slot>
      </span>

      <input
        :id="inputId"
        v-model="modelValue"
        :disabled="disabled"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="describedBy"
        :class="cn(
          'h-full min-w-0 flex-1 bg-transparent px-2.5 text-inherit outline-none',
          'placeholder:text-[var(--ds-gray-900)] file:mr-2 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-[var(--ds-gray-1000)]',
          'disabled:cursor-not-allowed',
          size === 'large' ? 'px-3.5' : size === 'small' ? 'px-2.5' : 'px-3',
          hasPrefix && !prefixStyling && 'pl-2',
          hasSuffix && !suffixStyling && 'pr-2',
        )"
        v-bind="attrs"
      >

      <span
        v-if="hasSuffix"
        data-slot="input-suffix"
        :class="suffixClass"
      >
        <slot name="suffix">
          <template v-if="typeof suffix === 'string'">{{ suffix }}</template>
          <component :is="suffix" v-else-if="suffix" />
        </slot>
      </span>
      <slot />
    </div>

    <p
      v-if="error"
      :id="errorId"
      data-slot="input-error"
      class="mt-1.5 text-[13px] leading-4 text-[var(--ds-red-700)]"
    >
      {{ error }}
    </p>
  </div>
</template>
