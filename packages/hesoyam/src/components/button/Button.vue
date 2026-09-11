<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes, VNode } from 'vue'
import type { ButtonShape, ButtonSize, ButtonVariant } from '.'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { cn } from '../../lib/utils'
import { buttonVariants } from '.'

const VISUAL_TYPES = new Set([
  'default',
  'secondary',
  'tertiary',
  'error',
  'warning',
  'ghost',
  'outline',
  'destructive',
  'link',
])

interface Props extends PrimitiveProps {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  type?: ButtonVariant | 'button' | 'submit' | 'reset'
  typeName?: 'button' | 'submit' | 'reset'
  class?: HTMLAttributes['class']
  disabled?: boolean
  loading?: boolean
  svgOnly?: boolean
  shadow?: boolean
  href?: string
  prefix?: string | VNode
  suffix?: string | VNode
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  size: 'default',
})

const slots = useSlots()

const resolvedVariant = computed<ButtonVariant>(() => {
  if (props.variant)
    return props.variant
  if (props.type && VISUAL_TYPES.has(props.type))
    return props.type as ButtonVariant
  return 'default'
})

const htmlType = computed(() => {
  if (props.typeName)
    return props.typeName
  if (props.type === 'button' || props.type === 'submit' || props.type === 'reset')
    return props.type
  return 'button'
})

const resolvedShape = computed<ButtonShape | 'unset'>(() => {
  if (props.shape)
    return props.shape
  if (props.svgOnly || props.size === 'icon' || props.size === 'icon-xs' || props.size === 'icon-sm' || props.size === 'icon-lg')
    return 'square'
  return 'unset'
})

const resolvedAs = computed(() => {
  if (props.href)
    return 'a'
  return props.as
})

const hasPrefix = computed(() => Boolean(props.prefix || slots.prefix))
const hasSuffix = computed(() => Boolean(props.suffix || slots.suffix))

function onActivate(event: Event) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="resolvedVariant"
    :data-size="size"
    :data-shape="resolvedShape"
    :data-svg-only="svgOnly || undefined"
    :data-loading="loading || undefined"
    :as="resolvedAs"
    :as-child="asChild"
    :href="href"
    :type="resolvedAs === 'button' ? htmlType : undefined"
    :disabled="resolvedAs === 'a' ? undefined : (disabled || undefined)"
    :aria-busy="loading || undefined"
    :aria-disabled="(disabled && resolvedAs === 'a') || (loading && !disabled) ? true : undefined"
    :tabindex="disabled && resolvedAs === 'a' ? -1 : undefined"
    @click="onActivate"
    :class="cn(
      buttonVariants({ variant: resolvedVariant, size, shape: resolvedShape }),
      shadow && 'shadow-[0_2px_8px_rgba(0,0,0,0.24)]',
      loading && 'pointer-events-none',
      props.class,
    )"
  >
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        class="animate-spin"
        :class="size === 'tiny' || size === 'xs' || size === 'icon-xs' ? 'size-3' : size === 'large' || size === 'lg' ? 'size-5' : 'size-4'"
        viewBox="0 0 16 16"
        fill="none"
      >
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" />
        <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </span>

    <span
      class="inline-flex items-center justify-center gap-[inherit]"
      :class="loading && 'invisible'"
    >
      <span v-if="hasPrefix" data-slot="button-prefix" class="inline-flex shrink-0 items-center">
        <slot name="prefix">
          <template v-if="typeof prefix === 'string'">{{ prefix }}</template>
          <component :is="prefix" v-else-if="prefix" />
        </slot>
      </span>
      <slot />
      <span v-if="hasSuffix" data-slot="button-suffix" class="inline-flex shrink-0 items-center">
        <slot name="suffix">
          <template v-if="typeof suffix === 'string'">{{ suffix }}</template>
          <component :is="suffix" v-else-if="suffix" />
        </slot>
      </span>
    </span>
  </Primitive>
</template>
