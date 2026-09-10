<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { isVNode } from 'vue'
import { cn } from '@/lib/utils'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

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

function onClick(event: MouseEvent) {
  props.menuItemProps?.onClick?.(event)
}
</script>

<template>
  <DropdownMenuItem
    :disabled="menuItemProps?.disabled"
    :class="cn(
      'items-start py-2',
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
  </DropdownMenuItem>
</template>
