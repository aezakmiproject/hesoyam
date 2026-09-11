import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Input } from './Input.vue'

export const inputVariants = cva(
  [
    'flex w-full min-w-0 items-stretch overflow-hidden',
    'rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]',
    'transition-[color,background-color,border-color,box-shadow] duration-150',
    'focus-within:border-[var(--ds-focus)] focus-within:ring-2 focus-within:ring-[var(--ds-focus)]/30',
    'data-[invalid]:border-[var(--ds-red-700)] data-[invalid]:focus-within:ring-[var(--ds-red-700)]/30',
    'data-[disabled]:cursor-not-allowed data-[disabled]:bg-[var(--ds-gray-100)] data-[disabled]:opacity-60',
  ].join(' '),
  {
    variants: {
      size: {
        small: 'h-8 text-[13px]',
        default: 'h-10 text-sm',
        medium: 'h-10 text-sm',
        large: 'h-12 text-base',
      },
      rounded: {
        true: 'rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      rounded: false,
    },
  },
)

export type InputVariants = VariantProps<typeof inputVariants>
export type InputSize = 'small' | 'default' | 'medium' | 'large'
