<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Folder01Icon, FolderOpenIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { computed, inject, provide, ref } from 'vue'
import { cn } from '@/lib/utils'
import { treeDepthKey } from './context'

const props = withDefaults(defineProps<{
  name: string
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}>(), {
  defaultOpen: false,
})

const depth = inject(treeDepthKey, 0)
provide(treeDepthKey, depth + 1)

const open = ref(props.defaultOpen)
const icon = computed(() => (open.value ? FolderOpenIcon : Folder01Icon))

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <li
    data-slot="folder"
    role="treeitem"
    :aria-expanded="open"
    :aria-label="name"
    :class="cn('list-none', props.class)"
  >
    <button
      type="button"
      :class="cn(
        'flex h-7 w-full items-center gap-1.5 rounded-md px-1.5 text-left text-[13px]',
        'hover:bg-[var(--ds-gray-100)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)] focus-visible:outline-none',
      )"
      :style="{ paddingInlineStart: `${depth * 16 + 6}px` }"
      @click="toggle"
    >
      <HugeiconsIcon
        :icon="icon"
        :size="14"
        class="shrink-0 text-[var(--ds-amber-700)]"
      />
      <span class="truncate">{{ name }}</span>
    </button>
    <ul
      v-if="open"
      role="group"
      class="m-0 list-none p-0"
    >
      <slot />
    </ul>
  </li>
</template>
