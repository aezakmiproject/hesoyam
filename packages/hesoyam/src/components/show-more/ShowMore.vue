<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  expanded?: boolean
  noBorder?: boolean
  onClick?: (event: MouseEvent) => void
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function onTriggerClick(event: MouseEvent) {
  props.onClick?.(event)
  emit('click', event)
}
</script>

<template>
  <div
    data-slot="show-more"
    :data-expanded="expanded ? 'true' : 'false'"
    :class="cn('relative flex w-full items-center justify-center', props.class)"
  >
    <div
      v-if="!noBorder"
      aria-hidden="true"
      class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[var(--ds-gray-alpha-400)]"
    />
    <button
      type="button"
      data-slot="show-more-trigger"
      :aria-expanded="!!expanded"
      class="relative inline-flex h-8 items-center gap-1 rounded-md bg-[var(--ds-background-100)] px-2.5 text-[13px] font-medium text-[var(--ds-gray-900)] outline-none hover:text-[var(--ds-gray-1000)] focus-visible:ring-2 focus-visible:ring-ring/40"
      v-bind="$attrs"
      @click="onTriggerClick"
    >
      <slot>{{ expanded ? 'Show Less' : 'Show More' }}</slot>
      <HugeiconsIcon
        :icon="expanded ? ArrowUp01Icon : ArrowDown01Icon"
        :size="14"
      />
    </button>
  </div>
</template>
