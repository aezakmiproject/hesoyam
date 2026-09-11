import { readonly, ref } from 'vue'
import { isClient } from '../../lib/env'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'hesoyam-theme'

const theme = ref<Theme>('system')
const resolvedTheme = ref<'light' | 'dark'>('dark')
let media: MediaQueryList | undefined
let initialized = false

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(next: Theme) {
  const resolved = next === 'system'
    ? (systemPrefersDark() ? 'dark' : 'light')
    : next

  resolvedTheme.value = resolved
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

function onSystemChange() {
  if (theme.value === 'system') applyTheme('system')
}

export function initTheme() {
  if (!isClient || initialized) return
  initialized = true

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    theme.value = stored
  }
  else if (document.documentElement.classList.contains('dark')) {
    theme.value = 'dark'
  }

  applyTheme(theme.value)

  media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', onSystemChange)
}

export function setTheme(next: Theme) {
  theme.value = next
  if (isClient) {
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
  }
}

export function useTheme() {
  if (isClient) initTheme()

  return {
    theme: readonly(theme),
    resolvedTheme: readonly(resolvedTheme),
    setTheme,
  }
}
