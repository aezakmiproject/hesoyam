<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { ButtonShape, ButtonSize, CustomButtonColors } from '.'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Button from './Button.vue'

const props = defineProps<{
  normal: CustomButtonColors
  hover: CustomButtonColors
  active: CustomButtonColors
  width?: number | string
  size?: ButtonSize
  shape?: ButtonShape
  class?: HTMLAttributes['class']
  disabled?: boolean
  loading?: boolean
  svgOnly?: boolean
  shadow?: boolean
  prefix?: string | VNode
  suffix?: string | VNode
}>()

const style = computed(() => ({
  '--cb-fg': props.normal.foreground,
  '--cb-bg': props.normal.background,
  '--cb-bd': props.normal.border,
  '--cb-fg-h': props.hover.foreground,
  '--cb-bg-h': props.hover.background,
  '--cb-bd-h': props.hover.border,
  '--cb-fg-a': props.active.foreground,
  '--cb-bg-a': props.active.background,
  '--cb-bd-a': props.active.border,
  width: props.width == null ? undefined : typeof props.width === 'number' ? `${props.width}px` : props.width,
}))
</script>

<template>
  <Button
    variant="secondary"
    :size="size"
    :shape="shape"
    :disabled="disabled"
    :loading="loading"
    :svg-only="svgOnly"
    :shadow="shadow"
    :prefix="prefix"
    :suffix="suffix"
    :style="style"
    :class="cn(
      'border-[var(--cb-bd)] bg-[var(--cb-bg)] text-[var(--cb-fg)]',
      'hover:border-[var(--cb-bd-h)] hover:bg-[var(--cb-bg-h)] hover:text-[var(--cb-fg-h)]',
      'active:border-[var(--cb-bd-a)] active:bg-[var(--cb-bg-a)] active:text-[var(--cb-fg-a)]',
      props.class,
    )"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <slot />
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </Button>
</template>
