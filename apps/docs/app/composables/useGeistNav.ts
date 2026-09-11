import { geistNav } from '~/utils/geist-docs'

export function useGeistNav(searchOverride?: Ref<string>) {
  const { t } = useI18n()
  const search = searchOverride ?? inject('geistSearch', ref(''))

  function itemTitle(item: (typeof geistNav)[number]['items'][number]) {
    return item.titleKey ? t(item.titleKey) : item.title
  }

  const groups = computed(() => {
    const q = search.value.trim().toLowerCase()
    const localized = geistNav.map(group => ({
      ...group,
      title: t(`geist.groups.${group.id}`),
      items: group.items.map(item => ({
        ...item,
        title: itemTitle(item),
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

  return { groups }
}
