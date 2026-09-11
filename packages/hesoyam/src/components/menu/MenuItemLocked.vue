<script setup lang="ts">
import type { DropdownMenuItemEmits, DropdownMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Lock } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuItemClass } from '.'

const props = defineProps<DropdownMenuItemProps & {
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<DropdownMenuItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuItem
    data-slot="menu-item-locked"
    disabled
    v-bind="forwarded"
    :class="cn(menuItemClass, 'w-full', props.class)"
  >
    <span class="min-w-0 flex-1 truncate">
      <slot />
    </span>
    <Lock
      :size="14"
      class="ml-auto text-[var(--ds-gray-900)]"
    />
  </DropdownMenuItem>
</template>
