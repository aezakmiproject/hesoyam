<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { ButtonVariants } from '../button'
import { ChevronDown } from '@lucide/vue'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../dropdown-menu'

export type SplitButtonSize = 'small' | 'medium' | 'large'
export type SplitButtonVariant = 'default' | 'secondary'
export type SplitButtonAlignment = 'bottom-start' | 'bottom-end'

export interface SplitButtonButtonProps {
  onClick?: (event: MouseEvent) => void
  size?: SplitButtonSize | ButtonVariants['size']
  variant?: SplitButtonVariant
  disabled?: boolean
  class?: HTMLAttributes['class']
  className?: string
}

export interface SplitButtonMenuProps {
  width?: number
}

const props = withDefaults(defineProps<{
  buttonProps?: SplitButtonButtonProps
  menuButtonLabel: string
  menuItems?: VNode | VNode[]
  menuProps?: SplitButtonMenuProps
  menuAlignment?: SplitButtonAlignment
  class?: HTMLAttributes['class']
}>(), {
  menuAlignment: 'bottom-start',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function mapSize(size?: SplitButtonButtonProps['size']): ButtonVariants['size'] {
  if (size === 'small' || size === 'sm')
    return 'sm'
  if (size === 'large' || size === 'lg')
    return 'lg'
  return 'default'
}

function mapVariant(variant?: SplitButtonVariant): ButtonVariants['variant'] {
  if (variant === 'secondary')
    return 'outline'
  return 'default'
}

const size = computed(() => mapSize(props.buttonProps?.size))
const variant = computed(() => mapVariant(props.buttonProps?.variant))
const iconSize = computed(() => {
  if (props.buttonProps?.size === 'large' || props.buttonProps?.size === 'lg')
    return 'icon-lg'
  if (props.buttonProps?.size === 'small' || props.buttonProps?.size === 'sm')
    return 'icon-sm'
  return 'icon'
})
const menuAlign = computed(() => props.menuAlignment === 'bottom-end' ? 'end' : 'start')
const menuItems = computed(() => {
  const items = props.menuItems
  if (!items)
    return []
  return Array.isArray(items) ? items : [items]
})

function onPrimaryClick(event: MouseEvent) {
  props.buttonProps?.onClick?.(event)
  emit('click', event)
}
</script>

<template>
  <div
    data-slot="split-button"
    :data-size="buttonProps?.size ?? 'medium'"
    :data-variant="buttonProps?.variant ?? 'default'"
    :class="cn('inline-flex items-stretch', props.class)"
  >
    <Button
      type="button"
      :variant="variant"
      :size="size"
      :disabled="buttonProps?.disabled"
      :class="cn(
        'rounded-r-none border-r-0',
        buttonProps?.class,
        buttonProps?.className,
      )"
      @click="onPrimaryClick"
    >
      <slot />
    </Button>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          type="button"
          :variant="variant"
          :size="iconSize"
          :disabled="buttonProps?.disabled"
          :aria-label="menuButtonLabel"
          class="-ml-px rounded-l-none"
        >
          <ChevronDown
            :size="16"
            :stroke-width="1.75"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        :align="menuAlign"
        :style="menuProps?.width
          ? { width: `${menuProps.width}px`, minWidth: `${menuProps.width}px` }
          : undefined"
        class="w-auto min-w-56"
      >
        <slot name="menuItems">
          <component
            :is="item"
            v-for="(item, index) in menuItems"
            :key="index"
          />
        </slot>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
