<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { isVNode } from 'vue'
import { cn } from '../../lib/utils'
import { MenuItem } from '../menu'

export interface SplitButtonMenuItemProps {
  onClick?: (event: MouseEvent) => void
  class?: HTMLAttributes['class']
  className?: string
  disabled?: boolean
}

const props = defineProps<{
  title?: unknown
  description?: string
  icon?: unknown
  menuItemProps?: SplitButtonMenuItemProps
  class?: HTMLAttributes['class']
}>()

function onClick(event: Event) {
  props.menuItemProps?.onClick?.(event as MouseEvent)
}
</script>

<template>
  <MenuItem
    :disabled="menuItemProps?.disabled"
    :class="cn(
      'h-auto items-start py-2 [&_[data-slot=menu-item-label]]:flex [&_[data-slot=menu-item-label]]:items-start [&_[data-slot=menu-item-label]]:gap-2 [&_[data-slot=menu-item-label]]:overflow-visible [&_[data-slot=menu-item-label]]:whitespace-normal',
      props.class,
      menuItemProps?.class,
      menuItemProps?.className,
    )"
    @click="onClick"
  >
    <span
      v-if="icon || $slots.icon"
      class="mt-0.5 flex shrink-0 items-center [&_svg]:size-4"
    >
      <slot name="icon">
        <component :is="icon" v-if="icon && (isVNode(icon) || typeof icon === 'object')" />
      </slot>
    </span>
    <span class="flex min-w-0 flex-col gap-0.5">
      <span class="text-[13px] font-medium leading-5 text-[var(--ds-gray-1000)]">
        <slot name="title">
          <component :is="title" v-if="title && typeof title !== 'string'" />
          <template v-else>{{ title }}</template>
        </slot>
      </span>
      <span
        v-if="description"
        class="text-[12px] leading-4 font-normal text-[var(--ds-gray-900)]"
      >
        {{ description }}
      </span>
    </span>
  </MenuItem>
</template>
