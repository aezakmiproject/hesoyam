<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CollapseGroupContext } from './context'
import { computed, provide, ref } from 'vue'
import { cn } from '../../lib/utils'
import { collapseGroupKey } from './context'

const props = defineProps<{
  multiple?: boolean
  class?: HTMLAttributes['class']
}>()

const multiple = computed(() => !!props.multiple)
const openIds = ref<Set<string>>(new Set())

function toggle(id: string) {
  const next = new Set(openIds.value)
  if (next.has(id)) {
    next.delete(id)
  }
  else {
    if (!multiple.value) next.clear()
    next.add(id)
  }
  openIds.value = next
}

function register(id: string, defaultExpanded: boolean) {
  if (!defaultExpanded) return
  const next = new Set(openIds.value)
  if (!multiple.value && next.size > 0) return
  next.add(id)
  openIds.value = next
}

function unregister(id: string) {
  if (!openIds.value.has(id)) return
  const next = new Set(openIds.value)
  next.delete(id)
  openIds.value = next
}

const context: CollapseGroupContext = {
  multiple,
  openIds,
  toggle,
  register,
  unregister,
}

provide(collapseGroupKey, context)
</script>

<template>
  <div
    data-slot="collapse-group"
    :class="cn('flex w-full flex-col [&_[data-slot=collapse]:last-child]:border-b-0', props.class)"
  >
    <slot />
  </div>
</template>
