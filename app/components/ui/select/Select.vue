<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useVModel } from '@vueuse/core'
import { computed, useAttrs, useId, useSlots, watch } from 'vue'
import { cn } from '@/lib/utils'

export type SelectSize = 'small' | 'medium' | 'large'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  size?: SelectSize | 'default'
  disabled?: boolean
  error?: string
  label?: string
  required?: boolean
  prefix?: unknown
  suffix?: unknown
  class?: HTMLAttributes['class']
  onChange?: (value: string) => void
}>(), {
  size: 'medium',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
  (e: 'change', payload: string): void
  (e: 'blur', payload: FocusEvent): void
}>()

const attrs = useAttrs()
const slots = useSlots()
const generatedId = useId()

const selected = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.value ?? props.defaultValue ?? '',
})

watch(() => props.value, (value) => {
  if (value !== undefined)
    selected.value = value
})

const selectId = computed(() => (typeof attrs.id === 'string' && attrs.id) || generatedId)
const errorId = computed(() => `${selectId.value}-error`)
const hasPrefix = computed(() => Boolean(slots.prefix || props.prefix))
const hasSuffix = computed(() => Boolean(slots.suffix || props.suffix))
const isEmpty = computed(() => selected.value === '' || selected.value == null)
const iconSize = computed(() => props.size === 'large' ? 18 : props.size === 'small' ? 14 : 16)

const selectAttrs = computed(() => {
  const { class: _class, id: _id, ...rest } = attrs
  return rest
})

const sizeClass = computed(() => {
  if (props.size === 'small')
    return 'h-6 text-xs'
  if (props.size === 'large')
    return 'h-10 text-sm'
  return 'h-8 text-[13px]'
})

const paddingClass = computed(() => {
  const left = hasPrefix.value
    ? (props.size === 'large' ? 'pl-10' : props.size === 'small' ? 'pl-7' : 'pl-8')
    : (props.size === 'large' ? 'pl-3.5' : props.size === 'small' ? 'pl-2' : 'pl-2.5')
  const right = hasSuffix.value
    ? (props.size === 'large' ? 'pr-16' : props.size === 'small' ? 'pr-12' : 'pr-14')
    : (props.size === 'large' ? 'pr-10' : props.size === 'small' ? 'pr-7' : 'pr-8')
  return cn(left, right)
})

function onNativeChange(event: Event) {
  const next = (event.target as HTMLSelectElement).value
  selected.value = next
  emits('change', next)
  props.onChange?.(next)
}
</script>

<template>
  <div
    data-slot="select"
    :data-size="size"
    :data-error="error ? '' : undefined"
    :class="cn('flex w-full min-w-0 flex-col items-stretch', props.class)"
  >
    <label
      v-if="label"
      :for="selectId"
      class="mb-1.5 text-[13px] font-medium leading-none text-[var(--ds-gray-1000)]"
    >
      {{ label }}
      <span v-if="required" class="text-[var(--ds-red-700)]">*</span>
    </label>

    <div class="relative w-full">
      <span
        v-if="hasPrefix"
        class="pointer-events-none absolute top-1/2 left-2.5 z-10 flex -translate-y-1/2 items-center text-[var(--ds-gray-900)] [&_svg]:shrink-0"
        data-slot="select-prefix"
      >
        <slot name="prefix">
          <component :is="prefix" v-if="prefix && typeof prefix !== 'string'" />
          <template v-else>{{ prefix }}</template>
        </slot>
      </span>

      <select
        :id="selectId"
        :value="selected"
        :disabled="disabled"
        :required="required"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="error ? errorId : undefined"
        data-slot="select-control"
        v-bind="selectAttrs"
        :class="cn(
          'w-full appearance-none rounded-[6px] border bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] outline-none transition-colors',
          'border-[var(--ds-gray-alpha-400)]',
          'focus-visible:border-[var(--ds-gray-1000)] focus-visible:ring-1 focus-visible:ring-[var(--ds-gray-1000)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isEmpty && 'text-[var(--ds-gray-900)]',
          error && 'border-[var(--ds-red-700)] focus-visible:border-[var(--ds-red-700)] focus-visible:ring-[var(--ds-red-700)]',
          sizeClass,
          paddingClass,
        )"
        @change="onNativeChange"
        @blur="emits('blur', $event)"
      >
        <option
          v-if="placeholder"
          value=""
          disabled
          hidden
        >
          {{ placeholder }}
        </option>
        <slot />
      </select>

      <span
        class="pointer-events-none absolute top-1/2 right-2 z-10 flex -translate-y-1/2 items-center gap-1 text-[var(--ds-gray-900)]"
      >
        <span
          v-if="hasSuffix"
          class="flex items-center [&_svg]:shrink-0"
          data-slot="select-suffix"
        >
          <slot name="suffix">
            <component :is="suffix" v-if="suffix && typeof suffix !== 'string'" />
            <template v-else>{{ suffix }}</template>
          </slot>
        </span>
        <HugeiconsIcon
          :icon="ArrowDown01Icon"
          :size="iconSize"
          color="currentColor"
          :stroke-width="1.75"
        />
      </span>
    </div>

    <p
      v-if="error"
      :id="errorId"
      data-slot="select-error"
      class="mt-1.5 text-[13px] leading-5 text-[var(--ds-red-700)]"
    >
      {{ error }}
    </p>
  </div>
</template>
