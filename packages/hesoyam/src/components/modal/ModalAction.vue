<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { ButtonVariant } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  disabled?: boolean
  fullWidth?: boolean
  prefix?: string | VNode
  class?: HTMLAttributes['class']
}>(), {
  variant: 'default',
  disabled: false,
  fullWidth: false,
})
</script>

<template>
  <Button
    data-slot="modal-action"
    :variant="variant"
    :disabled="disabled"
    :prefix="prefix"
    size="small"
    :class="cn(fullWidth && 'w-full flex-1', props.class)"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <slot />
  </Button>
</template>
