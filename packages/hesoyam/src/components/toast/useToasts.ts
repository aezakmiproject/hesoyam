import type { VNode } from 'vue'
import { readonly, shallowRef } from 'vue'

export type ToastType = 'message' | 'success' | 'warning' | 'error'
export type ToastText = string | VNode | VNode[]

export interface ToastInput {
  text: ToastText
  preserve?: boolean
  action?: string
  onAction?: () => void
  onUndoAction?: () => void
}

export interface ToastItem extends ToastInput {
  id: number
  type: ToastType
  leaving?: boolean
}

export type ToastPayload = string | ToastInput

const toasts = shallowRef<ToastItem[]>([])
let nextId = 1
const timers = new Map<number, ReturnType<typeof setTimeout>>()
let hostMounted = false

function durationFor(item: Omit<ToastItem, 'id'>) {
  if (item.preserve) return null
  if (item.onUndoAction || item.action) return 8000
  if (item.type === 'error') return 6000
  return 4000
}

function scheduleDismiss(id: number, ms: number) {
  const existing = timers.get(id)
  if (existing) clearTimeout(existing)
  timers.set(id, setTimeout(() => dismiss(id), ms))
}

export function dismiss(id: number) {
  const timer = timers.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }

  const current = toasts.value.find(item => item.id === id)
  if (!current || current.leaving) return

  toasts.value = toasts.value.map(item =>
    item.id === id ? { ...item, leaving: true } : item,
  )

  setTimeout(() => {
    toasts.value = toasts.value.filter(item => item.id !== id)
  }, 160)
}

function normalize(payload: ToastPayload, type: ToastType): Omit<ToastItem, 'id'> {
  if (typeof payload === 'string') {
    return { text: payload, type }
  }
  return { ...payload, type }
}

function push(payload: ToastPayload, type: ToastType) {
  ensureToaster()

  const item: ToastItem = {
    ...normalize(payload, type),
    id: nextId++,
  }

  toasts.value = [...toasts.value, item].slice(-6)

  const ms = durationFor(item)
  if (ms) scheduleDismiss(item.id, ms)

  return item.id
}

async function ensureToaster() {
  if (!import.meta.client || hostMounted) return
  if (document.querySelector('[data-slot="toaster"]')) {
    hostMounted = true
    return
  }
  hostMounted = true
  const [{ createApp, h }, { default: Toaster }] = await Promise.all([
    import('vue'),
    import('./Toaster.vue'),
  ])
  if (document.querySelector('[data-slot="toaster"]')) return
  const el = document.createElement('div')
  document.body.appendChild(el)
  createApp({ render: () => h(Toaster) }).mount(el)
}

export function useToasts() {
  return {
    toasts: readonly(toasts),
    message: (payload: ToastPayload) => push(payload, 'message'),
    success: (payload: ToastPayload) => push(payload, 'success'),
    warning: (payload: ToastPayload) => push(payload, 'warning'),
    error: (payload: ToastPayload) => push(payload, 'error'),
    dismiss,
  }
}

export { toasts }
