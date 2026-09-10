<script setup lang="ts">
import type { BreadcrumbType } from './context'
import { computed, provide } from 'vue'
import { cn } from '@/lib/utils'
import { breadcrumbContextKey } from './context'

const props = withDefaults(defineProps<{
  type?: BreadcrumbType
  class?: string
}>(), {
  type: 'text',
})

const type = computed(() => props.type)

provide(breadcrumbContextKey, { type })
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    data-slot="breadcrumb"
    :data-type="type"
    :class="cn(props.class)"
  >
    <ol class="flex flex-wrap items-center">
      <slot />
    </ol>
  </nav>
</template>
