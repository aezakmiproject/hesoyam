<script setup lang="ts">
const { t } = useI18n()

const radii = computed(() => [
  { name: t('pages.materials.radii.control.name'), value: '6px', use: t('pages.materials.radii.control.use') },
  { name: t('pages.materials.radii.card.name'), value: '8px', use: t('pages.materials.radii.card.use') },
  { name: t('pages.materials.radii.menu.name'), value: '12px', use: t('pages.materials.radii.menu.use') },
  { name: t('pages.materials.radii.pill.name'), value: '999px', use: t('pages.materials.radii.pill.use') },
])

const strokes = computed(() => [
  { name: t('pages.materials.strokes.hairline.name'), token: '--ds-gray-alpha-400', use: t('pages.materials.strokes.hairline.use') },
  { name: t('pages.materials.strokes.focus.name'), token: '--ds-focus', use: t('pages.materials.strokes.focus.use') },
  { name: t('pages.materials.strokes.error.name'), token: '--ds-red-700', use: t('pages.materials.strokes.error.use') },
])

const fills = computed(() => [
  { name: t('pages.materials.fills.page'), token: '--ds-background-100' },
  { name: t('pages.materials.fills.raised'), token: '--ds-gray-100' },
  { name: t('pages.materials.fills.hover'), token: '--ds-gray-200' },
])
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.materials.title')"
      :description="$t('pages.materials.description')"
    />

    <DocsSection :title="$t('pages.materials.radius')">
      <div class="grid gap-3 sm:grid-cols-2">
        <div
          v-for="item in radii"
          :key="item.name"
          class="border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] p-5"
          :style="{ borderRadius: item.value }"
        >
          <p class="text-[14px] font-medium">{{ item.name }} · {{ item.value }}</p>
          <p class="mt-1 text-[13px] text-[var(--ds-gray-900)]">{{ item.use }}</p>
        </div>
      </div>
    </DocsSection>

    <DocsSection :title="$t('pages.materials.fills.title')">
      <div class="grid gap-3 sm:grid-cols-3">
        <div
          v-for="item in fills"
          :key="item.token"
          class="rounded-[8px] border border-[var(--ds-gray-alpha-400)] p-4"
          :style="{ background: `var(${item.token})` }"
        >
          <p class="text-[13px] font-medium">{{ item.name }}</p>
          <p class="mt-1 font-mono text-[12px] text-[var(--ds-gray-900)]">{{ item.token }}</p>
        </div>
      </div>
    </DocsSection>

    <DocsSection :title="$t('pages.materials.strokes.title')">
      <div class="space-y-2">
        <div
          v-for="item in strokes"
          :key="item.token"
          class="flex items-center justify-between rounded-[8px] px-4 py-3"
          :style="{ border: `1px solid var(${item.token})` }"
        >
          <span class="text-[13px]">{{ item.name }} — {{ item.use }}</span>
          <span class="font-mono text-[12px] text-[var(--ds-gray-900)]">{{ item.token }}</span>
        </div>
      </div>
    </DocsSection>

    <DocsSection :title="$t('pages.materials.elevation.title')" :description="$t('pages.materials.elevation.hint')">
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.24)]">
          <p class="text-[13px] font-medium">{{ $t('pages.materials.elevation.tooltip.name') }}</p>
          <p class="mt-1 text-[12px] text-[var(--ds-gray-900)]">{{ $t('pages.materials.elevation.tooltip.hint') }}</p>
        </div>
        <div class="rounded-[12px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.24)]">
          <p class="text-[13px] font-medium">{{ $t('pages.materials.elevation.menu.name') }}</p>
          <p class="mt-1 text-[12px] text-[var(--ds-gray-900)]">{{ $t('pages.materials.elevation.menu.hint') }}</p>
        </div>
        <div class="rounded-[12px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-4 shadow-[0_16px_70px_rgba(0,0,0,0.48)]">
          <p class="text-[13px] font-medium">{{ $t('pages.materials.elevation.modal.name') }}</p>
          <p class="mt-1 text-[12px] text-[var(--ds-gray-900)]">{{ $t('pages.materials.elevation.modal.hint') }}</p>
        </div>
      </div>
    </DocsSection>
  </div>
</template>
