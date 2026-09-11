export { default as Error, default as GeistError, default as HesoyamError } from './HesoyamError.vue'

export type ErrorSize = 'small' | 'medium' | 'large'

export interface ErrorDetails {
  message: string
  action?: string
  link?: string
}
