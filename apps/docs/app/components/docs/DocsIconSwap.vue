<script setup lang="ts">
import type { Component } from 'vue'

const props = withDefaults(defineProps<{
  initial: Component
  takeNext: () => Component
  size?: number
}>(), {
  size: 18,
})

const layerA = shallowRef(props.initial)
const layerB = shallowRef(props.initial)
const showB = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const swapClass = 'absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]'

function arm() {
  timer = setTimeout(swap, 8000 + Math.random() * 12000)
}

function swap() {
  const next = props.takeNext()
  if (showB.value)
    layerA.value = next
  else
    layerB.value = next
  showB.value = !showB.value
  timer = setTimeout(arm, 650)
}

onMounted(arm)
onUnmounted(() => {
  if (timer)
    clearTimeout(timer)
})
</script>

<template>
  <span
    class="relative inline-flex shrink-0 items-center justify-center"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <span
      :class="[swapClass, showB ? 'scale-0' : 'scale-100 delay-300']"
    >
      <Icon :icon="layerA" :size="size" />
    </span>
    <span
      :class="[swapClass, showB ? 'scale-100 delay-300' : 'scale-0']"
    >
      <Icon :icon="layerB" :size="size" />
    </span>
  </span>
</template>
