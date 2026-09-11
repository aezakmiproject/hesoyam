<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { IconArray } from '@hugeicons/vue'
import type { NoteSize, NoteVariant } from './variants'
import { Alert02Icon, CancelCircleIcon, CheckmarkCircle02Icon, InformationCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { noteVariants } from './variants'

const props = withDefaults(defineProps<{
  variant?: NoteVariant
  size?: NoteSize
  fill?: boolean
  disabled?: boolean
  icon?: unknown
  class?: HTMLAttributes['class']
}>(), {
  variant: 'default',
  size: 'medium',
  fill: false,
  disabled: false,
})

const defaultIcons: Record<NoteVariant, IconArray> = {
  default: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
  error: CancelCircleIcon,
  warning: Alert02Icon,
  secondary: InformationCircleIcon,
  violet: InformationCircleIcon,
  cyan: InformationCircleIcon,
}

const iconSize = computed(() => props.size === 'small' ? 14 : 16)
const hideIcon = computed(() => props.icon === null)
const customIconData = computed(() => Array.isArray(props.icon) ? props.icon as IconArray : null)
const customIconComponent = computed(() => {
  if (props.icon == null || customIconData.value) return undefined
  if (typeof props.icon === 'object' && props.icon !== null && 'setup' in props.icon) return props.icon
  return { render: () => props.icon }
})
</script>

<template>
  <div
    data-slot="note"
    :data-variant="variant"
    :data-size="size"
    :data-fill="fill ? 'true' : 'false'"
    :data-disabled="disabled ? '' : undefined"
    role="note"
    :class="cn(noteVariants({ variant, size, fill, disabled }), props.class)"
  >
    <span
      v-if="!hideIcon || $slots.icon"
      data-slot="note-icon"
      class="mt-0.5 inline-flex shrink-0 text-[var(--note-icon)]"
    >
      <slot name="icon">
        <HugeiconsIcon
          v-if="customIconData"
          :icon="customIconData"
          :size="iconSize"
        />
        <component :is="customIconComponent" v-else-if="customIconComponent" />
        <HugeiconsIcon
          v-else
          :icon="defaultIcons[variant]"
          :size="iconSize"
        />
      </slot>
    </span>
    <slot />
  </div>
</template>
