<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@lucide/vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, ref } from 'vue'
import { cn } from '../../lib/utils'

export type ScrollerOverflow = 'x' | 'y' | 'both'
type ScrollerFadeSide = 'left' | 'right' | 'top' | 'bottom'

const props = withDefaults(defineProps<{
  height?: number | string
  width?: number | string
  overflow?: ScrollerOverflow
  withButtons?: boolean
  childrenContainerClassName?: string
  class?: HTMLAttributes['class']
}>(), {
  overflow: 'y',
  withButtons: false,
})

const scrollRef = ref<HTMLElement | null>(null)
const canStartX = ref(false)
const canEndX = ref(false)
const canStartY = ref(false)
const canEndY = ref(false)
const canStart = computed(() => canStartX.value || canStartY.value)
const canEnd = computed(() => canEndX.value || canEndY.value)
const fadeSides = computed(() => {
  const sides: ScrollerFadeSide[] = []
  if (props.overflow === 'x' || props.overflow === 'both')
    sides.push('left', 'right')
  if (props.overflow === 'y' || props.overflow === 'both')
    sides.push('top', 'bottom')
  return sides
})
const fadeVisible = computed(() => ({
  left: canStartX.value,
  right: canEndX.value,
  top: canStartY.value,
  bottom: canEndY.value,
}))

function toCssSize(value: number | string | undefined): string | undefined {
  if (value === undefined)
    return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const sizeStyle = computed(() => ({
  height: toCssSize(props.height),
  width: toCssSize(props.width),
}))

function updateEdges() {
  const el = scrollRef.value
  if (!el)
    return

  const axisX = props.overflow === 'x' || props.overflow === 'both'
  const axisY = props.overflow === 'y' || props.overflow === 'both'

  canStartX.value = axisX && el.scrollLeft > 1
  canEndX.value = axisX && el.scrollLeft + el.clientWidth < el.scrollWidth - 1
  canStartY.value = axisY && el.scrollTop > 1
  canEndY.value = axisY && el.scrollTop + el.clientHeight < el.scrollHeight - 1
}

function scrollByDirection(direction: 1 | -1) {
  const el = scrollRef.value
  if (!el)
    return

  const kids = Array.from(el.children) as HTMLElement[]
  if (!kids.length)
    return

  const box = el.getBoundingClientRect()
  const horizontal = props.overflow === 'x' || (props.overflow === 'both' && el.scrollWidth > el.clientWidth)

  const visibleEnough = (node: HTMLElement) => {
    const rect = node.getBoundingClientRect()
    if (horizontal)
      return direction > 0 ? rect.right > box.right + 2 : rect.left < box.left - 2
    return direction > 0 ? rect.bottom > box.bottom + 2 : rect.top < box.top - 2
  }

  const target = direction > 0
    ? kids.find(visibleEnough)
    : [...kids].reverse().find(visibleEnough)

  ;(target ?? (direction > 0 ? kids[kids.length - 1] : kids[0]))?.scrollIntoView({
    behavior: 'smooth',
    block: horizontal ? 'nearest' : 'start',
    inline: horizontal ? 'start' : 'nearest',
  })
}

const overflowClass = computed(() => {
  if (props.overflow === 'x')
    return 'overflow-x-auto overflow-y-hidden'
  if (props.overflow === 'both')
    return 'overflow-auto'
  return 'overflow-y-auto overflow-x-hidden'
})

const prevIcon = computed(() => (
  props.overflow === 'x' ? ChevronLeft : ChevronUp
))
const nextIcon = computed(() => (
  props.overflow === 'x' ? ChevronRight : ChevronDown
))
const prevLabel = computed(() => (
  props.overflow === 'x' ? 'Scroll left' : 'Scroll up'
))
const nextLabel = computed(() => (
  props.overflow === 'x' ? 'Scroll right' : 'Scroll down'
))

onMounted(() => {
  nextTick(updateEdges)
})

useEventListener(scrollRef, 'scroll', updateEdges, { passive: true })
useResizeObserver(scrollRef, updateEdges)
</script>

<template>
  <div
    data-slot="scroller"
    :data-overflow="overflow"
    :class="cn('relative isolate', props.class)"
    :style="sizeStyle"
  >
    <button
      v-if="withButtons && canStart"
      type="button"
      :aria-label="prevLabel"
      :class="cn(
        'absolute z-10 flex size-8 items-center justify-center rounded-md border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] shadow-sm',
        overflow === 'x' ? 'top-1/2 left-2 -translate-y-1/2' : 'top-2 left-1/2 -translate-x-1/2',
      )"
      @click="scrollByDirection(-1)"
    >
      <component :is="prevIcon" :size="16" />
    </button>
    <button
      v-if="withButtons && canEnd"
      type="button"
      :aria-label="nextLabel"
      :class="cn(
        'absolute z-10 flex size-8 items-center justify-center rounded-md border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] shadow-sm',
        overflow === 'x' ? 'top-1/2 right-2 -translate-y-1/2' : 'bottom-2 left-1/2 -translate-x-1/2',
      )"
      @click="scrollByDirection(1)"
    >
      <component :is="nextIcon" :size="16" />
    </button>

    <div
      v-for="side in fadeSides"
      :key="side"
      aria-hidden="true"
      class="geist-scroller-fade"
      :data-side="side"
      :data-visible="fadeVisible[side] ? 'true' : 'false'"
    >
      <span /><span /><span /><span /><span />
    </div>

    <div
      ref="scrollRef"
      :class="cn(
        'geist-scroller size-full',
        overflowClass,
        withButtons && overflow === 'x' && 'flex',
        withButtons && overflow === 'y' && 'flex flex-col',
        childrenContainerClassName,
      )"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.geist-scroller {
  scrollbar-width: thin;
  scrollbar-color: var(--ds-gray-500) transparent;
}

.geist-scroller-fade {
  pointer-events: none;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity 220ms ease-out;
}

.geist-scroller-fade[data-visible='true'] {
  opacity: 1;
}

.geist-scroller-fade[data-side='left'] {
  inset: 0 auto 0 0;
  width: 4.5rem;
  --fade-dir: to right;
}

.geist-scroller-fade[data-side='right'] {
  inset: 0 0 0 auto;
  width: 4.5rem;
  --fade-dir: to left;
}

.geist-scroller-fade[data-side='top'] {
  inset: 0 0 auto 0;
  height: 4.5rem;
  --fade-dir: to bottom;
}

.geist-scroller-fade[data-side='bottom'] {
  inset: auto 0 0 0;
  height: 4.5rem;
  --fade-dir: to top;
}

.geist-scroller-fade > span {
  position: absolute;
  inset: 0;
}

.geist-scroller-fade > span:nth-child(1) {
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 95%);
  -webkit-mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 95%);
}

.geist-scroller-fade > span:nth-child(2) {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 75%);
  -webkit-mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 75%);
}

.geist-scroller-fade > span:nth-child(3) {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 52%);
  -webkit-mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 52%);
}

.geist-scroller-fade > span:nth-child(4) {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 32%);
  -webkit-mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 32%);
}

.geist-scroller-fade > span:nth-child(5) {
  background: linear-gradient(var(--fade-dir), var(--ds-background-100) 0%, transparent 70%);
}
</style>
