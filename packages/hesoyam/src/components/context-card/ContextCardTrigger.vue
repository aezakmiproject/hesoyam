<script setup lang="ts">
import type { AsTag } from 'reka-ui'
import type { Component, HTMLAttributes } from 'vue'
import { HoverCardRoot, HoverCardTrigger, Primitive } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import ContextCardContent from './ContextCardContent.vue'

defineOptions({ inheritAttrs: false })

export type ContextCardSide = 'top' | 'bottom' | 'left' | 'right'
export type ContextCardAlign = 'start' | 'center' | 'end'

const props = withDefaults(defineProps<{
  content?: string
  side?: ContextCardSide
  align?: ContextCardAlign
  render?: AsTag | Component
  as?: AsTag | Component
  asChild?: boolean
  class?: HTMLAttributes['class']
}>(), {
  side: 'top',
  align: 'center',
  as: 'div',
})

const open = ref(false)
const triggerAs = computed(() => props.render ?? props.as)
</script>

<template>
  <HoverCardRoot
    v-model:open="open"
    :open-delay="150"
    :close-delay="100"
  >
    <HoverCardTrigger as-child>
      <Primitive
        data-slot="context-card-trigger"
        :as="triggerAs"
        :as-child="asChild"
        tabindex="0"
        v-bind="$attrs"
        :class="cn('inline-flex cursor-default', props.class)"
        @focus="open = true"
      >
        <slot />
      </Primitive>
    </HoverCardTrigger>
    <ContextCardContent :side="side" :align="align">
      <slot name="content">
        {{ content }}
      </slot>
    </ContextCardContent>
  </HoverCardRoot>
</template>
