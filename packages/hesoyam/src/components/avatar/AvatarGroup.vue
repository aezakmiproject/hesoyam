<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AvatarMember } from '.'
import { computed } from 'vue'
import { cn } from '../../lib/utils'
import { resolveAvatarSize } from '.'
import Avatar from './Avatar.vue'
import AvatarGroupCount from './AvatarGroupCount.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  members?: AvatarMember[]
  size?: number
  limit?: number
  reverse?: boolean
  overlap?: 'auto' | number
}>(), {
  size: 32,
  overlap: 'auto',
})

const numericSize = computed(() => resolveAvatarSize(props.size))

const overlapPx = computed(() => {
  if (typeof props.overlap === 'number')
    return props.overlap
  return Math.round(numericSize.value * 0.35)
})

const visibleMembers = computed(() => {
  if (!props.members)
    return []
  if (props.limit)
    return props.members.slice(0, props.limit)
  return props.members
})

const overflow = computed(() => {
  if (!props.members || !props.limit)
    return 0
  return Math.max(0, props.members.length - props.limit)
})

function zIndex(index: number, total: number) {
  return props.reverse ? index + 1 : total - index
}
</script>

<template>
  <div
    data-slot="avatar-group"
    role="group"
    :class="cn(
      'group/avatar-group flex items-center',
      !members?.length && '-space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-[var(--ds-background-100)]',
      props.class,
    )"
  >
    <template v-if="members?.length">
      <Avatar
        v-for="(member, index) in visibleMembers"
        :key="member.username || member.src || member.letter || index"
        :username="member.username"
        :src="member.src"
        :letter="member.letter"
        :title="member.title || member.username"
        :size="numericSize"
        class="ring-2 ring-[var(--ds-background-100)]"
        :style="{
          marginLeft: index === 0 ? '0px' : `-${overlapPx}px`,
          zIndex: zIndex(index, visibleMembers.length + (overflow ? 1 : 0)),
        }"
      />
      <AvatarGroupCount
        v-if="overflow"
        :style="{
          width: `${numericSize}px`,
          height: `${numericSize}px`,
          marginLeft: `-${overlapPx}px`,
          zIndex: 0,
          fontSize: `${Math.max(10, Math.round(numericSize * 0.36))}px`,
        }"
      >
        +{{ overflow }}
      </AvatarGroupCount>
    </template>
    <slot />
  </div>
</template>
