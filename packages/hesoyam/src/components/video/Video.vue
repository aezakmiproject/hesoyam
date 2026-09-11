<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Maximize2, Pause, Play, Volume2, VolumeX } from '@lucide/vue'
import { cn } from '../../lib/utils'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  width?: number
  height?: number
  lazy?: boolean
  loop?: boolean
  controls?: boolean
  poster?: string
  muted?: boolean
  autoplay?: boolean
  class?: HTMLAttributes['class']
}>(), {
  lazy: true,
  loop: true,
  controls: true,
})

const rootEl = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)
const inView = ref(!props.lazy)
const playing = ref(false)
const isMuted = ref(props.muted ?? !props.controls)
const current = ref(0)
const duration = ref(0)
const hovering = ref(false)
const showControls = computed(() => props.controls && (hovering.value || !playing.value))

const resolvedSrc = computed(() => (inView.value ? props.src : undefined))
const decorative = computed(() => !props.controls)

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '0:00'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function togglePlay() {
  const node = videoEl.value
  if (!node) return
  if (node.paused) void node.play()
  else node.pause()
}

function toggleMute() {
  const node = videoEl.value
  if (!node) return
  node.muted = !node.muted
  isMuted.value = node.muted
}

function seek(event: Event) {
  const node = videoEl.value
  const input = event.target as HTMLInputElement
  if (!node) return
  node.currentTime = Number(input.value)
  current.value = node.currentTime
}

async function toggleFullscreen() {
  const node = rootEl.value
  if (!node) return
  if (document.fullscreenElement) await document.exitFullscreen()
  else await node.requestFullscreen()
}

function onTimeUpdate() {
  const node = videoEl.value
  if (!node) return
  current.value = node.currentTime
  duration.value = node.duration || 0
}

function onPlay() {
  playing.value = true
}

function onPause() {
  playing.value = false
}

let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!props.lazy) {
    inView.value = true
    return
  }
  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      inView.value = true
      observer?.disconnect()
    }
  }, { rootMargin: '200px' })
  if (rootEl.value) observer.observe(rootEl.value)
})

onUnmounted(() => {
  observer?.disconnect()
})

watch(resolvedSrc, async (src) => {
  if (!src || !decorative.value) return
  await nextTick()
  const node = videoEl.value
  if (!node) return
  node.muted = true
  void node.play().catch(() => {})
})
</script>

<template>
  <div
    ref="rootEl"
    data-slot="video"
    :class="cn(
      'relative overflow-hidden rounded-lg bg-black',
      props.class,
    )"
    :style="{
      width: width ? `${width}px` : undefined,
      maxWidth: '100%',
      aspectRatio: width && height ? `${width} / ${height}` : undefined,
    }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <video
      ref="videoEl"
      :src="resolvedSrc"
      :poster="poster"
      :loop="loop"
      :muted="isMuted"
      :autoplay="autoplay || decorative"
      playsinline
      preload="metadata"
      class="block h-full w-full object-cover"
      :width="width"
      :height="height"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onTimeUpdate"
      @play="onPlay"
      @pause="onPause"
      @click="controls && togglePlay()"
    />

    <button
      v-if="controls && !playing"
      type="button"
      aria-label="Play"
      class="absolute inset-0 z-10 m-auto size-12 rounded-full bg-black/55 text-white outline-none ring-1 ring-white/15 backdrop-blur-sm hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white/50"
      @click="togglePlay"
    >
      <Play :size="20" :stroke-width="1.75" class="ml-0.5" />
    </button>

    <div
      v-if="controls"
      :class="cn(
        'absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-2.5 pt-8 pb-2 text-white transition-opacity',
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )"
    >
      <button
        type="button"
        :aria-label="playing ? 'Pause' : 'Play'"
        class="inline-flex size-7 items-center justify-center rounded-md outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
        @click="togglePlay"
      >
        <component :is="playing ? Pause : Play"
          :size="16"
          :stroke-width="1.75"
        />
      </button>

      <span class="min-w-10 font-mono text-[11px] tabular-nums text-white/80">
        {{ formatTime(current) }}
      </span>

      <input
        type="range"
        min="0"
        :max="duration || 0"
        step="0.1"
        :value="current"
        :aria-label="`Seek video, ${formatTime(current)} of ${formatTime(duration)}`"
        class="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/25 accent-white [&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        @input="seek"
      >

      <span class="min-w-10 text-right font-mono text-[11px] tabular-nums text-white/80">
        {{ formatTime(duration) }}
      </span>

      <button
        type="button"
        :aria-label="isMuted ? 'Unmute' : 'Mute'"
        class="inline-flex size-7 items-center justify-center rounded-md outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
        @click="toggleMute"
      >
        <component :is="isMuted ? VolumeX : Volume2"
          :size="16"
          :stroke-width="1.75"
        />
      </button>

      <button
        type="button"
        aria-label="Fullscreen"
        class="inline-flex size-7 items-center justify-center rounded-md outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
        @click="toggleFullscreen"
      >
        <Maximize2 :size="16" :stroke-width="1.75" />
      </button>
    </div>
  </div>
</template>
