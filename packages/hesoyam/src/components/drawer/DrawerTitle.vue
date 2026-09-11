<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogTitle } from 'reka-ui'
import { cn } from '../../lib/utils'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogTitle
    data-slot="drawer-title"
    :class="cn(
      'text-center text-[18px] leading-6 font-semibold text-[var(--ds-gray-1000)]',
      props.class,
    )"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
