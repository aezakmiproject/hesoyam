<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <header class="docs-pad border-b border-[var(--ds-gray-alpha-400)] py-12 lg:py-14">
    <h1 class="text-[40px] leading-[1.15] font-semibold tracking-tight text-[var(--ds-gray-1000)]">
      {{ title }}
    </h1>
    <p
      v-if="description || $slots.default"
      class="mt-2 max-w-2xl text-[16px] leading-6 text-[var(--ds-gray-900)]"
    >
      <slot>{{ description }}</slot>
    </p>
  </header>
</template>
