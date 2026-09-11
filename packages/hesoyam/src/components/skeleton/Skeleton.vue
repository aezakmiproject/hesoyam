<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue'
import { computed, useSlots } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  width?: number | string
  height?: number | string
  boxHeight?: number | string
  pill?: boolean
  rounded?: boolean
  squared?: boolean
  animated?: boolean
  show?: boolean
  button?: boolean
}>(), {
  animated: true,
})

const slots = useSlots()

function toCssSize(value?: number | string) {
  if (value == null)
    return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const hasChildren = computed(() => {
  const nodes = slots.default?.()
  if (!nodes?.length)
    return false
  return nodes.some((node) => {
    if (node.children == null)
      return false
    if (Array.isArray(node.children) && node.children.length === 0)
      return false
    return true
  })
})

const isShown = computed(() => props.show ?? true)
const extra = computed(() => (props.button ? 1 : 0))

const boxStyle = computed<CSSProperties>(() => {
  const width = toCssSize(props.width)
  const boxHeight = toCssSize(props.boxHeight ?? props.height)
  const style: CSSProperties = {}
  if (width)
    style.width = extra.value ? `calc(${width} + ${extra.value}px)` : width
  if (boxHeight)
    style.height = extra.value ? `calc(${boxHeight} + ${extra.value}px)` : boxHeight
  return style
})

const shapeClass = computed(() => {
  if (props.pill)
    return 'rounded-full'
  if (props.squared)
    return 'rounded-none'
  return 'rounded-[6px]'
})

const shimmerStyle = computed<CSSProperties | undefined>(() => {
  if (!props.animated)
    return { backgroundColor: 'var(--ds-gray-200)' }
  return {
    backgroundColor: 'var(--ds-gray-200)',
    backgroundImage: 'linear-gradient(90deg, var(--ds-gray-200) 0%, var(--ds-gray-100) 45%, var(--ds-gray-200) 100%)',
    backgroundSize: '200% 100%',
    animation: 'ds-skeleton-shimmer 1.6s ease-in-out infinite',
  }
})
</script>

<template>
  <span
    v-if="!hasChildren"
    data-slot="skeleton"
    aria-hidden="true"
    :class="cn(
      'block bg-[var(--ds-gray-200)]',
      shapeClass,
      animated && 'ds-skeleton-animated',
      props.class,
    )"
    :style="{ ...boxStyle, ...shimmerStyle }"
  />
  <span
    v-else
    data-slot="skeleton"
    aria-hidden="true"
    :class="cn('relative inline-flex max-w-full align-middle', props.class)"
    :style="boxStyle"
  >
    <span
      v-if="isShown"
      :class="cn(
        'pointer-events-none absolute inset-0',
        shapeClass,
        animated && 'ds-skeleton-animated',
      )"
      :style="shimmerStyle"
    />
    <span :class="isShown ? 'invisible' : 'visible'">
      <slot />
    </span>
  </span>
</template>
