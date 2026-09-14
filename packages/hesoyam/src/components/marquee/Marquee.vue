<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<{
  duration?: number | string
  gap?: number | string
  pauseOnHover?: boolean
  reverse?: boolean
  repeat?: number
  class?: HTMLAttributes['class']
}>(), {
  duration: 40,
  gap: 16,
  pauseOnHover: true,
})

const fadeSides = ['left', 'right'] as const

const rootRef = ref<HTMLElement | null>(null)
const copyRef = ref<HTMLElement | null>(null)
const autoRepeat = ref(4)
const copyWidth = ref(0)

function toCssSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}

function toCssDuration(value: number | string): string {
  return typeof value === 'number' ? `${value}s` : value
}

const copies = computed(() => {
  if (props.repeat != null)
    return Math.max(2, Math.floor(props.repeat))
  return autoRepeat.value
})

const extraCopies = computed(() => Math.max(1, copies.value - 1))

function updateRepeat() {
  const root = rootRef.value
  const copy = copyRef.value
  if (!root || !copy)
    return
  const width = copy.getBoundingClientRect().width
  if (width <= 0)
    return
  copyWidth.value = width
  if (props.repeat != null)
    return
  autoRepeat.value = Math.max(2, Math.ceil(root.clientWidth / width) + 1)
}

const gapCss = computed(() => toCssSize(props.gap))

const trackStyle = computed(() => ({
  '--ds-marquee-duration': toCssDuration(props.duration),
  '--ds-marquee-distance': `${copyWidth.value}px`,
  '--ds-marquee-direction': props.reverse ? 'reverse' : 'normal',
}))

const copyStyle = computed(() => ({
  gap: gapCss.value,
  paddingInlineEnd: gapCss.value,
}))

onMounted(() => {
  nextTick(updateRepeat)
})

useResizeObserver(rootRef, updateRepeat)
useResizeObserver(copyRef, updateRepeat)
watch(() => [props.repeat, props.gap], () => nextTick(updateRepeat))
</script>

<template>
  <div
    ref="rootRef"
    data-slot="marquee"
    :data-pause-on-hover="pauseOnHover ? 'true' : 'false'"
    :class="cn('relative isolate w-full min-w-0 overflow-hidden', props.class)"
  >
    <div
      v-for="side in fadeSides"
      :key="side"
      aria-hidden="true"
      class="geist-scroller-fade"
      :data-side="side"
    >
      <span /><span /><span /><span /><span />
    </div>

    <div
      class="ds-marquee-track flex w-max items-center"
      :class="copyWidth > 0 && 'ds-marquee-track-ready'"
      :style="trackStyle"
    >
      <div
        ref="copyRef"
        class="ds-marquee-copy flex shrink-0 items-center whitespace-nowrap"
        :style="copyStyle"
      >
        <slot />
      </div>
      <div
        v-for="n in extraCopies"
        :key="n"
        class="ds-marquee-copy flex shrink-0 items-center whitespace-nowrap"
        :style="copyStyle"
        aria-hidden="true"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-marquee-track-ready {
  animation: ds-marquee var(--ds-marquee-duration, 40s) linear infinite;
  animation-direction: var(--ds-marquee-direction, normal);
}

.ds-marquee-copy {
  min-width: max-content;
}

[data-pause-on-hover='true']:hover .ds-marquee-track,
[data-pause-on-hover='true']:focus-within .ds-marquee-track {
  animation-play-state: paused;
}

@keyframes ds-marquee {
  to {
    transform: translate3d(calc(var(--ds-marquee-distance, 0px) * -1), 0, 0);
  }
}

.geist-scroller-fade {
  pointer-events: none;
  position: absolute;
  z-index: 1;
}

.geist-scroller-fade[data-side='left'] {
  inset: 0 auto 0 0;
  width: 2.5rem;
  --fade-dir: to right;
}

.geist-scroller-fade[data-side='right'] {
  inset: 0 0 0 auto;
  width: 2.5rem;
  --fade-dir: to left;
}

.geist-scroller-fade > span {
  position: absolute;
  inset: 0;
}

.geist-scroller-fade > span:nth-child(1) {
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 80%);
  -webkit-mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 80%);
}

.geist-scroller-fade > span:nth-child(2) {
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 60%);
  -webkit-mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 60%);
}

.geist-scroller-fade > span:nth-child(3) {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 40%);
  -webkit-mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 40%);
}

.geist-scroller-fade > span:nth-child(4) {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 25%);
  -webkit-mask-image: linear-gradient(var(--fade-dir), #000 0%, transparent 25%);
}

.geist-scroller-fade > span:nth-child(5) {
  background: linear-gradient(var(--fade-dir), var(--ds-background-100), transparent);
}
</style>
