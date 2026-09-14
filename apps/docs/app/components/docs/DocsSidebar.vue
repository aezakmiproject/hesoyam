<script setup lang="ts">
import { Badge, IconTile, Scroller } from '@aezakmiproject/hesoyam'

const route = useRoute()
const { groups } = useGeistNav()

function isActive(href: string) {
  if (href === '/')
    return route.path === '/'
  return route.path === href
}
</script>

<template>
  <aside class="hidden w-[260px] shrink-0 border-r border-[var(--ds-gray-alpha-400)] lg:block">
    <Scroller
      overflow="y"
      height="calc(100svh - 4rem)"
      width="100%"
      class="sticky top-16"
      children-container-class-name="px-5 py-6"
    >
      <nav class="flex flex-col gap-8 pb-12">
        <section v-for="group in groups" :key="group.id">
          <p class="px-3 pb-2 text-[14px] font-medium text-[var(--ds-gray-900)]">
            {{ group.title }}
          </p>
          <ul class="flex flex-col gap-0.5">
            <li v-for="item in group.items" :key="item.href">
              <span
                v-if="item.disabled"
                aria-disabled="true"
                class="flex cursor-not-allowed items-center gap-2.5 rounded-[8px] px-2 py-1 text-[15px] leading-6 text-[var(--ds-gray-900)] opacity-60"
              >
                <IconTile :icon="item.icon" :variant="item.variant" theme-sync />
                <span class="min-w-0 truncate">{{ item.title }}</span>
                <Badge
                  v-if="item.badge"
                  size="sm"
                  variant="gray"
                  contrast="low"
                  class="ml-auto"
                >
                  {{ item.badge }}
                </Badge>
              </span>
              <NuxtLink
                v-else
                :to="item.href"
                :class="isActive(item.href)
                  ? 'bg-[var(--ds-gray-100)] text-[var(--ds-gray-1000)]'
                  : 'text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]'"
                class="flex items-center gap-2.5 rounded-[8px] px-2 py-1 text-[15px] leading-6"
              >
                <IconTile :icon="item.icon" :variant="item.variant" theme-sync />
                <span class="min-w-0 truncate">{{ item.title }}</span>
                <Badge
                  v-if="item.badge"
                  size="sm"
                  variant="gray"
                  contrast="low"
                  class="ml-auto"
                >
                  {{ item.badge }}
                </Badge>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </nav>
    </Scroller>
  </aside>
</template>
