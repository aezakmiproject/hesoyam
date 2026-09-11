<script setup lang="ts">
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    v-bind="forwarded"
    :class="cn(
      'focus:bg-[var(--ds-gray-100)] data-highlighted:bg-[var(--ds-gray-100)] min-h-8 gap-2 rounded-[6px] py-1.5 pr-8 pl-2 text-[13px] data-inset:pl-7.5 [&_svg:not([class*=size-])]:size-3.5 relative flex cursor-default items-center outline-hidden select-none data-disabled:cursor-not-allowed data-disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <span
      class="absolute right-2 flex items-center justify-center pointer-events-none"
      data-slot="dropdown-menu-checkbox-item-indicator"
    >
      <DropdownMenuItemIndicator>
        <slot name="indicator-icon">
          <Check :size="14" />
        </slot>
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
