<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Theme } from './useTheme'
import { Monitor, Moon, Sun } from '@lucide/vue'
import { computed } from 'vue'
import { Tabs } from '../tabs'
import { useTheme } from './useTheme'

const props = defineProps<{
  small?: boolean
  disabled?: boolean
  forcedTheme?: 'light' | 'dark'
  class?: HTMLAttributes['class']
}>()

const { theme, setTheme } = useTheme()

const tabs = [
  { value: 'light', title: 'Light', icon: Sun },
  { value: 'system', title: 'System', icon: Monitor },
  { value: 'dark', title: 'Dark', icon: Moon },
]

const selected = computed(() => props.forcedTheme ?? theme.value)
const isDisabled = computed(() => Boolean(props.disabled || props.forcedTheme))

function onSelect(value: string) {
  if (!isDisabled.value)
    setTheme(value as Theme)
}
</script>

<template>
  <Tabs
    data-slot="theme-switcher"
    variant="secondary"
    aria-label="Theme"
    :tabs="tabs"
    :selected="selected"
    :disabled="isDisabled"
    :class="props.class"
    @update:selected="onSelect"
  />
</template>
