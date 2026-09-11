<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { toRender } from './render'

const props = withDefaults(defineProps<{
  as?: string
  left?: unknown
  right?: unknown
  leftClassName?: string
  rightClassName?: string
  class?: HTMLAttributes['class']
}>(), {
  as: 'div',
})

const leftComponent = computed(() => toRender(props.left))
const rightComponent = computed(() => toRender(props.right))
</script>

<template>
  <component
    :is="as"
    data-slot="entity"
    :type="as === 'button' ? 'button' : undefined"
    :class="cn(
      'flex w-full items-center gap-3 py-3 text-left',
      as === 'button' && 'hover:bg-[var(--ds-gray-100)] focus-visible:ring-ring/40 rounded-md outline-none focus-visible:ring-2',
      props.class,
    )"
  >
    <div
      v-if="leftComponent || $slots.left"
      data-slot="entity-left"
      :class="cn('flex shrink-0 items-center', leftClassName)"
    >
      <slot name="left">
        <component :is="leftComponent" />
      </slot>
    </div>
    <div
      data-slot="entity-body"
      class="flex min-w-0 flex-1 items-center gap-3"
    >
      <slot />
    </div>
    <div
      v-if="rightComponent || $slots.right"
      data-slot="entity-right"
      :class="cn('flex shrink-0 items-center', rightClassName)"
    >
      <slot name="right">
        <component :is="rightComponent" />
      </slot>
    </div>
  </component>
</template>
