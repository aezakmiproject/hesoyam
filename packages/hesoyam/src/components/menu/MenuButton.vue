<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonShape, ButtonSize, ButtonVariant } from '../button'
import { ChevronDown } from '@lucide/vue'
import { DropdownMenuTrigger } from 'reka-ui'
import { computed } from 'vue'
import { Button } from '../button'
import { cn } from '../../lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'unstyled' | ButtonVariant | 'button' | 'submit' | 'reset'
  typeName?: 'button' | 'submit' | 'reset'
  shape?: ButtonShape
  svgOnly?: boolean
  showChevron?: boolean
  disabled?: boolean
}>(), {
  variant: 'default',
  type: 'button',
})

const isUnstyled = computed(() => props.type === 'unstyled')

const resolvedVariant = computed<ButtonVariant>(() => {
  if (props.type && props.type !== 'unstyled' && props.type !== 'button' && props.type !== 'submit' && props.type !== 'reset')
    return props.type
  return props.variant
})

const htmlType = computed(() => {
  if (props.typeName)
    return props.typeName
  if (props.type === 'submit' || props.type === 'reset')
    return props.type
  return 'button'
})
</script>

<template>
  <DropdownMenuTrigger
    as-child
    :disabled="disabled"
    data-slot="menu-button"
  >
    <button
      v-if="isUnstyled"
      :type="htmlType"
      :disabled="disabled"
      :class="cn('inline-flex items-center justify-center rounded-[6px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </button>
    <Button
      v-else
      :type-name="htmlType"
      :variant="resolvedVariant"
      :size="size"
      :shape="shape"
      :svg-only="svgOnly"
      :disabled="disabled"
      :class="cn(props.class)"
      v-bind="$attrs"
    >
      <slot />
      <template v-if="showChevron" #suffix>
        <ChevronDown
          :size="14"
          class="text-[var(--ds-gray-900)]"
        />
      </template>
    </Button>
  </DropdownMenuTrigger>
</template>
