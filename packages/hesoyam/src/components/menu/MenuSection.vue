<script setup lang="ts">
import type { DropdownMenuGroupProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuGroup, DropdownMenuLabel } from 'reka-ui'
import { cn } from '../../lib/utils'
import { menuSectionTitleClass } from '.'

const props = defineProps<DropdownMenuGroupProps & {
  class?: HTMLAttributes['class']
  title?: string
}>()

const delegatedProps = reactiveOmit(props, 'class', 'title')
</script>

<template>
  <DropdownMenuGroup
    data-slot="menu-section"
    v-bind="delegatedProps"
    :class="cn(props.class)"
  >
    <DropdownMenuLabel
      v-if="title || $slots.title"
      data-slot="menu-section-title"
      :class="menuSectionTitleClass"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </DropdownMenuLabel>
    <slot />
  </DropdownMenuGroup>
</template>
