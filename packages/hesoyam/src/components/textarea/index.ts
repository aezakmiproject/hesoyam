import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Textarea } from './Textarea.vue'

export const textareaVariants = cva(
  [
    'flex w-full min-w-0 resize-y',
    'rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]',
    'text-[var(--ds-gray-1000)] placeholder:text-[var(--ds-gray-900)]',
    'transition-[color,background-color,border-color,box-shadow] duration-150',
    'outline-none focus-visible:border-[var(--ds-focus)] focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]/30',
    'disabled:cursor-not-allowed disabled:bg-[var(--ds-gray-100)] disabled:opacity-60',
    'read-only:bg-[var(--ds-gray-100)]',
    'aria-invalid:border-[var(--ds-red-700)] aria-invalid:focus-visible:ring-[var(--ds-red-700)]/30',
  ].join(' '),
  {
    variants: {
      size: {
        small: 'px-2.5 py-1.5 text-[13px] leading-5',
        default: 'px-3 py-2 text-sm leading-5',
        medium: 'px-3 py-2 text-sm leading-5',
        large: 'px-3.5 py-2.5 text-base leading-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
export type TextareaSize = 'small' | 'default' | 'medium' | 'large'
