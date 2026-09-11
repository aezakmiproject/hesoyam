<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItem, useForwardProps } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<DropdownMenuItemProps & {
  class?: HTMLAttributes['class']
  inset?: boolean
  variant?: 'default' | 'destructive'
}>(), {
  variant: 'default',
})

const delegatedProps = reactiveOmit(props, 'inset', 'variant', 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    v-bind="forwardedProps"
    :class="cn('focus:bg-[var(--ds-gray-100)] data-highlighted:bg-[var(--ds-gray-100)] focus:text-[var(--ds-gray-1000)] data-[variant=destructive]:text-[var(--ds-red-700)] data-[variant=destructive]:focus:bg-[var(--ds-red-700)]/10 data-[variant=destructive]:focus:text-[var(--ds-red-700)] data-[variant=destructive]:*:[svg]:text-[var(--ds-red-700)] min-h-8 gap-2 rounded-[6px] px-2 py-1.5 text-[13px] data-inset:pl-7.5 [&_svg:not([class*=size-])]:size-3.5 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:cursor-not-allowed data-disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0', props.class)"
  >
    <slot />
  </DropdownMenuItem>
</template>
