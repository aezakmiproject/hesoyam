import type { InjectionKey, Ref } from 'vue'

export interface CollapseGroupContext {
  multiple: Ref<boolean>
  openIds: Ref<Set<string>>
  toggle: (id: string) => void
  register: (id: string, defaultExpanded: boolean) => void
  unregister: (id: string) => void
}

export const collapseGroupKey: InjectionKey<CollapseGroupContext> = Symbol('geist-collapse-group')
