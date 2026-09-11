<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(defineProps<{
  icon: Component
  size?: number
  strokeWidth?: number
}>(), {
  size: 16,
  strokeWidth: 1.75,
})
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :stroke-width="strokeWidth"
  />
</template>
