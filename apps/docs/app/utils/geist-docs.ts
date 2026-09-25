export interface GeistNavItem {
  title: string
  href: string
  titleKey?: string
  disabled?: boolean
  badgeKey?: string
}

export interface GeistNavGroup {
  id: 'foundations' | 'components'
  title: string
  items: GeistNavItem[]
}

export const geistNav: GeistNavGroup[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    items: [
      { title: 'Introduction', href: '/', titleKey: 'geist.items.introduction' },
      { title: 'Installation', href: '/installation', titleKey: 'geist.items.installation' },
      { title: 'Colors', href: '/colors' },
      { title: 'Typography', href: '/typography' },
      { title: 'Materials', href: '/materials' },
      { title: 'Blocks', href: '/blocks', disabled: true, badgeKey: 'geist.badges.inDev' },
      { title: 'Icons', href: '/icons' },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    items: [
      { title: 'Avatar', href: '/avatar' },
      { title: 'Badge', href: '/badge' },
      { title: 'Banner', href: '/banner' },
      { title: 'Breadcrumbs', href: '/breadcrumbs' },
      { title: 'Button', href: '/button' },
      { title: 'Card', href: '/card' },
      { title: 'Calendar', href: '/calendar' },
      { title: 'Checkbox', href: '/checkbox' },
      { title: 'Code Block', href: '/code-block' },
      { title: 'Collapse', href: '/collapse' },
      { title: 'Combobox', href: '/combobox' },
      { title: 'Context Card', href: '/context-card' },
      { title: 'Context Menu', href: '/context-menu' },
      { title: 'Copy Button', href: '/copy-button' },
      { title: 'Drawer', href: '/drawer' },
      { title: 'Empty State', href: '/empty-state' },
      { title: 'Entity', href: '/entity' },
      { title: 'Error', href: '/error' },
      { title: 'Fieldset', href: '/fieldset' },
      { title: 'File Tree', href: '/file-tree' },
      { title: 'Gauge', href: '/gauge' },
      { title: 'Grid', href: '/grid' },
      { title: 'Icon Tile', href: '/icon-tile' },
      { title: 'Input', href: '/input' },
      { title: 'Keyboard Input', href: '/keyboard-input' },
      { title: 'Label', href: '/label' },
      { title: 'Loading Dots', href: '/loading-dots' },
      { title: 'Marquee', href: '/marquee' },
      { title: 'Menu', href: '/menu' },
      { title: 'Modal', href: '/modal' },
      { title: 'Multi Select', href: '/multi-select' },
      { title: 'Note', href: '/note' },
      { title: 'Pagination', href: '/pagination' },
      { title: 'Progress', href: '/progress' },
      { title: 'Radio', href: '/radio' },
      { title: 'Scroller', href: '/scroller' },
      { title: 'Search Input', href: '/search-input' },
      { title: 'Select', href: '/select' },
      { title: 'Separator', href: '/separator' },
      { title: 'Sheet', href: '/sheet' },
      { title: 'Show More', href: '/show-more' },
      { title: 'Sidebar', href: '/sidebar' },
      { title: 'Skeleton', href: '/skeleton' },
      { title: 'Slider', href: '/slider' },
      { title: 'Snippet', href: '/snippet' },
      { title: 'Spinner', href: '/spinner' },
      { title: 'Split Button', href: '/split-button' },
      { title: 'Switch', href: '/switch' },
      { title: 'Table', href: '/table' },
      { title: 'Tabs', href: '/tabs' },
      { title: 'Textarea', href: '/textarea' },
      { title: 'Theme Switcher', href: '/theme-switcher' },
      { title: 'Toast', href: '/toast' },
      { title: 'Toggle', href: '/toggle' },
      { title: 'Tooltip', href: '/tooltip' },
      { title: 'Video', href: '/video' },
    ],
  },
]
