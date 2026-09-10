<script setup lang="ts">
import type { ContextMenuItemEmits, ContextMenuItemProps } from 'reka-ui'
import type { Component, HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ContextMenuItem, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { menuItemClass } from '@/components/ui/menu'
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuItemProps & {
  class?: HTMLAttributes['class']
  href?: string
  value?: string
  prefix?: Component | string
  suffix?: Component | string
}>()

const emits = defineEmits<ContextMenuItemEmits & {
  click: [event: Event]
}>()

const itemAs = computed(() => props.href ? 'a' : props.as)

const delegatedProps = reactiveOmit(props, 'class', 'href', 'value', 'prefix', 'suffix')
const forwarded = useForwardProps(delegatedProps)

function onSelect(event: Event) {
  emits('select', event)
  emits('click', event)
}
</script>

<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    :data-value="value"
    :as="itemAs"
    :href="href"
    v-bind="forwarded"
    :class="cn(menuItemClass, props.class)"
    @select="onSelect"
  >
    <span
      v-if="prefix || $slots.prefix"
      data-slot="context-menu-item-prefix"
      class="inline-flex size-4 shrink-0 items-center justify-center text-[var(--ds-gray-900)]"
    >
      <slot name="prefix">
        <component :is="prefix" />
      </slot>
    </span>
    <span class="min-w-0 flex-1 truncate">
      <slot />
    </span>
    <span
      v-if="suffix || $slots.suffix"
      data-slot="context-menu-item-suffix"
      class="ml-auto inline-flex size-4 shrink-0 items-center justify-center text-[var(--ds-gray-900)]"
    >
      <slot name="suffix">
        <component :is="suffix" />
      </slot>
    </span>
  </ContextMenuItem>
</template>
