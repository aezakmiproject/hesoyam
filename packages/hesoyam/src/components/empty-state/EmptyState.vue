<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { toRender } from './render'

const props = defineProps<{
  title?: string
  description?: string
  icon?: unknown
  class?: HTMLAttributes['class']
}>()

const iconComponent = computed(() => toRender(props.icon))
</script>

<template>
  <div
    data-slot="empty-state"
    :class="cn(
      'flex w-full flex-col items-center justify-center gap-3 px-6 py-12 text-center',
      props.class,
    )"
  >
    <slot name="icon">
      <component :is="iconComponent" v-if="iconComponent" />
    </slot>
    <div class="flex max-w-md flex-col items-center gap-1">
      <h3
        v-if="title || $slots.title"
        data-slot="empty-state-title"
        class="text-sm font-medium text-[var(--ds-gray-1000)]"
      >
        <slot name="title">{{ title }}</slot>
      </h3>
      <p
        v-if="description || $slots.description"
        data-slot="empty-state-description"
        class="text-[13px] leading-5 text-[var(--ds-gray-900)]"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <div
      v-if="$slots.default"
      data-slot="empty-state-actions"
      class="mt-1 flex flex-wrap items-center justify-center gap-3"
    >
      <slot />
    </div>
  </div>
</template>
