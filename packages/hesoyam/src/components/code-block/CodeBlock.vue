<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { isClient } from '../../lib/env'
import { cn } from '../../lib/utils'
import { CopyButton } from '../copy-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { highlightLines } from './highlight'
import { Comment, Fragment, Text, computed, onMounted, onUnmounted, ref, useSlots } from 'vue'

export interface CodeBlockOption {
  label: string
  value: string
}

export interface CodeBlockSwitcher {
  options: CodeBlockOption[]
  value: string
  onChange: (value: string) => void
}

const props = withDefaults(defineProps<{
  filename?: string
  language?: string
  syntax?: string
  highlightedLinesNumbers?: number[]
  addedLinesNumbers?: number[]
  removedLinesNumbers?: number[]
  hideLineNumbers?: boolean
  switcher?: CodeBlockSwitcher
  tabs?: CodeBlockSwitcher
  v0?: 'ask' | 'build'
  ariaLabel?: string
  class?: HTMLAttributes['class']
}>(), {
  highlightedLinesNumbers: () => [],
  addedLinesNumbers: () => [],
  removedLinesNumbers: () => [],
})

const slots = useSlots()
const referencedLine = ref<number | null>(null)

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
])

function serializeAttrs(props: VNode['props']): string {
  if (!props) return ''
  return Object.entries(props)
    .filter(([key]) => key !== 'key' && key !== 'ref')
    .map(([key, value]) => {
      if (value === false || value == null) return ''
      const name = key === 'className' ? 'class' : key
      if (value === true) return ` ${name}`
      if (typeof value === 'string' || typeof value === 'number') return ` ${name}="${value}"`
      return ''
    })
    .join('')
}

function childrenSource(node: VNode): string {
  if (typeof node.children === 'string') return node.children
  if (Array.isArray(node.children)) return readSlotText(node.children as VNode[])
  if (node.children && typeof node.children === 'object' && 'default' in node.children) {
    const def = (node.children as { default?: () => VNode[] }).default
    return def ? readSlotText(def()) : ''
  }
  return ''
}

function vnodeToSource(node: VNode): string {
  if (node.type === Comment) return ''
  if (node.type === Text) return typeof node.children === 'string' ? node.children : ''
  if (node.type === Fragment) return childrenSource(node)
  if (typeof node.type === 'string') {
    const attrs = serializeAttrs(node.props)
    const inner = childrenSource(node)
    if (VOID_TAGS.has(node.type.toLowerCase())) return `<${node.type}${attrs}>`
    return `<${node.type}${attrs}>${inner}</${node.type}>`
  }
  return childrenSource(node)
}

function readSlotText(nodes: VNode[] | undefined): string {
  if (!nodes?.length) return ''
  return nodes.map(vnodeToSource).join('')
}

const code = computed(() => readSlotText(slots.default?.()).replace(/\n$/, ''))
const activeLanguage = computed(() => props.language ?? props.syntax)
const highlighted = computed(() => highlightLines(code.value, activeLanguage.value))
const lineCount = computed(() => highlighted.value.length)
const hasHeader = computed(() => Boolean(props.filename || props.switcher || props.tabs || props.v0))

const highlightedSet = computed(() => new Set(props.highlightedLinesNumbers))
const addedSet = computed(() => new Set(props.addedLinesNumbers))
const removedSet = computed(() => new Set(props.removedLinesNumbers))

const switcherLabel = computed(() => {
  const current = props.switcher
  if (!current) return ''
  return current.options.find(option => option.value === current.value)?.label ?? current.value
})

function lineKind(n: number) {
  if (removedSet.value.has(n)) return 'removed'
  if (addedSet.value.has(n)) return 'added'
  if (highlightedSet.value.has(n) || referencedLine.value === n) return 'highlighted'
  return 'none'
}

function lineHref(n: number) {
  return `#L${n}`
}

function selectLine(n: number) {
  referencedLine.value = n
  if (isClient) {
    history.replaceState(null, '', lineHref(n))
  }
}

function openV0() {
  const prefix = props.v0 === 'build' ? 'Build this:\n\n' : ''
  const url = `https://v0.dev/chat?q=${encodeURIComponent(prefix + code.value)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

function syncHash() {
  if (!isClient) return
  const match = location.hash.match(/^#L(\d+)$/)
  referencedLine.value = match ? Number(match[1]) : null
}

onMounted(() => {
  syncHash()
  window.addEventListener('hashchange', syncHash)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncHash)
})
</script>

<template>
  <div
    data-slot="code-block"
    role="region"
    :aria-label="ariaLabel ?? filename ?? 'Code block'"
    :class="cn(
      'overflow-hidden rounded-lg border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]',
      props.class,
    )"
  >
    <div
      v-if="hasHeader"
      class="flex items-center gap-2 border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] px-3 py-1.5"
    >
      <span
        v-if="filename"
        class="min-w-0 flex-1 truncate font-mono text-[12px] text-[var(--ds-gray-900)]"
      >
        {{ filename }}
      </span>
      <span v-else class="flex-1" />

      <div
        v-if="tabs"
        class="flex items-center gap-0.5 rounded-md bg-[var(--ds-gray-200)] p-0.5"
      >
        <button
          v-for="option in tabs.options"
          :key="option.value"
          type="button"
          :aria-pressed="tabs.value === option.value"
          :class="cn(
            'rounded-[5px] px-2 py-0.5 text-[12px] font-medium text-[var(--ds-gray-900)] outline-none transition-colors',
            'hover:text-[var(--ds-gray-1000)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]/40',
            tabs.value === option.value && 'bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] shadow-sm',
          )"
          @click="tabs.onChange(option.value)"
        >
          {{ option.label }}
        </button>
      </div>

      <DropdownMenu v-if="switcher && !tabs">
        <DropdownMenuTrigger
          class="inline-flex h-7 items-center gap-1 rounded-md px-2 text-[12px] font-medium text-[var(--ds-gray-900)] outline-none hover:bg-[var(--ds-gray-200)] hover:text-[var(--ds-gray-1000)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]/40"
        >
          {{ switcherLabel }}
          <ChevronDown :size="14" :stroke-width="1.75" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="min-w-36">
          <DropdownMenuItem
            v-for="option in switcher.options"
            :key="option.value"
            @click="switcher.onChange(option.value)"
          >
            {{ option.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        v-if="v0"
        type="button"
        class="inline-flex h-7 items-center rounded-md px-2 text-[12px] font-medium text-[var(--ds-gray-900)] outline-none hover:bg-[var(--ds-gray-200)] hover:text-[var(--ds-gray-1000)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]/40"
        :aria-label="v0 === 'build' ? 'Open in v0 to build' : 'Open in v0'"
        @click="openV0"
      >
        v0
      </button>

      <CopyButton :text-to-copy="code" label="Copy code" class="size-7" />
    </div>

    <div class="relative">
      <CopyButton
        v-if="!hasHeader"
        :text-to-copy="code"
        label="Copy code"
        class="absolute top-2 right-2 z-10 size-7 bg-[var(--ds-background-100)]/80"
      />

      <pre class="m-0 overflow-x-auto py-3 font-mono text-[13px] leading-6 tracking-normal"><code class="flex flex-col">
        <div
          v-for="(tokens, index) in highlighted"
          :id="`L${index + 1}`"
          :key="index"
          :class="cn(
            'flex h-6 items-center px-3',
            lineKind(index + 1) === 'highlighted' && 'bg-[var(--ds-blue-100)]',
            lineKind(index + 1) === 'added' && 'bg-[var(--ds-green-100)]',
            lineKind(index + 1) === 'removed' && 'bg-[var(--ds-red-100)]',
          )"
        >
          <a
            v-if="!hideLineNumbers"
            :href="lineHref(index + 1)"
            class="mr-4 shrink-0 select-none text-right text-[var(--ds-gray-700)] no-underline hover:text-[var(--ds-gray-1000)]"
            :style="{ width: `${String(lineCount).length}ch` }"
            :aria-label="`Line ${index + 1}`"
            @click.prevent="selectLine(index + 1)"
          >{{ index + 1 }}</a>
          <span
            v-if="addedSet.has(index + 1) || removedSet.has(index + 1)"
            class="mr-2 w-3 shrink-0 select-none"
            :class="addedSet.has(index + 1) ? 'text-[var(--ds-green-900)]' : 'text-[var(--ds-red-900)]'"
            aria-hidden="true"
          >{{ addedSet.has(index + 1) ? '+' : '−' }}</span>
          <span class="min-w-0 whitespace-pre"><span v-for="(token, tokenIndex) in tokens" :key="tokenIndex" :style="token.color ? { color: token.color } : undefined">{{ token.value }}</span></span>
        </div>
      </code></pre>
    </div>
  </div>
</template>
