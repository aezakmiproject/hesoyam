<script setup lang="ts">
import { Menu, MenuButton, MenuContainer, MenuLink, MenuSection } from '@/components/ui/menu'
import { SearchInput } from '@/components/ui/search-input'
import { geistNav } from '~/utils/geist-docs'

const { t } = useI18n()
const route = useRoute()
const search = ref('')

provide('geistSearch', search)

const { groups } = useGeistNav(search)

useHead({
  title: computed(() => {
    const path = route.path || '/'
    const item = geistNav.flatMap(group => group.items).find(entry => entry.href === path)
    if (!item)
      return t('meta.title')
    const name = item.titleKey ? t(item.titleKey) : item.title
    return `${name} — Hesoyam`
  }),
})
</script>

<template>
  <div class="min-h-svh bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)]">
    <header class="sticky top-0 z-20 border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
      <div class="flex h-16 items-center gap-4 px-6 lg:px-8">
        <NuxtLink to="/" class="shrink-0 text-[15px] font-medium">
          {{ $t('geist.brand') }}
        </NuxtLink>

        <div class="mx-auto hidden w-full max-w-md flex-1 md:block">
          <SearchInput
            v-model="search"
            :placeholder="$t('geist.search')"
          />
        </div>

        <div class="ml-auto flex items-center gap-2">
          <LocaleSwitcher />
          <div class="lg:hidden">
            <MenuContainer position="bottom-end">
              <MenuButton variant="secondary" size="small">
                {{ $t('geist.browse') }}
              </MenuButton>
              <Menu :width="260">
                <MenuSection
                  v-for="group in groups"
                  :key="group.id"
                  :title="group.title"
                >
                  <MenuLink
                    v-for="item in group.items"
                    :key="item.href"
                    :href="item.href"
                  >
                    {{ item.title }}
                  </MenuLink>
                </MenuSection>
              </Menu>
            </MenuContainer>
          </div>
        </div>
      </div>
      <div class="border-t border-[var(--ds-gray-alpha-400)] px-6 py-3 md:hidden">
        <SearchInput
          v-model="search"
          size="small"
          :placeholder="$t('geist.search')"
        />
      </div>
    </header>

    <div class="flex">
      <DocsSidebar />
      <main class="min-w-0 flex-1">
        <div class="[&>.space-y-12]:space-y-0 [&_ul]:text-[16px] [&_ul]:leading-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
