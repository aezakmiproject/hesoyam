import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Tooltip } from './Tooltip.vue'
export { default as TooltipContent } from './TooltipContent.vue'
export { default as TooltipProvider } from './TooltipProvider.vue'
export { default as TooltipTrigger } from './TooltipTrigger.vue'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipBoxAlign = 'left' | 'center' | 'right'
export type TooltipType = 'default' | 'success' | 'error' | 'warning' | 'violet'

export const tooltipContentVariants = cva(
  'z-50 inline-flex w-fit max-w-xs origin-(--reka-tooltip-content-transform-origin) items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-[12px] font-medium leading-snug has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
  {
    variants: {
      type: {
        default: 'bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]',
        success: 'bg-[var(--ds-green-700)] text-white',
        error: 'bg-[var(--ds-red-700)] text-white',
        warning: 'bg-[var(--ds-amber-700)] text-black',
        violet: 'bg-[#8a63d2] text-white',
      },
      center: {
        true: 'text-center',
        false: 'text-left',
      },
    },
    defaultVariants: {
      type: 'default',
      center: true,
    },
  },
)

export const tooltipArrowVariants = cva('', {
  variants: {
    type: {
      default: 'fill-[var(--ds-gray-1000)]',
      success: 'fill-[var(--ds-green-700)]',
      error: 'fill-[var(--ds-red-700)]',
      warning: 'fill-[var(--ds-amber-700)]',
      violet: 'fill-[#8a63d2]',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})

export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>
