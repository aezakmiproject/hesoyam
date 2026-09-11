<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../lib/utils'

defineOptions({ name: 'HesoyamError' })

const props = withDefaults(defineProps<{
  label?: string | false
  size?: 'small' | 'medium' | 'large'
  error?: {
    message: string
    action?: string
    link?: string
  }
  class?: HTMLAttributes['class']
}>(), {
  label: 'Error',
  size: 'medium',
})

const message = computed(() => props.error?.message)
const showLabel = computed(() => props.label !== false && props.label !== '')
const labelText = computed(() => (props.label === false ? '' : props.label))
const sizeClass = computed(() => {
  if (props.size === 'small') return 'text-xs'
  if (props.size === 'large') return 'text-base'
  return 'text-[13px]'
})
</script>

<template>
  <p
    data-slot="error"
    :data-size="size"
    role="alert"
    :class="cn(
      'm-0 text-[var(--ds-red-900)]',
      sizeClass,
      props.class,
    )"
  >
    <strong
      v-if="showLabel"
      data-slot="error-label"
      class="font-medium"
    >{{ labelText }}: </strong>
    <slot>{{ message }}</slot>
    <template v-if="error?.action">
      {{ ' ' }}
      <a
        v-if="error.link"
        :href="error.link"
        class="underline underline-offset-2 hover:text-[var(--ds-red-1000)]"
      >{{ error.action }}</a>
      <span v-else>{{ error.action }}</span>
    </template>
  </p>
</template>
