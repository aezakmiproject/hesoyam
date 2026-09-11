export { default as Error, default as GeistError } from './GeistError.vue'

export type ErrorSize = 'small' | 'medium' | 'large'

export interface ErrorDetails {
  message: string
  action?: string
  link?: string
}
