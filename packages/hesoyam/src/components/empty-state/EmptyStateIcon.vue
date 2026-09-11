<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { toRender } from './render'

const props = defineProps<{
  icon?: unknown
  class?: HTMLAttributes['class']
}>()

const iconComponent = computed(() => toRender(props.icon))
</script>

<template>
  <div
    data-slot="empty-state-icon"
    :class="cn(
      'flex size-16 items-center justify-center rounded-[12px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] text-[var(--ds-gray-900)]',
      props.class,
    )"
  >
    <slot>
      <component :is="iconComponent" v-if="iconComponent" />
    </slot>
  </div>
</template>
