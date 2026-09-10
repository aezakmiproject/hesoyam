<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { IconArray } from '@hugeicons/vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { isIconData, toRender } from './render'

const props = defineProps<{
  icon?: unknown
  class?: HTMLAttributes['class']
}>()

const iconData = computed(() => isIconData(props.icon) ? props.icon as IconArray : null)
const iconComponent = computed(() => {
  if (props.icon == null || iconData.value) return undefined
  return toRender(props.icon)
})
</script>

<template>
  <div
    data-slot="empty-state-icon"
    :class="cn(
      'flex size-16 items-center justify-center rounded-[12px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] text-[var(--ds-gray-900)]',
      props.class,
    )"
  >
    <slot>
      <HugeiconsIcon
        v-if="iconData"
        :icon="iconData"
        :size="32"
      />
      <component :is="iconComponent" v-else-if="iconComponent" />
    </slot>
  </div>
</template>
