<script setup lang="ts">
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import type { MenuPosition } from '.'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'
import { provide, toRef } from 'vue'
import { menuPositionKey } from '.'

const props = withDefaults(defineProps<DropdownMenuRootProps & {
  position?: MenuPosition
}>(), {
  position: 'bottom-start',
})

const emits = defineEmits<DropdownMenuRootEmits>()

provide(menuPositionKey, toRef(props, 'position'))

const delegatedProps = reactiveOmit(props, 'position')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRoot
    v-slot="slotProps"
    data-slot="menu-container"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </DropdownMenuRoot>
</template>
