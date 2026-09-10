<script setup lang="ts">
import { Note } from '@/components/ui/note'

defineProps<{
  variant?: 'default' | 'secondary' | 'warning'
}>()
</script>

<template>
  <Note :variant="variant ?? 'secondary'" size="small">
    <p class="text-[13px] leading-5 text-[var(--ds-gray-1000)]">
      <slot />
    </p>
  </Note>
</template>
