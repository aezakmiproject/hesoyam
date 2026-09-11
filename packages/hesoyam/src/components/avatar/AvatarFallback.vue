<script setup lang="ts">
import type { AvatarFallbackProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AvatarFallback } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="delegatedProps"
    :class="cn(
      'flex size-full items-center justify-center rounded-full bg-[var(--ds-gray-200)] text-[var(--ds-gray-1000)] text-sm font-medium group-data-[size=sm]/avatar:text-xs',
      props.class,
    )"
  >
    <slot />
  </AvatarFallback>
</template>
