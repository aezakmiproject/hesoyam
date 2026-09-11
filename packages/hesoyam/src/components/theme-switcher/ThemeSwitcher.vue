<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Theme } from './useTheme'
import { ComputerIcon, Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { cn } from '@/lib/utils'
import { useTheme } from './useTheme'

const props = defineProps<{
  small?: boolean
  disabled?: boolean
  forcedTheme?: 'light' | 'dark'
  class?: HTMLAttributes['class']
}>()

const { theme, setTheme } = useTheme()

const options: { value: Theme, label: string, icon: typeof Sun03Icon }[] = [
  { value: 'light', label: 'Light', icon: Sun03Icon },
  { value: 'system', label: 'System', icon: ComputerIcon },
  { value: 'dark', label: 'Dark', icon: Moon02Icon },
]

const selectedIndex = computed(() => {
  if (props.forcedTheme) {
    return options.findIndex(option => option.value === props.forcedTheme)
  }
  return Math.max(0, options.findIndex(option => option.value === theme.value))
})

const isDisabled = computed(() => Boolean(props.disabled || props.forcedTheme))

function select(next: Theme) {
  if (isDisabled.value) return
  setTheme(next)
}
</script>

<template>
  <div
    role="radiogroup"
    aria-label="Theme"
    data-slot="theme-switcher"
    :data-small="small ? '' : undefined"
    :data-disabled="isDisabled ? '' : undefined"
    :class="cn(
      'relative inline-flex items-stretch rounded-lg border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] p-0.5',
      isDisabled && 'pointer-events-none opacity-50',
      props.class,
    )"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-0.5 left-0.5 bottom-0.5 rounded-md bg-[var(--ds-background-100)] shadow-[0_1px_2px_rgba(0,0,0,0.12)] ring-1 ring-[var(--ds-gray-alpha-400)] transition-transform duration-200 ease-out"
      :style="{
        width: 'calc((100% - 4px) / 3)',
        transform: `translateX(calc(${selectedIndex} * 100%))`,
      }"
    />

    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      role="radio"
      :aria-label="option.label"
      :aria-checked="(forcedTheme ?? theme) === option.value"
      :disabled="isDisabled"
      :class="cn(
        'relative z-10 inline-flex flex-1 items-center justify-center gap-1.5 rounded-md font-medium text-[var(--ds-gray-900)] transition-colors outline-none',
        'focus-visible:text-[var(--ds-gray-1000)]',
        (forcedTheme ?? theme) === option.value && 'text-[var(--ds-gray-1000)]',
        small ? 'h-7 px-2 text-xs' : 'h-8 px-2.5 text-[13px]',
      )"
      @click="select(option.value)"
    >
      <HugeiconsIcon
        :icon="option.icon"
        :size="small ? 14 : 16"
        color="currentColor"
        :stroke-width="1.75"
      />
      <span>{{ option.label }}</span>
    </button>
  </div>
</template>
