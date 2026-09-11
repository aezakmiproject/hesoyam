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
    data-slot="modal-body"
    :data-sticky="sticky ? '' : undefined"
    :class="cn(
      'flex min-h-0 flex-col p-6',
      sticky && 'flex-1 overflow-y-auto',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
