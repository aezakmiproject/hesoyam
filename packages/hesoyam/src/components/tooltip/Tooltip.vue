<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TooltipBoxAlign, TooltipPosition, TooltipType } from '.'
import { reactiveOmit } from '@vueuse/core'
import { TooltipRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { cn } from '../../lib/utils'
import TooltipContent from './TooltipContent.vue'
import TooltipProvider from './TooltipProvider.vue'
import TooltipTrigger from './TooltipTrigger.vue'

const props = withDefaults(defineProps<TooltipRootProps & {
  text?: string
  position?: TooltipPosition
  delay?: boolean
  boxAlign?: TooltipBoxAlign
  type?: TooltipType
  tip?: boolean
  center?: boolean
  class?: HTMLAttributes['class']
}>(), {
  position: 'top',
  delay: true,
  boxAlign: 'center',
  type: 'default',
  tip: true,
  center: true,
})

const emits = defineEmits<TooltipRootEmits>()
const slots = useSlots()

const isCompact = computed(() => props.text !== undefined || !!slots.text)

const align = computed(() => {
  if (props.boxAlign === 'left')
    return 'start'
  if (props.boxAlign === 'right')
    return 'end'
  return 'center'
})

const delayDuration = computed(() => props.delay === false ? 0 : 150)

const delegatedProps = reactiveOmit(props, 'text', 'position', 'delay', 'boxAlign', 'type', 'tip', 'center', 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <slot v-if="disabled" />

  <TooltipProvider
    v-else-if="isCompact"
    :delay-duration="delayDuration"
  >
    <TooltipRoot
      v-slot="slotProps"
      data-slot="tooltip"
      v-bind="forwarded"
      :delay-duration="delayDuration"
    >
      <TooltipTrigger as-child>
        <span :class="cn('inline-flex max-w-full', props.class)">
          <slot v-bind="slotProps" />
        </span>
      </TooltipTrigger>
      <TooltipContent
        :side="position"
        :align="align"
        :type="type"
        :tip="tip"
        :center="center"
      >
        <slot name="text">
          {{ text }}
        </slot>
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>

  <TooltipProvider
    v-else
    :delay-duration="delayDuration"
  >
    <TooltipRoot
      v-slot="slotProps"
      data-slot="tooltip"
      v-bind="forwarded"
    >
      <slot v-bind="slotProps" />
    </TooltipRoot>
  </TooltipProvider>
</template>
