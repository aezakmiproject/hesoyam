<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { cn } from '../../lib/utils'
import { modalContextKey } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const ctx = inject(modalContextKey, null)
const sticky = computed(() => ctx?.sticky.value ?? false)
</script>

<template>
  <div
    data-slot="modal-actions"
    :class="cn(
      'flex items-center justify-between gap-3 border-t border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-6 py-4',
      sticky && 'sticky bottom-0 z-10',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
