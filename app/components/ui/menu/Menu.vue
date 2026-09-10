<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { MenuPosition } from '.'
import { reactiveOmit } from '@vueuse/core'
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, inject, ref } from 'vue'
import { cn } from '@/lib/utils'
import { menuContentClass, menuPositionKey, parseMenuPosition } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuContentProps & {
  class?: HTMLAttributes['class']
  width?: number | string
}>(), {
  sideOffset: 6,
})

const emits = defineEmits<DropdownMenuContentEmits>()

const injectedPosition = inject(menuPositionKey, ref<MenuPosition>('bottom-start'))
const placement = computed(() => parseMenuPosition(injectedPosition.value))

const widthStyle = computed(() => {
  if (props.width == null)
    return undefined
  return { width: typeof props.width === 'number' ? `${props.width}px` : props.width }
})

const delegatedProps = reactiveOmit(props, 'class', 'width')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      data-slot="menu"
      v-bind="{ ...$attrs, ...forwarded }"
      :side="side ?? placement.side"
      :align="align ?? placement.align"
      :style="widthStyle"
      :class="cn(menuContentClass, 'origin-(--reka-dropdown-menu-content-transform-origin) max-h-(--reka-dropdown-menu-content-available-height) overflow-x-hidden overflow-y-auto', props.class)"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
