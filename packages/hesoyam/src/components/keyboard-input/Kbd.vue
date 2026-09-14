<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { defaultDocument, useEventListener } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { cn } from '../../lib/utils'

const NAMED_KEYS: Record<string, string[]> = {
  esc: ['escape'],
  escape: ['escape'],
  enter: ['enter'],
  return: ['enter'],
  tab: ['tab'],
  space: [' ', 'space'],
  ' ': [' '],
  up: ['arrowup'],
  down: ['arrowdown'],
  left: ['arrowleft'],
  right: ['arrowright'],
  del: ['delete'],
  delete: ['delete'],
  backspace: ['backspace'],
  home: ['home'],
  end: ['end'],
  pageup: ['pageup'],
  pagedown: ['pagedown'],
}

const PUNCTUATION_CODES: Record<string, string> = {
  '/': 'slash',
  '.': 'period',
  ',': 'comma',
  ';': 'semicolon',
  "'": 'quote',
  '[': 'bracketleft',
  ']': 'bracketright',
  '\\': 'backslash',
  '`': 'backquote',
  '-': 'minus',
  '=': 'equal',
}

const MODIFIER_KEYS = new Set(['Meta', 'Control', 'Alt', 'Shift', 'OS'])

const props = defineProps<{
  meta?: boolean
  shift?: boolean
  alt?: boolean
  ctrl?: boolean
  small?: boolean
  class?: HTMLAttributes['class']
}>()

const isMac = ref(true)
const pressed = ref(false)
const slotRef = ref<HTMLElement | null>(null)
const heldKeys = new Set<string>()
const mods = {
  meta: false,
  ctrl: false,
  alt: false,
  shift: false,
}

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

function slotLabel() {
  return slotRef.value?.textContent?.replace(/\s+/g, ' ').trim() ?? ''
}

function labelTokens(label: string) {
  const name = label.trim().toLowerCase()
  const tokens = new Set<string>([name])
  const named = NAMED_KEYS[name]
  if (named)
    named.forEach(token => tokens.add(token))
  if (name.length === 1) {
    if (/[a-z]/.test(name))
      tokens.add(`key${name}`)
    if (/[0-9]/.test(name))
      tokens.add(`digit${name}`)
    const punct = PUNCTUATION_CODES[name]
    if (punct)
      tokens.add(punct)
  }
  return tokens
}

function isTypingTarget(event: Event) {
  const el = event.target as HTMLElement | null
  if (!el)
    return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT')
    return true
  return el.isContentEditable
}

function shouldIgnoreKey(event: KeyboardEvent) {
  if (!isTypingTarget(event))
    return false
  if (event.metaKey || event.ctrlKey || event.altKey)
    return false
  if (event.key.length > 1 && event.key !== ' ')
    return false
  return true
}

function syncMods(event: KeyboardEvent) {
  const metaWas = mods.meta
  const ctrlWas = mods.ctrl
  mods.meta = event.metaKey
  mods.ctrl = event.ctrlKey
  mods.alt = event.altKey
  mods.shift = event.shiftKey
  if (metaWas && !mods.meta)
    heldKeys.clear()
  if (ctrlWas && !mods.ctrl && !isMac.value)
    heldKeys.clear()
}

function modifiersMatch(exact: boolean) {
  const shortcutMetaDown = isMac.value ? mods.meta : mods.ctrl

  if (props.meta && !shortcutMetaDown)
    return false
  if (props.ctrl && !mods.ctrl)
    return false
  if (props.alt && !mods.alt)
    return false
  if (props.shift && !mods.shift)
    return false
  if (!exact)
    return true

  if (isMac.value) {
    if (!props.meta && mods.meta)
      return false
    if (!props.ctrl && mods.ctrl)
      return false
  }
  else {
    const wantsCtrlLike = !!(props.meta || props.ctrl)
    if (!wantsCtrlLike && mods.ctrl)
      return false
    if (mods.meta)
      return false
  }
  if (!props.alt && mods.alt)
    return false
  if (!props.shift && mods.shift)
    return false
  return true
}

function matchesCombo() {
  const label = slotLabel()
  if (!label) {
    if (!props.meta && !props.ctrl && !props.alt && !props.shift)
      return false
    return modifiersMatch(false)
  }
  if (!modifiersMatch(true))
    return false
  const tokens = labelTokens(label)
  for (const token of tokens) {
    if (heldKeys.has(token))
      return true
  }
  return false
}

function resetHeld() {
  heldKeys.clear()
  mods.meta = false
  mods.ctrl = false
  mods.alt = false
  mods.shift = false
  pressed.value = false
}

function onKeyDown(event: KeyboardEvent) {
  syncMods(event)
  if (!MODIFIER_KEYS.has(event.key) && !shouldIgnoreKey(event)) {
    heldKeys.add(event.key.toLowerCase())
    heldKeys.add(event.code.toLowerCase())
  }
  pressed.value = matchesCombo()
}

function onKeyUp(event: KeyboardEvent) {
  syncMods(event)
  heldKeys.delete(event.key.toLowerCase())
  heldKeys.delete(event.code.toLowerCase())
  pressed.value = matchesCombo()
}

useEventListener('keydown', onKeyDown)
useEventListener('keyup', onKeyUp)
useEventListener('blur', resetHeld)
useEventListener(defaultDocument, 'visibilitychange', () => {
  if (defaultDocument?.hidden)
    resetHeld()
})
</script>

<template>
  <span
    class="group/kbd inline-flex items-end align-middle"
    :class="small ? 'h-5' : 'h-6'"
    :data-pressed="pressed || undefined"
  >
    <kbd
      data-slot="kbd"
      :data-small="small || undefined"
      :data-pressed="pressed || undefined"
      :class="cn(
        'inline-flex h-full items-center justify-center gap-0.5 rounded-[6px] border border-b-2 border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] font-sans font-medium text-[var(--ds-gray-900)] transition-[border-bottom-width,height] duration-75 ease-out motion-reduce:transition-none group-active/kbd:h-[calc(100%-1px)] group-active/kbd:border-b group-data-[pressed]/kbd:h-[calc(100%-1px)] group-data-[pressed]/kbd:border-b',
        small ? 'min-w-5 px-1 text-[11px] leading-none' : 'min-w-6 px-1.5 text-xs leading-none',
        props.class,
      )"
    >
      <span v-for="(key, index) in keys" :key="`${key}-${index}`">{{ key }}</span>
      <span v-if="$slots.default" ref="slotRef"><slot /></span>
    </kbd>
  </span>
</template>
