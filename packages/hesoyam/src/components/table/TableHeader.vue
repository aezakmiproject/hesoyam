<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const table = inject(tableContextKey, null)

const headerClass = computed(() => cn(
  table?.virtualize.value && 'sticky top-0 z-10 bg-[var(--ds-background-100)]',
  props.class,
))
</script>

<template>
  <thead
    data-slot="table-header"
    :class="headerClass"
  >
    <slot />
  </thead>
</template>
