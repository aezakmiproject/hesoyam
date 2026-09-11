<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  title?: string
  description?: string
  fill?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="entity-content"
    :data-fill="fill ? 'true' : undefined"
    :class="cn(
      'flex min-w-0 flex-col gap-0.5',
      fill && 'flex-1',
      props.class,
    )"
  >
    <div
      v-if="title || $slots.title"
      data-slot="entity-title"
      class="truncate text-sm font-medium text-[var(--ds-gray-1000)]"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <div
      v-if="description || $slots.description"
      data-slot="entity-description"
      class="text-[13px] leading-5 text-[var(--ds-gray-900)]"
    >
      <slot name="description">{{ description }}</slot>
    </div>
    <slot />
  </div>
</template>
