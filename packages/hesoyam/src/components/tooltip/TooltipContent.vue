<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TooltipType } from '.'
import { reactiveOmit } from '@vueuse/core'
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'
import { tooltipArrowVariants, tooltipContentVariants } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps & {
  class?: HTMLAttributes['class']
  type?: TooltipType
  tip?: boolean
  center?: boolean
}>(), {
  sideOffset: 6,
  type: 'default',
  tip: true,
  center: true,
})

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'type', 'tip', 'center')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      :data-type="type"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(tooltipContentVariants({ type, center }), props.class)"
    >
      <slot />

      <TooltipArrow
        v-if="tip"
        :width="10"
        :height="4"
        :class="cn('z-50', tooltipArrowVariants({ type }))"
      />
    </TooltipContent>
  </TooltipPortal>
</template>
