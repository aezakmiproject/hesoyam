<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { COMBOBOX_KEY } from './context'

const props = defineProps<{
  value: string
  prefix?: unknown
  suffix?: unknown
  ignoreDefaultHeight?: boolean
  class?: HTMLAttributes['class']
}>()

const ctx = inject(COMBOBOX_KEY)
if (!ctx)
  throw new Error('ComboboxOption must be used inside Combobox')

const hidden = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const selected = computed(() => ctx.value.value === props.value)
const active = computed(() => ctx.highlighted.value === props.value)

function getLabel() {
  return rootRef.value?.innerText?.replace(/\s+/g, ' ').trim() || props.value
}

onMounted(() => {
  ctx.registerOption({
    value: props.value,
    getLabel,
    hidden,
  })
})

onBeforeUnmount(() => {
  ctx.unregisterOption(props.value)
})

watch(() => ctx.query.value, () => {
  const selectedLabel = ctx.options.value.find(option => option.value === ctx.value.value)?.getLabel() ?? ''
  const needle = (ctx.displayValue.value && ctx.displayValue.value === selectedLabel)
    ? ''
    : ctx.query.value.trim().toLowerCase()
  hidden.value = needle ? !getLabel().toLowerCase().includes(needle) : false
})

function onSelect() {
  ctx.select(props.value)
}
</script>

<template>
  <div
    v-show="!hidden"
    ref="rootRef"
    role="option"
    :aria-selected="selected"
    data-slot="combobox-option"
    :data-highlighted="active ? '' : undefined"
    :class="cn(
      'flex cursor-default items-center gap-2 rounded-[6px] px-2 text-[13px] text-[var(--ds-gray-1000)] outline-none select-none',
      ignoreDefaultHeight ? 'min-h-0' : 'min-h-8',
      active && 'bg-[var(--ds-gray-100)]',
      selected && 'font-medium',
      props.class,
    )"
    @mouseenter="ctx.highlight(value)"
    @mousedown.prevent="onSelect"
  >
    <span
      v-if="prefix || $slots.prefix"
      class="flex shrink-0 items-center text-[var(--ds-gray-900)] [&_svg]:size-4"
    >
      <slot name="prefix">
        <component :is="prefix" v-if="prefix && typeof prefix !== 'string'" />
        <template v-else>{{ prefix }}</template>
      </slot>
    </span>

    <span class="min-w-0 flex-1">
      <slot />
    </span>

    <span
      v-if="suffix || $slots.suffix"
      class="flex shrink-0 items-center text-[var(--ds-gray-900)] [&_svg]:size-4"
    >
      <slot name="suffix">
        <component :is="suffix" v-if="suffix && typeof suffix !== 'string'" />
        <template v-else>{{ suffix }}</template>
      </slot>
    </span>

    <HugeiconsIcon
      v-if="selected"
      :icon="Tick02Icon"
      :size="14"
      color="currentColor"
      :stroke-width="1.75"
      class="ml-auto shrink-0"
    />
  </div>
</template>
