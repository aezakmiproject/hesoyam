<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { computed, isVNode } from 'vue'
import { cn } from '../../lib/utils'
import Avatar from './Avatar.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: number
  icon?: VNode | (() => VNode)
  iconBackground?: boolean
  src?: string
  username?: string
  letter?: string
  placeholder?: boolean
  title?: string
}>(), {
  size: 32,
  placeholder: true,
})

const iconWrapper = computed(() => {
  if (!props.icon)
    return null
  const node = typeof props.icon === 'function' ? props.icon() : props.icon
  return {
    render: () => (isVNode(node) ? node : null),
  }
})
</script>

<template>
  <Avatar
    :size="size"
    :src="src"
    :username="username"
    :letter="letter"
    :placeholder="placeholder && !src && !username && !letter"
    :title="title"
    :class="cn(props.class)"
  >
    <span
      data-slot="avatar-icon"
      :class="cn(
        'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full text-[var(--ds-gray-900)]',
        iconBackground && 'bg-[var(--ds-gray-200)] ring-2 ring-[var(--ds-background-100)]',
      )"
      :style="{ width: `${Math.round(size * 0.45)}px`, height: `${Math.round(size * 0.45)}px` }"
    >
      <slot name="icon">
        <component :is="iconWrapper" />
      </slot>
    </span>
  </Avatar>
</template>
