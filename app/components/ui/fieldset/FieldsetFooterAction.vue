<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'secondary'
  class?: HTMLAttributes['class']
}>(), {
  variant: 'default',
})
</script>

<template>
  <Button
    data-slot="fieldset-footer-action"
    :variant="variant"
    size="small"
    :class="cn(props.class)"
  >
    <slot />
  </Button>
</template>
