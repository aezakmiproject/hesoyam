import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'
export { default as ButtonLink } from './ButtonLink.vue'
export { default as CustomButton } from './CustomButton.vue'

export const buttonVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center whitespace-nowrap',
    'rounded-[6px] border border-transparent font-medium select-none',
    'transition-[color,background-color,border-color,box-shadow,transform] duration-150',
    'outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]',
    'active:not-aria-[haspopup]:translate-y-px',
    'disabled:pointer-events-none disabled:cursor-not-allowed',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)] hover:bg-[var(--ds-gray-1000)]/90 disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)]',
        secondary:
          'border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)] disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:border-[var(--ds-gray-alpha-400)]',
        tertiary:
          'bg-transparent text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)] disabled:text-[var(--ds-gray-700)] disabled:hover:bg-transparent',
        error:
          'bg-[var(--ds-red-700)] text-white hover:brightness-110 disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:brightness-100',
        warning:
          'bg-[var(--ds-amber-700)] text-black hover:brightness-110 disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:brightness-100',
        ghost:
          'bg-transparent text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)] disabled:text-[var(--ds-gray-700)] disabled:hover:bg-transparent',
        outline:
          'border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)] disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:border-[var(--ds-gray-alpha-400)]',
        destructive:
          'bg-[var(--ds-red-700)] text-white hover:brightness-110 disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:brightness-100',
        link: 'bg-transparent text-[var(--ds-gray-1000)] underline-offset-4 hover:underline disabled:no-underline disabled:text-[var(--ds-gray-700)]',
      },
      size: {
        tiny: 'h-6 gap-1 px-2 text-xs [&_svg:not([class*=size-])]:size-3',
        small: 'h-8 gap-1.5 px-2.5 text-[13px] [&_svg:not([class*=size-])]:size-3.5',
        medium: 'h-10 gap-2 px-3.5 text-sm [&_svg:not([class*=size-])]:size-4',
        large: 'h-12 gap-2 px-4 text-base [&_svg:not([class*=size-])]:size-5',
        default: 'h-8 gap-1.5 px-2.5 text-[13px] [&_svg:not([class*=size-])]:size-3.5',
        xs: 'h-6 gap-1 px-2 text-xs [&_svg:not([class*=size-])]:size-3',
        sm: 'h-8 gap-1.5 px-2.5 text-[13px] [&_svg:not([class*=size-])]:size-3.5',
        lg: 'h-12 gap-2 px-4 text-base [&_svg:not([class*=size-])]:size-5',
        icon: 'size-8 px-0 [&_svg:not([class*=size-])]:size-3.5',
        'icon-xs': 'size-6 px-0 [&_svg:not([class*=size-])]:size-3',
        'icon-sm': 'size-7 px-0 [&_svg:not([class*=size-])]:size-3.5',
        'icon-lg': 'size-10 px-0 [&_svg:not([class*=size-])]:size-4',
      },
      shape: {
        unset: '',
        square: 'px-0',
        circle: 'rounded-full px-0',
        rounded: 'rounded-full',
      },
    },
    compoundVariants: [
      { shape: 'square', size: 'tiny', class: 'size-6' },
      { shape: 'square', size: 'small', class: 'size-8' },
      { shape: 'square', size: 'sm', class: 'size-8' },
      { shape: 'square', size: 'medium', class: 'size-10' },
      { shape: 'square', size: 'default', class: 'size-8' },
      { shape: 'square', size: 'large', class: 'size-12' },
      { shape: 'square', size: 'lg', class: 'size-12' },
      { shape: 'square', size: 'xs', class: 'size-6' },
      { shape: 'circle', size: 'tiny', class: 'size-6' },
      { shape: 'circle', size: 'small', class: 'size-8' },
      { shape: 'circle', size: 'sm', class: 'size-8' },
      { shape: 'circle', size: 'medium', class: 'size-10' },
      { shape: 'circle', size: 'default', class: 'size-8' },
      { shape: 'circle', size: 'large', class: 'size-12' },
      { shape: 'circle', size: 'lg', class: 'size-12' },
      { shape: 'circle', size: 'xs', class: 'size-6' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'unset',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'ghost'
  | 'outline'
  | 'destructive'
  | 'link'

export type ButtonSize =
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'default'
  | 'xs'
  | 'sm'
  | 'lg'
  | 'icon'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon-lg'

export type ButtonShape = 'square' | 'circle' | 'rounded'

export interface CustomButtonColors {
  foreground: string
  background: string
  border: string
}
