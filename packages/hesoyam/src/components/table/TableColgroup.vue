<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <colgroup data-slot="table-colgroup" :class="cn(props.class)">
    <slot />
  </colgroup>
</template>
