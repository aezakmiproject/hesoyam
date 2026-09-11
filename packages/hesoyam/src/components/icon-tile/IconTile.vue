<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { IconTileVariant, IconTileVariants } from '.'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { iconTileVariants } from '.'
import { iconTileGradientFromHex, iconTileSourceHex, parseHexColor } from './gradient'

const props = withDefaults(defineProps<{
  variant?: IconTileVariants['variant']
  size?: IconTileVariants['size']
  color?: string
  icon?: Component
  themeSync?: boolean
  class?: HTMLAttributes['class']
}>(), {
  variant: 'blue',
  size: 'small',
  themeSync: false,
})

const iconPx = computed(() => {
  if (props.size === 'large' || props.size === 'lg')
    return 18
  if (props.size === 'medium' || props.size === 'md')
    return 16
  return 13
})

const iconStroke = computed(() => {
  if (props.size === 'large' || props.size === 'lg')
    return 2
  return 2.15
})

const sourceHex = computed(() => {
  if (props.color && parseHexColor(props.color))
    return props.color
  return iconTileSourceHex[props.variant as IconTileVariant]
})

const fill = computed(() => iconTileGradientFromHex(sourceHex.value))

const tileStyle = computed(() => ({
  '--icon-tile-fill': fill.value,
  '--icon-tile-source': sourceHex.value,
}))
</script>

<template>
  <span
    data-slot="icon-tile"
    :data-variant="variant"
    :data-size="size"
    :data-theme-sync="themeSync ? '' : undefined"
    :class="cn(iconTileVariants({ variant, size }), props.class)"
    :style="tileStyle"
  >
    <slot>
      <component
        :is="icon"
        v-if="icon"
        :size="iconPx"
        :stroke-width="iconStroke"
      />
    </slot>
  </span>
</template>
