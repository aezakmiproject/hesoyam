import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as IconTile } from './IconTile.vue'
export { iconTileGradientFromHex, iconTileSourceHex, parseHexColor } from './gradient'

export const iconTileVariants = cva(
  'ds-icon-tile relative inline-flex shrink-0 items-center justify-center rounded-[6px] [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        blue: '',
        gray: '',
        green: '',
        red: '',
        amber: '',
        teal: '',
        purple: '',
        pink: '',
      },
      size: {
        small: 'size-[22px] [&_svg]:size-[13px]',
        sm: 'size-[22px] [&_svg]:size-[13px]',
        medium: 'size-7 [&_svg]:size-4',
        md: 'size-7 [&_svg]:size-4',
        large: 'size-8 [&_svg]:size-[18px]',
        lg: 'size-8 [&_svg]:size-[18px]',
      },
    },
    defaultVariants: {
      variant: 'blue',
      size: 'small',
    },
  },
)

export type IconTileVariants = VariantProps<typeof iconTileVariants>
export type IconTileVariant = NonNullable<IconTileVariants['variant']>
