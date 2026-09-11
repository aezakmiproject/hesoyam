<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes, VNode } from 'vue'
import type { BadgeVariants } from '.'
import { Primitive } from 'reka-ui'
import { computed, isVNode } from 'vue'
import { cn } from '../../lib/utils'
import { badgeVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: BadgeVariants['variant']
  contrast?: BadgeVariants['contrast']
  size?: BadgeVariants['size']
  icon?: VNode | (() => VNode)
  title?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  contrast: 'high',
  size: 'md',
})

const iconNode = computed(() => {
  if (!props.icon)
    return null
  return typeof props.icon === 'function' ? props.icon() : props.icon
})

const iconWrapper = computed(() => {
  const node = iconNode.value
  if (!node)
    return null
  return {
    render: () => (isVNode(node) ? node : null),
  }
})
</script>

<template>
  <Primitive
    data-slot="badge"
    :data-variant="variant"
    :data-contrast="contrast"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :title="title"
    :class="cn(badgeVariants({ variant, contrast, size }), props.class)"
  >
    <span v-if="iconWrapper || $slots.icon" data-slot="icon">
      <slot name="icon">
        <component :is="iconWrapper" />
      </slot>
    </span>
    <slot />
  </Primitive>
</template>
