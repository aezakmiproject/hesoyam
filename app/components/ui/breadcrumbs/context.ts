import type { ComputedRef, InjectionKey } from 'vue'

export type BreadcrumbType = 'text' | 'menu'

export interface BreadcrumbContext {
  type: ComputedRef<BreadcrumbType>
}

export const breadcrumbContextKey: InjectionKey<BreadcrumbContext> = Symbol('geist-breadcrumb')
