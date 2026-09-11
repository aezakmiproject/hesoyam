<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FileType } from './context'
import { Diamond, File as FileIcon, Zap } from '@lucide/vue'
import { computed, inject } from 'vue'
import { cn } from '../../lib/utils'
import { treeDepthKey } from './context'

const props = defineProps<{
  name: string
  href?: string
  type?: FileType
  class?: HTMLAttributes['class']
}>()

const depth = inject(treeDepthKey, 0)

const typeMeta = computed(() => {
  switch (props.type) {
    case 'edge-function':
      return { icon: Zap, label: 'Edge', class: 'text-[var(--ds-teal-700)]' }
    case 'lambda':
      return { icon: FileIcon, label: 'λ', class: 'text-[var(--ds-amber-700)]' }
    case 'middleware':
      return { icon: Diamond, label: 'MW', class: 'text-[var(--ds-purple-700)]' }
    default:
      return { icon: FileIcon, label: null, class: 'text-[var(--ds-gray-700)]' }
  }
})
</script>

<template>
  <li
    data-slot="file"
    role="treeitem"
    :aria-label="name"
    :class="cn('list-none', props.class)"
  >
    <component
      :is="href ? 'a' : 'span'"
      :href="href"
      :class="cn(
        'flex h-7 items-center gap-1.5 rounded-md px-1.5 text-[13px]',
        href && 'hover:bg-[var(--ds-gray-100)] hover:underline focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)] focus-visible:outline-none',
      )"
      :style="{ paddingInlineStart: `${depth * 16 + 6}px` }"
    >
      <component :is="typeMeta.icon"
        :size="14"
        :class="cn('shrink-0', typeMeta.class)"
      />
      <span class="truncate">{{ name }}</span>
      <span
        v-if="typeMeta.label"
        :class="cn(
          'ml-auto shrink-0 rounded px-1 font-sans text-[10px] leading-4 tracking-wide uppercase',
          'bg-[var(--ds-gray-100)] text-[var(--ds-gray-900)]',
        )"
      >
        {{ typeMeta.label }}
      </span>
    </component>
  </li>
</template>
