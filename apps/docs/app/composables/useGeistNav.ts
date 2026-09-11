import { geistNav } from '~/utils/geist-docs'
import { navChipFor } from '~/utils/geist-nav-chips'

function normalizePath(path: string) {
  if (!path || path === '/')
    return '/'
  return path.replace(/\/+$/, '') || '/'
}

export function useGeistNav(searchOverride?: Ref<string>) {
  const { t } = useI18n()
  const route = useRoute()
  const search = searchOverride ?? inject('geistSearch', ref(''))

  function itemTitle(item: (typeof geistNav)[number]['items'][number]) {
    return item.titleKey ? t(item.titleKey) : item.title
  }

  const pages = computed(() =>
    geistNav.flatMap(group => group.items).map(item => ({
      href: item.href,
      title: itemTitle(item),
    })),
  )

  const currentIndex = computed(() =>
    pages.value.findIndex(item => item.href === normalizePath(route.path)),
  )

  const previousPage = computed(() => {
    const index = currentIndex.value
    return index > 0 ? pages.value[index - 1] : undefined
  })

  const nextPage = computed(() => {
    const index = currentIndex.value
    if (index < 0 || index >= pages.value.length - 1)
      return undefined
    return pages.value[index + 1]
  })

  const groups = computed(() => {
    const q = search.value.trim().toLowerCase()
    const localized = geistNav.map(group => ({
      ...group,
      title: t(`geist.groups.${group.id}`),
      items: group.items.map(item => ({
        ...item,
        title: itemTitle(item),
        ...navChipFor(item.href),
      })),
    }))
    if (!q)
      return localized
    return localized
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.title.toLowerCase().includes(q)),
      }))
      .filter(group => group.items.length)
  })

  return { groups, previousPage, nextPage }
}
