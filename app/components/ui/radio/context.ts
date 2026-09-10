import type { ComputedRef, InjectionKey } from 'vue'

export interface RadioGroupContext {
  name: ComputedRef<string>
  value: ComputedRef<string | undefined>
  disabled: ComputedRef<boolean>
  required: ComputedRef<boolean>
  setValue: (value: string) => void
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('RadioGroup')
