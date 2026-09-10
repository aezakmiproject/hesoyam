import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type ComboboxSize = 'small' | 'medium' | 'large' | 'default'

export interface ComboboxOptionApi {
  value: string
  getLabel: () => string
  hidden: Ref<boolean>
}

export interface ComboboxContext {
  id: ComputedRef<string>
  ariaLabel: ComputedRef<string | undefined>
  query: Ref<string>
  value: Ref<string | null>
  open: Ref<boolean>
  disabled: ComputedRef<boolean>
  errored: ComputedRef<boolean>
  clearable: ComputedRef<boolean>
  size: ComputedRef<ComboboxSize>
  placeholder: ComputedRef<string>
  highlighted: Ref<string | null>
  options: Ref<ComboboxOptionApi[]>
  displayValue: ComputedRef<string>
  setQuery: (next: string) => void
  setOpen: (next: boolean) => void
  select: (next: string | null) => void
  highlight: (value: string | null) => void
  highlightMove: (delta: number) => void
  registerOption: (option: ComboboxOptionApi) => void
  unregisterOption: (value: string) => void
}

export const COMBOBOX_KEY: InjectionKey<ComboboxContext> = Symbol('geist-combobox')
