<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { InputSize } from '@/components/ui/input'
import { Cancel01Icon, SearchIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/keyboard-input'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  size?: InputSize
  prefix?: string | VNode
  cmdk?: boolean
  loading?: boolean
  disabled?: boolean
}>(), {
  size: 'default',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const hasValue = computed(() => String(modelValue.value ?? '').length > 0)
const iconSize = computed(() => props.size === 'large' ? 18 : props.size === 'small' ? 14 : 16)

function clear() {
  modelValue.value = ''
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && hasValue.value) {
    event.preventDefault()
    clear()
  }
}
</script>

<template>
  <Input
    v-model="modelValue"
    role="searchbox"
    :size="size"
    :disabled="disabled"
    :prefix-styling="false"
    :suffix-styling="false"
    :class="cn('[&_input]:pr-1.5', props.class)"
    v-bind="$attrs"
    @keydown="onKeydown"
  >
    <template #prefix>
      <slot name="prefix">
        <template v-if="typeof prefix === 'string'">{{ prefix }}</template>
        <component :is="prefix" v-else-if="prefix" />
        <HugeiconsIcon
          v-else
          :icon="SearchIcon"
          :size="iconSize"
          class="text-[var(--ds-gray-900)]"
        />
      </slot>
    </template>

    <template #suffix>
      <span class="inline-flex items-center gap-1">
        <svg
          v-if="loading"
          class="size-4 animate-spin text-[var(--ds-gray-900)]"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" />
          <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>

        <template v-else-if="cmdk">
          <Kbd v-if="!hasValue" meta small>K</Kbd>
          <Kbd v-else small>Esc</Kbd>
        </template>

        <button
          v-else-if="hasValue"
          type="button"
          aria-label="Clear"
          class="inline-flex size-5 items-center justify-center rounded-[4px] text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-200)] hover:text-[var(--ds-gray-1000)]"
          @click="clear"
        >
          <HugeiconsIcon :icon="Cancel01Icon" :size="iconSize" />
        </button>
      </span>
    </template>
  </Input>
</template>
