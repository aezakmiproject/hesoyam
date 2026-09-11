import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const noteVariants = cva(
  'flex w-full items-start gap-2 rounded-md border text-[13px] leading-5',
  {
    variants: {
      variant: {
        default: 'border-[var(--ds-gray-alpha-400)] text-[var(--ds-gray-1000)] [--note-icon:var(--ds-blue-900)]',
        success: 'border-[var(--ds-green-400)] text-[var(--ds-gray-1000)] [--note-icon:var(--ds-green-900)]',
        error: 'border-[var(--ds-red-400)] text-[var(--ds-gray-1000)] [--note-icon:var(--ds-red-900)]',
        warning: 'border-[var(--ds-amber-400)] text-[var(--ds-gray-1000)] [--note-icon:var(--ds-amber-900)]',
        secondary: 'border-[var(--ds-gray-alpha-400)] text-[var(--ds-gray-1000)] [--note-icon:var(--ds-gray-900)]',
        violet: 'border-[var(--ds-purple-400)] text-[var(--ds-gray-1000)] [--note-icon:var(--ds-purple-900)]',
        cyan: 'border-[var(--ds-teal-400)] text-[var(--ds-gray-1000)] [--note-icon:var(--ds-teal-900)]',
      },
      size: {
        small: 'gap-1.5 px-2 py-1.5 text-xs',
        medium: 'px-3 py-2',
      },
      fill: {
        true: '',
        false: 'bg-transparent',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'default', fill: true, class: 'bg-[var(--ds-gray-100)]' },
      { variant: 'success', fill: true, class: 'bg-[var(--ds-green-100)]' },
      { variant: 'error', fill: true, class: 'bg-[var(--ds-red-100)]' },
      { variant: 'warning', fill: true, class: 'bg-[var(--ds-amber-100)]' },
      { variant: 'secondary', fill: true, class: 'bg-[var(--ds-gray-100)]' },
      { variant: 'violet', fill: true, class: 'bg-[var(--ds-purple-100)]' },
      { variant: 'cyan', fill: true, class: 'bg-[var(--ds-teal-100)]' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      fill: false,
      disabled: false,
    },
  },
)

export type NoteVariants = VariantProps<typeof noteVariants>
export type NoteVariant = NonNullable<NoteVariants['variant']>
export type NoteSize = NonNullable<NoteVariants['size']>
