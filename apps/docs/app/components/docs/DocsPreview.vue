<script setup lang="ts">
import { CodeBlock } from '@aezakmiproject/hesoyam'

defineProps<{
  code?: string
  language?: string
}>()
</script>

<template>
  <div class="overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)]">
    <div class="flex min-h-48 items-center justify-center bg-[var(--ds-background-100)] p-10">
      <slot />
    </div>
    <CodeBlock
      v-if="code || $slots.code"
      :language="language ?? 'vue'"
      class="rounded-none border-0 border-t border-[var(--ds-gray-alpha-400)]"
    >
      <slot name="code">{{ code }}</slot>
    </CodeBlock>
  </div>
</template>
