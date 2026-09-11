<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, provide, ref } from 'vue'
import { cn } from '../../lib/utils'
import { tableContextKey } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const virtualize = ref(false)

provide(tableContextKey, { virtualize })

const rootClass = computed(() => cn(
  'relative w-full overflow-x-auto',
  virtualize.value && 'max-h-[420px] overflow-y-auto',
  props.class,
))
</script>

<template>
  <div
    data-slot="table-root"
    :data-virtualize="virtualize ? '' : undefined"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
