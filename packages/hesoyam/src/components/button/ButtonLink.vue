<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { ButtonShape, ButtonSize, ButtonVariant } from '.'
import Button from './Button.vue'

defineProps<{
  href?: string
  variant?: ButtonVariant
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
</script>

<template>
  <Button
    :href="href"
    as="a"
    :variant="variant"
    :size="size"
    :shape="shape"
    :class="class"
    :disabled="disabled"
    :loading="loading"
    :svg-only="svgOnly"
    :shadow="shadow"
    :prefix="prefix"
    :suffix="suffix"
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
