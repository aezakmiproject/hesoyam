<script setup lang="ts">
const props = withDefaults(defineProps<{
  columns?: 1 | 2 | 3
  inset?: boolean
}>(), {
  columns: 2,
  inset: false,
})

provide('docsCellsInset', toRef(props, 'inset'))
</script>

<template>
  <div
    class="docs-cells"
    :class="[
      inset && 'docs-cells--inset',
      columns === 1 && 'grid-cols-1',
      columns === 2 && 'grid-cols-1 sm:grid-cols-2',
      columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    ]"
  >
    <slot />
  </div>
</template>
