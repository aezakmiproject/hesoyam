<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import Avatar from './Avatar.vue'

const props = defineProps<{
  username: string
  size?: number
  class?: HTMLAttributes['class']
  title?: string
}>()

const src = computed(() =>
  `https://gitlab.com/${encodeURIComponent(props.username)}.png`,
)
</script>

<template>
  <Avatar
    :src="src"
    :username="username"
    :size="size"
    :title="title || username"
    :class="props.class"
  />
</template>
