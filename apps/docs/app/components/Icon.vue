<script setup lang="ts">
import type { IconArray } from '@hugeicons/vue'
import { HugeiconsIcon } from '@hugeicons/vue'

withDefaults(defineProps<{
  icon: IconArray
  size?: number
}>(), {
  size: 16,
})
</script>

<template>
  <HugeiconsIcon
    :icon="icon"
    :size="size"
    color="currentColor"
    :stroke-width="1.75"
  />
</template>
