<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="docs-pad border-b border-[var(--ds-gray-alpha-400)] py-12 lg:py-14">
    <div class="mb-8 space-y-2">
      <h2 class="text-[24px] leading-8 font-semibold tracking-tight text-[var(--ds-gray-1000)]">
        {{ title }}
      </h2>
      <p
        v-if="description || $slots.description"
        class="max-w-2xl text-[16px] leading-6 text-[var(--ds-gray-900)]"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <slot />
  </section>
</template>
