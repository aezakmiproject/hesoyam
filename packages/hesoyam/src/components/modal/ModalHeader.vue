<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'
import { modalContextKey } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const ctx = inject(modalContextKey, null)
const sticky = computed(() => ctx?.sticky.value ?? false)
</script>

<template>
  <div
    data-slot="modal-header"
    :class="cn(
      'mb-4 flex flex-col gap-2',
      sticky && 'bg-[var(--ds-background-100)] sticky top-0 z-10 -mx-6 px-6 pb-2 pt-0',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
