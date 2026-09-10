<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  meta?: boolean
  shift?: boolean
  alt?: boolean
  ctrl?: boolean
  small?: boolean
  class?: HTMLAttributes['class']
}>()

const isMac = ref(true)

onMounted(() => {
  isMac.value = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
})

const keys = computed(() => {
  const items: string[] = []
  if (props.meta)
    items.push(isMac.value ? '⌘' : 'Ctrl')
  if (props.ctrl)
    items.push(isMac.value ? '⌃' : 'Ctrl')
  if (props.alt)
    items.push(isMac.value ? '⌥' : 'Alt')
  if (props.shift)
    items.push(isMac.value ? '⇧' : 'Shift')
  return items
})
</script>

<template>
  <kbd
    data-slot="kbd"
    :data-small="small || undefined"
    :class="cn(
      'inline-flex items-center justify-center gap-0.5 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] font-sans font-medium text-[var(--ds-gray-900)]',
      small ? 'h-5 min-w-5 px-1 text-[11px] leading-none' : 'h-6 min-w-6 px-1.5 text-xs leading-none',
      props.class,
    )"
  >
    <span v-for="(key, index) in keys" :key="`${key}-${index}`">{{ key }}</span>
    <span v-if="$slots.default"><slot /></span>
  </kbd>
</template>
