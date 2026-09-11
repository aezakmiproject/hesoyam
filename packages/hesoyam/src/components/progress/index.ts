export { default as Progress } from './Progress.vue'

export type ProgressType = 'success' | 'error' | 'warning' | 'secondary'

export interface ProgressStop {
  value: number
  tooltip?: string
  ariaLabel?: string
}
