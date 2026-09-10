<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  textToCopy: string
  label?: string
  copied?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  label: 'Copy',
})

const emit = defineEmits<{
  copy: []
}>()

const internalCopied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

const isCopied = computed(() => props.copied ?? internalCopied.value)

async function copy() {
  if (props.disabled) return
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

  if (props.copied === undefined) {
    internalCopied.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      internalCopied.value = false
    }, 1000)
  }

  emit('copy')
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
      'focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-2',
      'disabled:pointer-events-none disabled:opacity-50',
      props.class,
    )"
    @click="copy"
  >
    <HugeiconsIcon
      :icon="isCopied ? Tick02Icon : Copy01Icon"
      :size="16"
      color="currentColor"
      :stroke-width="1.75"
      :class="isCopied ? 'text-[var(--ds-green-900)]' : undefined"
    />
  </button>
</template>
