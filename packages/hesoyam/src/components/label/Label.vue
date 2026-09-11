<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  id?: string
  htmlFor?: string
  value?: string
  withInput?: boolean
  bypassCasing?: boolean
  class?: HTMLAttributes['class']
}>()

function toTitleCase(value: string) {
  return value.replace(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)?/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
}

const displayValue = computed(() => {
  if (props.value == null)
    return undefined
  return props.bypassCasing ? props.value : toTitleCase(props.value)
})
</script>

<template>
  <label
    :id="id"
    :for="htmlFor"
    data-slot="label"
    :class="cn(
      'text-[13px] leading-4 font-medium text-[var(--ds-gray-1000)]',
      withInput && 'mb-1.5 block',
      props.class,
    )"
  >
    <slot>{{ displayValue }}</slot>
  </label>
</template>
