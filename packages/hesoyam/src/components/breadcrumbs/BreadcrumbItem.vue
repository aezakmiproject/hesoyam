<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import { computed, inject, useSlots } from 'vue'
import { cn } from '../../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { breadcrumbContextKey } from './context'

const props = defineProps<{
  active?: boolean
  disabled?: boolean
  href?: string
  class?: string
}>()

const slots = useSlots()
const ctx = inject(breadcrumbContextKey, null)
const type = computed(() => ctx?.type.value ?? 'text')
const isMenu = computed(() => type.value === 'menu')
const showMenu = computed(() => isMenu.value && Boolean(slots.menu))

const itemClass = computed(() => cn(
  'inline-flex max-w-[220px] items-center truncate text-[13px] leading-none',
  props.active
    ? 'font-medium text-[var(--ds-gray-1000)]'
    : 'text-[var(--ds-gray-900)]',
  props.disabled && 'cursor-not-allowed opacity-50',
  isMenu.value && 'h-8 rounded-[6px] px-2 hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]',
  isMenu.value && props.active && 'bg-[var(--ds-gray-100)]',
  props.class,
))
</script>

<template>
  <li
    data-slot="breadcrumb-item"
    :data-active="active ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(
      'inline-flex items-center',
      'after:mx-2 after:text-[13px] after:text-[var(--ds-gray-600)] after:content-[\'/\'] last:after:hidden',
    )"
  >
    <DropdownMenu v-if="showMenu">
      <DropdownMenuTrigger
        as-child
        :disabled="disabled"
      >
        <button
          type="button"
          :aria-current="active ? 'page' : undefined"
          :disabled="disabled"
          :class="cn(itemClass, 'outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]')"
        >
          <span class="truncate"><slot /></span>
          <ChevronDown :size="12" class="ml-1 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <slot name="menu" />
      </DropdownMenuContent>
    </DropdownMenu>

    <component
      :is="href && !disabled ? 'a' : (isMenu ? 'button' : 'span')"
      v-else
      :href="href && !disabled ? href : undefined"
      :type="isMenu && !href ? 'button' : undefined"
      :aria-current="active ? 'page' : undefined"
      :disabled="isMenu ? disabled : undefined"
      :class="cn(
        itemClass,
        href && 'no-underline hover:text-[var(--ds-gray-1000)]',
        'outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
      )"
    >
      <span class="truncate"><slot /></span>
      <ChevronDown
        v-if="isMenu"
        :size="12"
        class="ml-1 shrink-0"
      />
    </component>
  </li>
</template>
