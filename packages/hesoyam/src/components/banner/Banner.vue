<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { Button } from '../button'

export interface BannerButton {
  href?: string
  content?: string
  onClick?: (event: MouseEvent) => void
}

const props = defineProps<{
  button?: BannerButton
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="banner"
    role="status"
    :class="cn(
      'flex w-full flex-wrap items-center justify-center gap-3 bg-[var(--ds-gray-100)] text-[14px] leading-5 text-[var(--ds-gray-1000)]',
      props.class,
    )"
  >
    <div class="min-w-0">
      <slot />
    </div>
    <Button
      v-if="button"
      :href="button.href"
      size="small"
      @click="button.onClick"
    >
      {{ button.content }}
    </Button>
  </div>
</template>
