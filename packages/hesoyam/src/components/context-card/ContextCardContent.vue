<script setup lang="ts">
import type { HoverCardContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { HoverCardContent, HoverCardPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<HoverCardContentProps & { class?: HTMLAttributes['class'] }>(), {
  sideOffset: 8,
  collisionPadding: 8,
})
const emits = defineEmits<{
  'update:open': [value: boolean]
  closeAutoFocus: [event: Event]
  escapeKeyDown: [event: KeyboardEvent]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
  openAutoFocus: [event: Event]
  pointerDownOutside: [event: Event]
}>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      data-slot="context-card-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(
        'z-50 w-fit max-w-xs origin-(--reka-hover-card-content-transform-origin) rounded-md border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3.5 py-3 text-[13px] leading-5 text-[var(--ds-gray-1000)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]',
        'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        props.class,
      )"
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
