import type { HTMLAttributes } from 'vue'

export { default as Pagination } from './Pagination.vue'

export interface PaginationTarget {
  title: string
  href: string
}

export interface PaginationProps {
  previous?: PaginationTarget
  next?: PaginationTarget
  class?: HTMLAttributes['class']
}
