import type { InjectionKey, Ref } from 'vue'

export interface ModalContext {
  sticky: Ref<boolean>
}

export const modalContextKey: InjectionKey<ModalContext> = Symbol('geist-modal')
