<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, provide } from 'vue'
import { cn } from '@/lib/utils'
import { fieldsetKey, type FieldsetType } from './context'

const props = withDefaults(defineProps<{
  type?: FieldsetType
  class?: HTMLAttributes['class']
}>(), {
  type: 'default',
})

const type = computed(() => props.type)
provide(fieldsetKey, type)
</script>

<template>
  <div
    data-slot="fieldset"
    :data-type="type"
    role="group"
    :class="cn(
      'overflow-hidden rounded-md border bg-[var(--ds-background-100)]',
      type === 'default' && 'border-[var(--ds-gray-alpha-400)]',
      type === 'error' && 'border-[var(--ds-red-700)]',
      type === 'warning' && 'border-[var(--ds-amber-700)]',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
