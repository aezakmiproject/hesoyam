<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { resolveAvatarSize } from '.'
import Avatar from './Avatar.vue'

const props = defineProps<{
  username: string
  size?: number
  class?: HTMLAttributes['class']
  title?: string
}>()

const src = computed(() => {
  const px = resolveAvatarSize(props.size) * 2
  return `https://github.com/${encodeURIComponent(props.username)}.png?size=${px}`
})
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
