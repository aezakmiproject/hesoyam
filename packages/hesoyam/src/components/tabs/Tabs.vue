<script setup lang="ts">
import type { Component, VNode } from 'vue'
import type { TabItem } from '.'
import { computed, isVNode, ref } from 'vue'
import { cn } from '@/lib/utils'
import { Tooltip } from '@/components/ui/tooltip'

const props = withDefaults(defineProps<{
  selected?: string
  setSelected?: (value: string) => void
  modelValue?: string
  tabs: TabItem[]
  disabled?: boolean
  variant?: 'default' | 'secondary'
  class?: string
  ariaLabel?: string
}>(), {
  variant: 'default',
  ariaLabel: 'Sections',
})

const emit = defineEmits<{
  'update:selected': [value: string]
  'update:modelValue': [value: string]
}>()

const tabRefs = ref<HTMLButtonElement[]>([])

const selectedValue = computed(() => {
  return props.selected ?? props.modelValue ?? props.tabs[0]?.value ?? ''
})

const enabledTabs = computed(() =>
  props.tabs.filter(tab => !tab.disabled && !props.disabled),
)

function select(value: string) {
  const tab = props.tabs.find(item => item.value === value)
  if (!tab || tab.disabled || props.disabled)
    return
  props.setSelected?.(value)
  emit('update:selected', value)
  emit('update:modelValue', value)
}

function iconIs(icon: TabItem['icon']): icon is Component | VNode {
  return Boolean(icon)
}

function renderIcon(icon: TabItem['icon']) {
  if (isVNode(icon))
    return { render: () => icon }
  return icon
}

function onKeydown(event: KeyboardEvent, index: number) {
  const enabled = enabledTabs.value
  if (!enabled.length)
    return

  const currentValue = props.tabs[index]?.value
  const currentEnabledIndex = enabled.findIndex(tab => tab.value === currentValue)
  const start = currentEnabledIndex === -1 ? 0 : currentEnabledIndex

  let next = start
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    next = (start + 1) % enabled.length
  }
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    next = (start - 1 + enabled.length) % enabled.length
  }
  else if (event.key === 'Home') {
    event.preventDefault()
    next = 0
  }
  else if (event.key === 'End') {
    event.preventDefault()
    next = enabled.length - 1
  }
  else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    select(props.tabs[index]!.value)
    return
  }
  else {
    return
  }

  const target = enabled[next]
  if (!target)
    return
  const targetIndex = props.tabs.findIndex(tab => tab.value === target.value)
  tabRefs.value[targetIndex]?.focus()
}

function setTabRef(el: unknown, index: number) {
  const node = el as HTMLButtonElement | null
  if (node)
    tabRefs.value[index] = node
}
</script>

<template>
  <div
    role="tablist"
    :aria-label="ariaLabel"
    :aria-disabled="disabled || undefined"
    data-slot="tabs"
    :data-variant="variant"
    :class="cn(
      'relative flex items-center',
      variant === 'default' && 'gap-0 border-b border-[var(--ds-gray-alpha-400)]',
      variant === 'secondary' && 'w-fit gap-0.5 rounded-[6px] bg-[var(--ds-gray-100)] p-[3px]',
      disabled && 'pointer-events-none opacity-50',
      props.class,
    )"
  >
    <template v-for="(tab, index) in tabs" :key="tab.value">
      <Tooltip :text="tab.tooltip" :disabled="!tab.tooltip">
        <span class="inline-flex">
          <button
            :ref="(el) => setTabRef(el, index)"
            type="button"
            role="tab"
            :aria-selected="selectedValue === tab.value"
            :aria-disabled="tab.disabled || disabled || undefined"
            :tabindex="selectedValue === tab.value ? 0 : -1"
            :disabled="tab.disabled || disabled"
            data-slot="tab"
            :data-selected="selectedValue === tab.value ? '' : undefined"
            :class="cn(
              'relative inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-[13px] leading-none outline-none transition-colors select-none',
              'focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
              'disabled:pointer-events-none disabled:opacity-50',
              variant === 'default' && cn(
                '-mb-px border-b-2 border-transparent px-3 text-[var(--ds-gray-900)]',
                'hover:text-[var(--ds-gray-1000)]',
                selectedValue === tab.value && 'border-[var(--ds-gray-1000)] font-medium text-[var(--ds-gray-1000)]',
              ),
              variant === 'secondary' && cn(
                'rounded-[5px] px-2.5 text-[var(--ds-gray-900)]',
                'hover:text-[var(--ds-gray-1000)]',
                selectedValue === tab.value && 'bg-[var(--ds-background-100)] font-medium text-[var(--ds-gray-1000)] shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]',
              ),
            )"
            @click="select(tab.value)"
            @keydown="onKeydown($event, index)"
          >
            <component
              :is="renderIcon(tab.icon)"
              v-if="iconIs(tab.icon)"
              class="size-4 shrink-0 [&_svg]:size-4"
            />
            <span>{{ tab.title }}</span>
            <span
              v-if="tab.badge != null && tab.badge !== 0 && tab.badge !== '0'"
              class="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--ds-gray-100)] px-1 text-[10px] font-medium text-[var(--ds-gray-1000)]"
            >
              {{ tab.badge }}
            </span>
          </button>
        </span>
      </Tooltip>
    </template>
  </div>
</template>
