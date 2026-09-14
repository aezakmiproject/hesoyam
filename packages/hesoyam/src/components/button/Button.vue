<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes, VNode } from 'vue'
import type { ButtonShape, ButtonSize, ButtonVariant } from '.'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { cn } from '../../lib/utils'
import { Spinner } from '../spinner'
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
const showPrefix = computed(() => hasPrefix.value && !props.loading)
const showSuffix = computed(() => hasSuffix.value && !props.loading)
const showLabel = computed(() => !(props.loading && props.svgOnly))

const spinnerSize = computed(() => {
  if (props.size === 'tiny' || props.size === 'xs' || props.size === 'icon-xs')
    return 12
  if (props.size === 'large' || props.size === 'lg')
    return 20
  if (props.size === 'medium' || props.size === 'icon-lg')
    return 16
  return 14
})

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
    <span class="inline-flex items-center justify-center gap-[inherit]">
      <Spinner
        v-if="loading"
        :size="spinnerSize"
        class="text-[var(--ds-gray-700)] [filter:drop-shadow(0_0.5px_0_#171717)_drop-shadow(0.5px_0_0_#171717)_drop-shadow(0_-0.5px_0_#171717)_drop-shadow(-0.5px_0_0_#171717)]"
        role="presentation"
        aria-hidden="true"
      />
      <span v-if="showPrefix" data-slot="button-prefix" class="inline-flex shrink-0 items-center">
        <slot name="prefix">
          <template v-if="typeof prefix === 'string'">{{ prefix }}</template>
          <component :is="prefix" v-else-if="prefix" />
        </slot>
      </span>
      <slot v-if="showLabel" />
      <span v-if="showSuffix" data-slot="button-suffix" class="inline-flex shrink-0 items-center">
        <slot name="suffix">
          <template v-if="typeof suffix === 'string'">{{ suffix }}</template>
          <component :is="suffix" v-else-if="suffix" />
        </slot>
      </span>
    </span>
  </Primitive>
</template>
