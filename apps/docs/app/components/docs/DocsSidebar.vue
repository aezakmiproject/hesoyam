<script setup lang="ts">
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
    <div class="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-y-auto px-5 py-6">
      <nav class="flex flex-col gap-8 pb-12">
        <section v-for="group in groups" :key="group.id">
          <p class="px-3 pb-2 text-[14px] font-medium text-[var(--ds-gray-900)]">
            {{ group.title }}
          </p>
          <ul class="flex flex-col gap-0.5">
            <li v-for="item in group.items" :key="item.href">
              <NuxtLink
                :to="item.href"
                :class="isActive(item.href)
                  ? 'bg-[var(--ds-gray-100)] text-[var(--ds-gray-1000)]'
                  : 'text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]'"
                class="block rounded-[8px] px-3 py-1.5 text-[15px] leading-6"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </nav>
    </div>
  </aside>
</template>
