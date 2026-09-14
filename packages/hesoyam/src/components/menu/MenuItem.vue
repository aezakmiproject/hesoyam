<script setup lang="ts">
import type { DropdownMenuItemEmits, DropdownMenuItemProps } from 'reka-ui'
import type { Component, HTMLAttributes } from 'vue'
import type { MenuItemType } from '.'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItem, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { menuItemClass } from '.'

const props = withDefaults(defineProps<DropdownMenuItemProps & {
  class?: HTMLAttributes['class']
  type?: MenuItemType
  href?: string
  prefix?: Component | string
  suffix?: Component | string
}>(), {
  type: 'default',
})

const emits = defineEmits<DropdownMenuItemEmits & {
  click: [event: Event]
}>()

const itemAs = computed(() => props.href ? 'a' : props.as)

const delegatedProps = reactiveOmit(props, 'class', 'type', 'href', 'prefix', 'suffix')
const forwarded = useForwardProps(delegatedProps)

function onSelect(event: Event) {
  emits('select', event)
  emits('click', event)
}
</script>

<template>
  <DropdownMenuItem
    data-slot="menu-item"
    :data-type="type"
    :as="itemAs"
    :href="href"
    v-bind="forwarded"
    :class="cn(menuItemClass, props.class)"
    @select="onSelect"
  >
    <span
      v-if="prefix || $slots.prefix"
      data-slot="menu-item-prefix"
      class="inline-flex size-4 shrink-0 items-center justify-center text-[var(--ds-gray-900)]"
    >
      <slot name="prefix">
        <component :is="prefix" />
      </slot>
    </span>
    <span data-slot="menu-item-label" class="min-w-0 flex-1 truncate">
      <slot />
    </span>
    <span
      v-if="suffix || $slots.suffix"
      data-slot="menu-item-suffix"
      class="ml-auto inline-flex size-4 shrink-0 items-center justify-center text-[var(--ds-gray-900)]"
    >
      <slot name="suffix">
        <component :is="suffix" />
      </slot>
    </span>
  </DropdownMenuItem>
</template>
