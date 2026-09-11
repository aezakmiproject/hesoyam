<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { computed, inject, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { cn } from '../../lib/utils'
import { collapseGroupKey } from './context'

const props = withDefaults(defineProps<{
  title?: string
  defaultExpanded?: boolean
  expanded?: boolean
  size?: 'small' | 'medium'
  class?: HTMLAttributes['class']
}>(), {
  size: 'medium',
})

const emit = defineEmits<{
  'update:expanded': [value: boolean]
  'toggle': [value: boolean]
}>()

const group = inject(collapseGroupKey, null)
const itemId = useId()
const panelId = `collapse-panel-${itemId}`
const triggerId = `collapse-trigger-${itemId}`
const localOpen = ref(!!props.defaultExpanded)

onMounted(() => {
  group?.register(itemId, !!props.defaultExpanded)
})

onBeforeUnmount(() => {
  group?.unregister(itemId)
})

const isControlled = computed(() => props.expanded !== undefined)

const open = computed(() => {
  if (group) return group.openIds.value.has(itemId)
  if (isControlled.value) return !!props.expanded
  return localOpen.value
})

function onToggle() {
  const next = !open.value
  if (group) {
    group.toggle(itemId)
  }
  else if (isControlled.value) {
    emit('update:expanded', next)
  }
  else {
    localOpen.value = next
  }
  emit('toggle', next)
}
</script>

<template>
  <div
    data-slot="collapse"
    :data-size="size"
    :data-state="open ? 'open' : 'closed'"
    :class="cn(
      'border-b border-[var(--ds-gray-alpha-400)]',
      props.class,
    )"
  >
    <button
      :id="triggerId"
      type="button"
      data-slot="collapse-trigger"
      :aria-expanded="open"
      :aria-controls="panelId"
      :class="cn(
        'flex w-full items-center justify-between gap-3 text-left text-[var(--ds-gray-1000)] outline-none',
        'focus-visible:ring-[var(--ds-focus)]/40 focus-visible:ring-2',
        size === 'small' ? 'py-2 text-[13px] font-medium' : 'py-3 text-sm font-medium',
      )"
      @click="onToggle"
    >
      <span class="min-w-0">
        <slot name="title">{{ title }}</slot>
      </span>
      <ChevronDown
        :size="size === 'small' ? 14 : 16"
        class="shrink-0 text-[var(--ds-gray-900)] transition-transform duration-200"
        :class="open && 'rotate-180'"
      />
    </button>
    <div
      :id="panelId"
      role="region"
      :aria-labelledby="triggerId"
      :aria-hidden="!open"
      :inert="!open"
      :class="cn(
        'grid transition-[grid-template-rows] duration-200 ease-out',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )"
    >
      <div class="overflow-hidden">
        <div
          data-slot="collapse-content"
          :class="size === 'small' ? 'pb-2 text-[13px] text-[var(--ds-gray-900)]' : 'pb-4 text-sm text-[var(--ds-gray-900)]'"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
