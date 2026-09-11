<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TextareaSize } from '.'
import { useVModel } from '@vueuse/core'
import { computed, useId } from 'vue'
import { cn } from '../../lib/utils'
import { textareaVariants } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  size?: TextareaSize
  error?: string
  disabled?: boolean
  id?: string
}>(), {
  size: 'default',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const generatedId = useId()
const errorId = computed(() => props.error ? `${props.id ?? generatedId}-error` : undefined)
</script>

<template>
  <div class="flex w-full flex-col items-stretch">
    <textarea
      :id="id"
      v-model="modelValue"
      data-slot="textarea"
      :data-size="size"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="errorId"
      :class="cn(textareaVariants({ size }), props.class)"
      v-bind="$attrs"
    />
    <p
      v-if="error"
      :id="errorId"
      data-slot="textarea-error"
      class="mt-1.5 text-[13px] leading-4 text-[var(--ds-red-700)]"
    >
      {{ error }}
    </p>
  </div>
</template>
