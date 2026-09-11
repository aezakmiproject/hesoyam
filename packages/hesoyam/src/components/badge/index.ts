import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap font-medium leading-none select-none [&_svg]:pointer-events-none [&_[data-slot=icon]]:inline-flex [&_[data-slot=icon]]:shrink-0',
  {
    variants: {
      variant: {
        gray: '',
        blue: '',
        purple: '',
        amber: '',
        red: '',
        pink: '',
        green: '',
        teal: '',
        inverted: 'bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]',
        trial: 'bg-[linear-gradient(90deg,var(--ds-purple-700),var(--ds-pink-700))] text-white',
        turbo: 'bg-[linear-gradient(90deg,#e5484d,#ff7a18)] text-white',
        pill: 'rounded-full border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)]',
        default: 'bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]',
        secondary: 'bg-[var(--ds-gray-200)] text-[var(--ds-gray-1000)]',
        destructive: '',
        outline: 'border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] text-[var(--ds-gray-1000)]',
        ghost: 'bg-transparent text-[var(--ds-gray-900)]',
        link: 'bg-transparent text-[var(--ds-blue-900)] underline-offset-4 hover:underline',
      },
      contrast: {
        high: '',
        low: '',
      },
      size: {
        sm: 'h-4 rounded-[4px] px-1.5 text-[10px] [&_[data-slot=icon]]:size-2.5 [&_svg]:size-2.5',
        md: 'h-5 rounded-[6px] px-1.5 text-[12px] [&_[data-slot=icon]]:size-3 [&_svg]:size-3',
        lg: 'h-6 rounded-[6px] px-2 text-[13px] [&_[data-slot=icon]]:size-3.5 [&_svg]:size-3.5',
        small: 'h-4 rounded-[4px] px-1.5 text-[10px] [&_[data-slot=icon]]:size-2.5 [&_svg]:size-2.5',
        large: 'h-6 rounded-[6px] px-2 text-[13px] [&_[data-slot=icon]]:size-3.5 [&_svg]:size-3.5',
      },
    },
    compoundVariants: [
      { variant: 'gray', contrast: 'high', class: 'bg-[var(--ds-gray-700)] text-white' },
      { variant: 'gray', contrast: 'low', class: 'bg-[var(--ds-gray-200)] text-[var(--ds-gray-1000)]' },
      { variant: 'blue', contrast: 'high', class: 'bg-[var(--ds-blue-700)] text-white' },
      { variant: 'blue', contrast: 'low', class: 'bg-[var(--ds-blue-200)] text-[var(--ds-blue-900)]' },
      { variant: 'purple', contrast: 'high', class: 'bg-[var(--ds-purple-700)] text-white' },
      { variant: 'purple', contrast: 'low', class: 'bg-[var(--ds-purple-200)] text-[var(--ds-purple-900)]' },
      { variant: 'amber', contrast: 'high', class: 'bg-[var(--ds-amber-700)] text-black' },
      { variant: 'amber', contrast: 'low', class: 'bg-[var(--ds-amber-200)] text-[var(--ds-amber-900)]' },
      { variant: 'red', contrast: 'high', class: 'bg-[var(--ds-red-700)] text-white' },
      { variant: 'red', contrast: 'low', class: 'bg-[var(--ds-red-200)] text-[var(--ds-red-900)]' },
      { variant: 'pink', contrast: 'high', class: 'bg-[var(--ds-pink-700)] text-white' },
      { variant: 'pink', contrast: 'low', class: 'bg-[var(--ds-pink-200)] text-[var(--ds-pink-900)]' },
      { variant: 'green', contrast: 'high', class: 'bg-[var(--ds-green-700)] text-white' },
      { variant: 'green', contrast: 'low', class: 'bg-[var(--ds-green-200)] text-[var(--ds-green-900)]' },
      { variant: 'teal', contrast: 'high', class: 'bg-[var(--ds-teal-700)] text-white' },
      { variant: 'teal', contrast: 'low', class: 'bg-[var(--ds-teal-200)] text-[var(--ds-teal-900)]' },
      { variant: 'destructive', contrast: 'high', class: 'bg-[var(--ds-red-700)] text-white' },
      { variant: 'destructive', contrast: 'low', class: 'bg-[var(--ds-red-200)] text-[var(--ds-red-900)]' },
      { variant: 'pill', size: 'sm', class: 'h-6 px-2' },
      { variant: 'pill', size: 'md', class: 'h-8 px-2.5 text-[13px]' },
      { variant: 'pill', size: 'lg', class: 'h-10 px-3 text-[13px]' },
      { variant: 'pill', size: 'small', class: 'h-6 px-2' },
      { variant: 'pill', size: 'large', class: 'h-10 px-3 text-[13px]' },
    ],
    defaultVariants: {
      variant: 'default',
      contrast: 'high',
      size: 'md',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
