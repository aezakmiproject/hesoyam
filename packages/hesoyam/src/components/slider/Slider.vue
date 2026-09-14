<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from 'reka-ui'
import { cn } from '../../lib/utils'
import { computed, ref, useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  value?: number[]
  modelValue?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  label?: string
  showStartInput?: boolean
  showEndInput?: boolean
  name?: string
  id?: string
  class?: HTMLAttributes['class']
}>(), {
  min: 0,
  max: 100,
  step: 1,
})

const emit = defineEmits<{
  valueChange: [value: number[]]
  valueCommitted: [value: number[]]
  'update:modelValue': [value: number[]]
  'update:value': [value: number[]]
}>()

const id = computed(() => props.id ?? useId())
const uncontrolled = ref<number[]>(props.defaultValue ? [...props.defaultValue] : [50])

const current = computed(() => {
  if (props.value !== undefined)
    return props.value
  if (props.modelValue !== undefined)
    return props.modelValue
  return uncontrolled.value
})

const thumbs = computed(() => current.value.length > 0 ? current.value : [props.min])

const displayValue = computed(() => {
  const start = thumbs.value[0] ?? props.min
  const end = thumbs.value[thumbs.value.length - 1] ?? start
  if (thumbs.value.length > 1)
    return `${formatNumber(start)} – ${formatNumber(end)}`
  return formatNumber(start)
})

const showLiveValue = computed(() => !props.showStartInput && !props.showEndInput)

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, '')
}

function setValue(next: number[] | undefined) {
  if (!next)
    return
  const clamped = next.map(n => clamp(n))
  if (props.value === undefined && props.modelValue === undefined)
    uncontrolled.value = clamped
  emit('valueChange', clamped)
  emit('update:modelValue', clamped)
  emit('update:value', clamped)
}

function onCommit(next: number[]) {
  emit('valueCommitted', next.map(n => clamp(n)))
}

function clamp(value: number) {
  const snapped = Math.round(value / props.step) * props.step
  return Math.min(props.max, Math.max(props.min, snapped))
}

function onInputAt(index: number, raw: string) {
  const parsed = Number(raw)
  if (Number.isNaN(parsed))
    return
  const next = [...thumbs.value]
  let value = clamp(parsed)
  if (next.length > 1) {
    if (index === 0)
      value = Math.min(value, next[next.length - 1] ?? value)
    else
      value = Math.max(value, next[0] ?? value)
  }
  next[index] = value
  setValue(next)
}

const inputClass = 'h-8 w-14 shrink-0 rounded-md border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2 text-center text-[13px] tabular-nums text-[var(--ds-gray-1000)] outline-none focus-visible:border-[var(--ds-focus)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]/40 disabled:cursor-not-allowed disabled:opacity-50'
</script>

<template>
  <div
    data-slot="slider"
    :data-disabled="disabled ? '' : undefined"
    :class="cn('flex w-full flex-col gap-2', props.class)"
  >
    <div
      v-if="label || showLiveValue"
      class="flex items-center justify-between gap-3"
    >
      <label
        v-if="label"
        :for="id"
        class="text-[13px] font-medium text-[var(--ds-gray-1000)]"
      >
        {{ label }}
      </label>
      <span
        v-if="showLiveValue"
        class="ml-auto text-[13px] tabular-nums text-[var(--ds-gray-900)]"
      >
        {{ displayValue }}
      </span>
    </div>

    <div class="flex items-center gap-3">
      <input
        v-if="showStartInput"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :value="thumbs[0]"
        :aria-label="label ? `${label} start` : 'Start'"
        :class="inputClass"
        @change="onInputAt(0, ($event.target as HTMLInputElement).value)"
      >
      <SliderRoot
        :id="id"
        :name="name"
        :model-value="thumbs"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :class="cn(
          'relative flex min-h-4 min-w-0 w-full flex-1 touch-none items-center select-none',
          disabled && 'opacity-50',
        )"
        v-bind="$attrs"
        @update:model-value="setValue"
        @value-commit="onCommit"
      >
        <SliderTrack
          data-slot="slider-track"
          class="relative h-1 w-full grow overflow-hidden rounded-full bg-[var(--ds-gray-100)]"
        >
          <SliderRange
            data-slot="slider-range"
            class="absolute h-full bg-[var(--ds-gray-1000)]"
          />
        </SliderTrack>
        <SliderThumb
          v-for="(_, index) in thumbs"
          :key="index"
          data-slot="slider-thumb"
          class="block size-4 rounded-full border border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-background-100)] focus-visible:outline-none disabled:cursor-not-allowed"
        />
      </SliderRoot>
      <input
        v-if="showEndInput"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :value="thumbs[thumbs.length - 1]"
        :aria-label="label ? `${label} end` : 'End'"
        :class="inputClass"
        @change="onInputAt(thumbs.length - 1, ($event.target as HTMLInputElement).value)"
      >
    </div>
  </div>
</template>
