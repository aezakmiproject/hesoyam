import type { ComputedRef, InjectionKey } from 'vue'

export type SwitchSize = 'small' | 'default' | 'large'

export interface SwitchContext {
  name: ComputedRef<string>
  size: ComputedRef<SwitchSize>
  disabled: ComputedRef<boolean>
  value: ComputedRef<string | undefined>
  setValue: (value: string) => void
  registerDefault: (value: string) => void
}

export const switchKey: InjectionKey<SwitchContext> = Symbol('Switch')
