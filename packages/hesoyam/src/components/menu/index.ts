import type { InjectionKey, Ref } from 'vue'

export { default as Menu } from './Menu.vue'
export { default as MenuButton } from './MenuButton.vue'
export { default as MenuContainer } from './MenuContainer.vue'
export { default as MenuDivider } from './MenuDivider.vue'
export { default as MenuItem } from './MenuItem.vue'
export { default as MenuItemLocked } from './MenuItemLocked.vue'
export { default as MenuLink } from './MenuLink.vue'
export { default as MenuSection } from './MenuSection.vue'

export type MenuPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type MenuItemType = 'default' | 'error'

export const menuPositionKey: InjectionKey<Ref<MenuPosition>> = Symbol('geist-menu-position')

export function parseMenuPosition(position: MenuPosition = 'bottom-start'): {
  side: 'top' | 'bottom' | 'left' | 'right'
  align: 'start' | 'center' | 'end'
} {
  const [side, alignToken] = position.split('-') as ['top' | 'bottom' | 'left' | 'right', string | undefined]
  const align = alignToken === 'start' ? 'start' : alignToken === 'end' ? 'end' : 'center'
  return { side, align }
}

export const menuContentClass
  = 'z-50 min-w-[160px] overflow-hidden rounded-[12px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-1.5 text-[13px] text-[var(--ds-gray-1000)] shadow-[0_8px_30px_rgba(0,0,0,0.24)] outline-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'

export const menuItemClass
  = 'relative flex h-8 w-full cursor-default select-none items-center gap-2 rounded-[6px] px-2 text-[13px] leading-none text-[var(--ds-gray-1000)] outline-none data-highlighted:bg-[var(--ds-gray-100)] focus:bg-[var(--ds-gray-100)] data-disabled:cursor-not-allowed data-disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 data-[type=error]:text-[var(--ds-red-700)] data-[type=error]:data-highlighted:bg-[var(--ds-red-700)]/10 data-[type=error]:focus:bg-[var(--ds-red-700)]/10'

export const menuDividerClass = 'mx-1 my-1.5 h-px bg-[var(--ds-gray-alpha-400)]'

export const menuSectionTitleClass = 'px-2 pb-1 pt-1.5 text-[12px] font-medium text-[var(--ds-gray-900)]'
