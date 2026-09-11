<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { NoteSize, NoteVariant } from './variants'
import { CircleCheck, CircleX, Info, TriangleAlert, type LucideIcon } from '@lucide/vue'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { noteVariants } from './variants'

const props = withDefaults(defineProps<{
  variant?: NoteVariant
  size?: NoteSize
  fill?: boolean
  disabled?: boolean
  icon?: Component | null
  class?: HTMLAttributes['class']
}>(), {
  variant: 'default',
  size: 'medium',
  fill: false,
  disabled: false,
})

const defaultIcons: Record<NoteVariant, LucideIcon> = {
  default: Info,
  success: CircleCheck,
  error: CircleX,
  warning: TriangleAlert,
  secondary: Info,
  violet: Info,
  cyan: Info,
}

const iconSize = computed(() => props.size === 'small' ? 14 : 16)
const hideIcon = computed(() => props.icon === null)
const resolvedIcon = computed(() => props.icon ?? defaultIcons[props.variant])
</script>

<template>
  <div
    data-slot="note"
    :data-variant="variant"
    :data-size="size"
    :data-fill="fill ? 'true' : 'false'"
    :data-disabled="disabled ? '' : undefined"
    role="note"
    :aria-disabled="disabled || undefined"
    :inert="disabled ? true : undefined"
    :class="cn(noteVariants({ variant, size, fill, disabled }), props.class)"
  >
    <span
      v-if="!hideIcon || $slots.icon"
      data-slot="note-icon"
      class="mt-0.5 inline-flex shrink-0 text-[var(--note-icon)]"
    >
      <slot name="icon">
        <component
          :is="resolvedIcon"
          :size="iconSize"
          :stroke-width="1.75"
        />
      </slot>
    </span>
    <slot />
  </div>
</template>
