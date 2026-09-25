<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TextareaSize } from '.'
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  Quote,
  Strikethrough,
} from '@lucide/vue'
import { useVModel } from '@vueuse/core'
import { computed, ref, useId } from 'vue'
import { cn } from '../../lib/utils'
import { Button } from '../button'
import { Separator } from '../separator'
import { Tooltip } from '../tooltip'
import { textareaVariants } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  size?: TextareaSize
  error?: string
  disabled?: boolean
  id?: string
  toolbarClass?: HTMLAttributes['class']
  hideToolbar?: boolean
}>(), {
  size: 'default',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? '',
})

const generatedId = useId()
const errorId = computed(() => props.error ? `${props.id ?? generatedId}-error` : undefined)

const textareaRef = ref<HTMLTextAreaElement | null>()

interface ToolbarAction {
  icon: typeof Bold
  label: string
  shortcut?: string
  action: () => void
}

function getTextarea(): HTMLTextAreaElement | null {
  return textareaRef.value ?? null
}

function getSelection() {
  const el = getTextarea()
  if (!el) return { start: 0, end: 0, text: '' }
  return {
    start: el.selectionStart,
    end: el.selectionEnd,
    text: el.value.substring(el.selectionStart, el.selectionEnd),
  }
}

function replaceSelection(replacement: string, cursorOffset?: number) {
  const el = getTextarea()
  if (!el) return
  const { start, end } = getSelection()
  const before = el.value.substring(0, start)
  const after = el.value.substring(end)
  modelValue.value = before + replacement + after

  requestAnimationFrame(() => {
    const pos = cursorOffset !== undefined ? start + cursorOffset : start + replacement.length
    el.focus()
    el.setSelectionRange(pos, pos)
  })
}

function wrapSelection(before: string, after: string) {
  const el = getTextarea()
  if (!el) return
  const { start, end, text } = getSelection()
  const val = el.value
  const prefix = val.substring(0, start)
  const suffix = val.substring(end)

  if (text) {
    modelValue.value = prefix + before + text + after + suffix
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, end + before.length)
    })
  } else {
    const placeholder = getPlaceholder(before)
    modelValue.value = prefix + before + placeholder + after + suffix
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, start + before.length + placeholder.length)
    })
  }
}

function getPlaceholder(marker: string): string {
  if (marker === '**') return 'bold text'
  if (marker === '*' || marker === '_') return 'italic text'
  if (marker === '~~') return 'strikethrough text'
  if (marker === '`') return 'code'
  if (marker === '[') return 'link text'
  if (marker === '![') return 'alt text'
  return 'text'
}

function prefixLines(prefix: string) {
  const el = getTextarea()
  if (!el) return
  const { start, end, text } = getSelection()
  const val = el.value

  const lineStart = val.lastIndexOf('\n', start - 1) + 1
  const lineEnd = end === start ? val.indexOf('\n', end) : val.indexOf('\n', end - 1)
  const actualEnd = lineEnd === -1 ? val.length : lineEnd

  const lines = val.substring(lineStart, actualEnd).split('\n')
  const prefixed = lines.map(line => prefix + line).join('\n')

  modelValue.value = val.substring(0, lineStart) + prefixed + val.substring(actualEnd)

  requestAnimationFrame(() => {
    el.focus()
    el.setSelectionRange(lineStart, lineStart + prefixed.length)
  })
}

function prefixLinesNumbered() {
  const el = getTextarea()
  if (!el) return
  const { start, end } = getSelection()
  const val = el.value

  const lineStart = val.lastIndexOf('\n', start - 1) + 1
  const lineEnd = val.indexOf('\n', end)
  const actualEnd = lineEnd === -1 ? val.length : lineEnd

  const lines = val.substring(lineStart, actualEnd).split('\n')
  const prefixed = lines.map((line, i) => `${i + 1}. ${line}`).join('\n')

  modelValue.value = val.substring(0, lineStart) + prefixed + val.substring(actualEnd)

  requestAnimationFrame(() => {
    el.focus()
    el.setSelectionRange(lineStart, lineStart + prefixed.length)
  })
}

function insertLink() {
  const { text } = getSelection()
  if (text) {
    wrapSelection('[', '](url)')
  } else {
    const el = getTextarea()
    if (!el) return
    const { start } = getSelection()
    const snippet = '[link text](url)'
    replaceSelection(snippet)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + 1, start + 10)
    })
  }
}

function insertImage() {
  const { text } = getSelection()
  if (text) {
    wrapSelection('![', '](url)')
  } else {
    const el = getTextarea()
    if (!el) return
    const { start } = getSelection()
    const snippet = '![alt text](url)'
    replaceSelection(snippet)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + 2, start + 10)
    })
  }
}

function insertCodeBlock() {
  const { text } = getSelection()
  if (text) {
    wrapSelection('```\n', '\n```')
  } else {
    const el = getTextarea()
    if (!el) return
    const { start } = getSelection()
    const snippet = '```\n\n```'
    replaceSelection(snippet, start + 4)
  }
}

function insertHr() {
  const el = getTextarea()
  if (!el) return
  const { start } = getSelection()
  const val = el.value
  const needsNewline = start > 0 && val[start - 1] !== '\n'
  replaceSelection((needsNewline ? '\n' : '') + '---\n')
}

const textActions: ToolbarAction[] = [
  { icon: Bold, label: 'Bold', shortcut: 'Ctrl+B', action: () => wrapSelection('**', '**') },
  { icon: Italic, label: 'Italic', shortcut: 'Ctrl+I', action: () => wrapSelection('*', '*') },
  { icon: Strikethrough, label: 'Strikethrough', action: () => wrapSelection('~~', '~~') },
]

const headingActions: ToolbarAction[] = [
  { icon: Heading1, label: 'Heading 1', action: () => prefixLines('# ') },
  { icon: Heading2, label: 'Heading 2', action: () => prefixLines('## ') },
  { icon: Heading3, label: 'Heading 3', action: () => prefixLines('### ') },
]

const listActions: ToolbarAction[] = [
  { icon: List, label: 'Bullet list', action: () => prefixLines('- ') },
  { icon: ListOrdered, label: 'Numbered list', action: () => prefixLinesNumbered() },
  { icon: ListTodo, label: 'Task list', action: () => prefixLines('- [ ] ') },
]

const insertActions: ToolbarAction[] = [
  { icon: Link, label: 'Link', shortcut: 'Ctrl+K', action: insertLink },
  { icon: Image, label: 'Image', action: insertImage },
  { icon: Code, label: 'Code block', action: insertCodeBlock },
  { icon: Quote, label: 'Quote', action: () => prefixLines('> ') },
  { icon: Minus, label: 'Horizontal rule', action: insertHr },
]

const actionGroups = [textActions, headingActions, listActions, insertActions]

function formatShortcutLabel(action: ToolbarAction): string {
  if (action.shortcut) return `${action.label} (${action.shortcut})`
  return action.label
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  const mod = event.metaKey || event.ctrlKey

  if (mod && event.key === 'b') {
    event.preventDefault()
    wrapSelection('**', '**')
  } else if (mod && event.key === 'i') {
    event.preventDefault()
    wrapSelection('*', '*')
  } else if (mod && event.key === 'k') {
    event.preventDefault()
    insertLink()
  }
}

function onTextareaMount(el: unknown) {
  textareaRef.value = el as HTMLTextAreaElement | null
}
</script>

<template>
  <div
    data-slot="textarea-markdown"
    :class="cn(
      'flex w-full flex-col overflow-hidden rounded-[6px] border border-[var(--ds-gray-alpha-400)]',
      'transition-[border-color,box-shadow] duration-150',
      'focus-within:border-[var(--ds-focus)] focus-within:ring-2 focus-within:ring-[var(--ds-focus)]/30',
      error && 'border-[var(--ds-red-700)] focus-within:ring-[var(--ds-red-700)]/30',
      disabled && 'cursor-not-allowed opacity-60',
    )"
  >
    <div
      v-if="!hideToolbar"
      data-slot="textarea-markdown-toolbar"
      role="toolbar"
      :aria-label="'Markdown formatting'"
      :class="cn(
        'flex flex-wrap items-center gap-0.5 border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] px-1.5 py-1',
        toolbarClass,
      )"
    >
      <template v-for="(group, gi) in actionGroups" :key="gi">
        <Separator
          v-if="gi > 0"
          orientation="vertical"
          class="mx-0.5 h-5"
        />
        <Tooltip
          v-for="action in group"
          :key="action.label"
          :text="formatShortcutLabel(action)"
          :delay="false"
        >
          <Button
            variant="ghost"
            size="icon-xs"
            :disabled="disabled"
            :aria-label="action.label"
            tabindex="-1"
            @click="action.action"
          >
            <component :is="action.icon" :size="14" />
          </Button>
        </Tooltip>
      </template>
    </div>

    <textarea
      :ref="onTextareaMount"
      :id="id"
      v-model="modelValue"
      data-slot="textarea"
      :data-size="size"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="errorId"
      :class="cn(
        textareaVariants({ size }),
        'rounded-none border-none shadow-none outline-none focus-visible:ring-0',
        props.class,
      )"
      v-bind="$attrs"
      @keydown="onKeydown"
    />

    <p
      v-if="error"
      :id="errorId"
      data-slot="textarea-error"
      class="border-t border-[var(--ds-gray-alpha-400)] px-3 py-1.5 text-[13px] leading-4 text-[var(--ds-red-700)]"
    >
      {{ error }}
    </p>
  </div>
</template>
