import type { ComputedRef, InjectionKey } from 'vue'

export type FieldsetType = 'default' | 'error' | 'warning'

export const fieldsetKey: InjectionKey<ComputedRef<FieldsetType>> = Symbol('fieldset')
