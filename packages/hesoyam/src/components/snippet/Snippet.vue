<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { CopyButton } from '../copy-button'
import { computed } from 'vue'

export type SnippetType = 'default' | 'success' | 'error' | 'warning'

const props = withDefaults(defineProps<{
  text?: string | string[]
  width?: string
  dark?: boolean
  prompt?: boolean
  type?: SnippetType
  copied?: boolean
  copyText?: string
  placeholder?: string
  onCopy?: () => void
  class?: HTMLAttributes['class']
}>(), {
  text: '',
  prompt: true,
  type: 'default',
  copied: undefined,
})

const emit = defineEmits<{
  copy: []
}>()

const lines = computed(() => {
  if (Array.isArray(props.text)) return props.text
  if (props.text === '') return []
  return [props.text]
})

const clipboardText = computed(() => {
  if (props.copyText !== undefined) return props.copyText
  return lines.value.join('\n')
})

const isEmpty = computed(() => lines.value.length === 0)

const typeClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-[var(--ds-green-900)] border-[var(--ds-green-400)]'
    case 'error':
      return 'text-[var(--ds-red-900)] border-[var(--ds-red-400)]'
    case 'warning':
      return 'text-[var(--ds-amber-900)] border-[var(--ds-amber-400)]'
    default:
      return 'text-[var(--ds-gray-1000)] border-[var(--ds-gray-alpha-400)]'
  }
})
</script>

<template>
  <div
    data-slot="snippet"
    :data-type="type"
    :data-inverted="dark ? '' : undefined"
    :class="cn(
      'relative flex items-stretch rounded-md border bg-[var(--ds-background-100)] font-mono text-[13px] leading-5',
      typeClass,
      dark && 'border-[var(--ds-gray-alpha-400)] bg-black',
      dark && type === 'default' && 'text-[#ededed]',
      props.class,
    )"
    :style="width ? { width } : undefined"
  >
    <div class="min-w-0 flex-1 overflow-x-auto px-3 py-2">
      <p
        v-if="isEmpty && placeholder"
        class="m-0 text-[var(--ds-gray-900)]"
      >
        {{ placeholder }}
      </p>
      <template v-else>
        <div
          v-for="(line, index) in lines"
          :key="index"
          class="flex min-h-5 items-start gap-2 whitespace-pre"
        >
          <span
            v-if="prompt"
            class="select-none text-[var(--ds-gray-900)]"
            aria-hidden="true"
          >$</span>
          <span class="min-w-0">{{ line }}</span>
        </div>
      </template>
    </div>

    <div class="flex items-start pr-1 pt-0.5">
      <CopyButton
        :text-to-copy="clipboardText"
        v-bind="copied === undefined ? {} : { copied }"
        label="Copy snippet"
        :disabled="isEmpty && !copyText"
        class="size-7"
        @copy="emit('copy'); onCopy?.()"
      />
    </div>
  </div>
</template>
