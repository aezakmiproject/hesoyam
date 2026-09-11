<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { radioGroupKey } from './context'
import Radio from './Radio.vue'
import { computed, inject, useId } from 'vue'

const props = defineProps<{
  value: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const ctx = inject(radioGroupKey, null)
const id = useId()
const isDisabled = computed(() => props.disabled || ctx?.disabled.value || false)
</script>

<template>
  <label
    data-slot="radio-group-item"
    :for="id"
    :class="cn(
      'inline-flex items-center gap-2 text-[14px] leading-none text-[var(--ds-gray-1000)] select-none',
      isDisabled ? 'cursor-not-allowed text-[var(--ds-gray-700)]' : 'cursor-pointer',
      props.class,
    )"
  >
    <Radio :id="id" :value="value" :disabled="disabled" />
    <span v-if="$slots.default" class="min-w-0">
      <slot />
    </span>
  </label>
</template>
