import type { InjectionKey, Ref } from 'vue'

export interface TableContext {
  virtualize: Ref<boolean>
}

export const tableContextKey: InjectionKey<TableContext> = Symbol('geist-table')
