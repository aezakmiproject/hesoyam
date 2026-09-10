<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AvatarVariants } from '.'
import { UserIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { AvatarRoot } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { avatarVariants, resolveAvatarSize, vercelAvatarSrc } from '.'
import AvatarFallback from './AvatarFallback.vue'
import AvatarImage from './AvatarImage.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  size?: number | AvatarVariants['size']
  username?: string
  src?: string
  letter?: string
  placeholder?: boolean
  title?: string
}>()

const numericSize = computed(() => resolveAvatarSize(props.size))
const tokenSize = computed<AvatarVariants['size']>(() => {
  if (typeof props.size === 'number')
    return props.size <= 24 ? 'sm' : props.size >= 48 ? 'lg' : 'default'
  return props.size ?? 'default'
})

const resolvedSrc = computed(() => {
  if (props.placeholder)
    return undefined
  if (props.src)
    return props.src
  if (props.username)
    return vercelAvatarSrc(props.username, numericSize.value)
  return undefined
})

const usesGeistApi = computed(() =>
  props.placeholder || !!props.letter || !!props.username || !!props.src,
)

const inlineSize = computed(() =>
  typeof props.size === 'number'
    ? { width: `${props.size}px`, height: `${props.size}px` }
    : undefined,
)

const ariaLabel = computed(() => {
  if (props.letter)
    return `Avatar with initials: ${props.letter}`
  return props.title || props.username || undefined
})

const letterSize = computed(() => Math.max(10, Math.round(numericSize.value * 0.38)))
const iconSize = computed(() => Math.max(12, Math.round(numericSize.value * 0.45)))
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="tokenSize"
    :aria-label="ariaLabel"
    :title="title || username"
    :style="inlineSize"
    :class="cn(avatarVariants({ size: tokenSize }), props.class)"
  >
    <template v-if="usesGeistApi">
      <AvatarImage
        v-if="resolvedSrc"
        :src="resolvedSrc"
        :alt="title || username || letter || 'Avatar'"
      />
      <AvatarFallback>
        <span
          v-if="letter && !placeholder"
          class="font-medium uppercase text-[var(--ds-gray-1000)]"
          :style="{ fontSize: `${letterSize}px` }"
        >{{ letter }}</span>
        <HugeiconsIcon
          v-else
          :icon="UserIcon"
          :size="iconSize"
          class="text-[var(--ds-gray-900)]"
        />
      </AvatarFallback>
    </template>
    <slot />
  </AvatarRoot>
</template>
