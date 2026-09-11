<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, provide, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { cn } from '../../lib/utils'
import {
  gridSystemKey,
  useViewportBreakpoint,
  widthToBreakpoint,
  type Breakpoint,
} from './utils'

const props = withDefaults(defineProps<{
  debug?: boolean
  guideWidth?: number
  dashedGuides?: boolean
  unstable_useContainer?: boolean
  class?: HTMLAttributes['class']
}>(), {
  debug: false,
  guideWidth: 1,
  dashedGuides: false,
  unstable_useContainer: false,
})

const rootRef = ref<HTMLElement | null>(null)
const viewportBreakpoint = useViewportBreakpoint()
const containerBreakpoint = ref<Breakpoint>('sm')

useResizeObserver(rootRef, (entries) => {
  const width = entries[0]?.contentRect.width ?? 0
  containerBreakpoint.value = widthToBreakpoint(width)
})

const breakpoint = computed(() => (
  props.unstable_useContainer ? containerBreakpoint.value : viewportBreakpoint.value
))

provide(gridSystemKey, {
  guideWidth: computed(() => props.guideWidth),
  dashedGuides: computed(() => props.dashedGuides),
  debug: computed(() => props.debug),
  useContainer: computed(() => props.unstable_useContainer),
  breakpoint,
  observe: (el) => {
    rootRef.value = el
  },
})
</script>

<template>
  <div
    ref="rootRef"
    data-slot="grid-system"
    :data-debug="debug ? '' : undefined"
    :data-container="unstable_useContainer ? '' : undefined"
    :class="cn(
      'relative w-full',
      unstable_useContainer && '[container-type:inline-size]',
      debug && 'outline outline-1 outline-[var(--ds-blue-700)]/40',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
