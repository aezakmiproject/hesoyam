<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Copy, Check } from '@lucide/vue'
import { cn } from '../../lib/utils'
import { computed, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  textToCopy: string
  label?: string
  copied?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  label: 'Copy',
  copied: undefined,
})

const emit = defineEmits<{
  copy: []
}>()

const internalCopied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

const isCopied = computed(() => props.copied ?? internalCopied.value)

async function copy() {
  if (props.disabled) return

  if (props.copied === undefined) {
    internalCopied.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      internalCopied.value = false
    }, 2000)
  }

  emit('copy')

  try {
    await navigator.clipboard.writeText(props.textToCopy)
  }
  catch {
    const el = document.createElement('textarea')
    el.value = props.textToCopy
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}

onUnmounted(() => {
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template>
  <button
    type="button"
    data-slot="copy-button"
    :aria-label="label"
    :disabled="disabled"
    :class="cn(
      'inline-flex size-8 shrink-0 items-center justify-center rounded-md text-[var(--ds-gray-900)] transition-colors outline-none',
      'hover:bg-[var(--ds-gray-200)] hover:text-[var(--ds-gray-1000)]',
      'focus-visible:border-[var(--ds-focus)] focus-visible:ring-[var(--ds-focus)]/40 focus-visible:ring-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
    @click="copy"
  >
    <span class="relative inline-flex size-4 items-center justify-center">
      <Copy
        :size="16"
        :stroke-width="1.75"
        class="absolute inset-0 size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="isCopied ? 'scale-0' : 'scale-100 delay-300'"
      />
      <Check
        :size="16"
        :stroke-width="1.75"
        class="absolute inset-0 size-4 text-[var(--ds-green-900)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="isCopied ? 'scale-100 delay-300' : 'scale-0'"
      />
    </span>
  </button>
</template>
