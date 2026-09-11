<script setup lang="ts">
defineProps<{
  href?: string
}>()

const inset = inject('docsCellsInset', ref(false))
</script>

<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="docs-cell block transition-colors hover:bg-[var(--ds-gray-100)]"
    :class="inset
      ? 'px-6 py-8'
      : 'docs-pad py-10 lg:py-12'"
  >
    <slot />
  </NuxtLink>
  <div
    v-else
    class="docs-cell"
    :class="inset
      ? 'px-6 py-8'
      : 'docs-pad py-10 lg:py-12'"
  >
    <slot />
  </div>
</template>
