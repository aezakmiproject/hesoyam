<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  span?: number
}>()
</script>

<template>
  <col
    data-slot="table-col"
    :span="span"
    :class="cn(props.class)"
  >
</template>
