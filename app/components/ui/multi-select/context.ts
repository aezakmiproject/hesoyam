import type { InjectionKey, Ref } from 'vue'

export type MultiSelectAlign = 'start' | 'center' | 'end'
export type MultiSelectFocusTarget = 'checkbox' | 'button'

export interface MultiSelectRowApi {
  id: string
  focusCheckbox: () => void
  focusButton: () => void
}

export interface MultiSelectContext {
  open: Ref<boolean>
  triggerRef: Ref<HTMLElement | null>
  contentRef: Ref<HTMLElement | null>
  align: Ref<MultiSelectAlign>
  rows: Ref<MultiSelectRowApi[]>
  focusedIndex: Ref<number>
  focusTarget: Ref<MultiSelectFocusTarget>
  setOpen: (next: boolean) => void
  registerRow: (row: MultiSelectRowApi) => void
  unregisterRow: (id: string) => void
  moveFocus: (delta: number) => void
  setFocusTarget: (target: MultiSelectFocusTarget) => void
  focusActive: () => void
  closeAndRestoreFocus: () => void
}

export const MULTI_SELECT_KEY: InjectionKey<MultiSelectContext> = Symbol('geist-multi-select')
