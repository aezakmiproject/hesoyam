<script setup lang="ts">
import { Badge, IconTile, Menu, MenuButton, MenuContainer, MenuItem, MenuLink, MenuSection, SearchInput, ThemeSwitcher } from '@aezakmiproject/hesoyam'
import DocsPagination from '~/components/docs/DocsPagination.vue'
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
          <ThemeSwitcher small />
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
                  <template v-for="item in group.items" :key="item.href">
                    <MenuItem v-if="item.disabled" disabled>
                      <span class="inline-flex min-w-0 items-center gap-2">
                        <IconTile :icon="item.icon" :variant="item.variant" theme-sync />
                        <span class="truncate">{{ item.title }}</span>
                        <Badge
                          v-if="item.badge"
                          size="sm"
                          variant="gray"
                          contrast="low"
                        >
                          {{ item.badge }}
                        </Badge>
                      </span>
                    </MenuItem>
                    <MenuLink
                      v-else
                      :href="item.href"
                    >
                      <span class="inline-flex min-w-0 items-center gap-2">
                        <IconTile :icon="item.icon" :variant="item.variant" theme-sync />
                        <span class="truncate">{{ item.title }}</span>
                      </span>
                    </MenuLink>
                  </template>
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
        <DocsPagination />
      </main>
    </div>
  </div>
</template>
