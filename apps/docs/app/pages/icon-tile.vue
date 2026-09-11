<script setup lang="ts">
import { IconTile } from '@aezakmiproject/hesoyam'
import { CircleUser, Palette, Settings, Smile } from '@lucide/vue'

const variants = ['blue', 'gray', 'green', 'red', 'amber', 'teal', 'purple', 'pink'] as const
const sizes = ['small', 'medium', 'large'] as const
const hexes = ['#9D9DA4', '#0070f3', '#8e4ec6', '#e5484d', '#46a758'] as const

const colorsCode = `<IconTile :icon="CircleUser" variant="blue" />
<IconTile :icon="Smile" variant="green" />
<IconTile :icon="Palette" variant="pink" />
<IconTile :icon="Settings" variant="gray" />`

const hexCode = `<IconTile :icon="Settings" color="#9D9DA4" />`

const sizesCode = `<IconTile :icon="CircleUser" size="small" />
<IconTile :icon="CircleUser" size="medium" />
<IconTile :icon="CircleUser" size="large" />`

const listCode = `<a class="flex items-center gap-2.5">
  <IconTile :icon="CircleUser" variant="blue" />
  <span>Avatar</span>
</a>`

const themeSyncCode = `<IconTile :icon="CircleUser" variant="blue" theme-sync />
<IconTile :icon="Smile" variant="amber" theme-sync />
<IconTile :icon="Palette" variant="pink" theme-sync />
<IconTile :icon="Settings" variant="gray" theme-sync />`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.icon-tile.title')"
      :description="$t('pages.icon-tile.description')"
    />

    <DocsSection :title="$t('pages.icon-tile.colors')" :description="$t('pages.icon-tile.colorsHint')">
      <DocsPreview :code="colorsCode">
        <div class="flex flex-wrap items-center gap-3">
          <IconTile
            v-for="variant in variants"
            :key="variant"
            :icon="CircleUser"
            :variant="variant"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icon-tile.fromHex')" :description="$t('pages.icon-tile.fromHexHint')">
      <DocsPreview :code="hexCode">
        <div class="flex flex-wrap items-center gap-3">
          <IconTile
            v-for="hex in hexes"
            :key="hex"
            :icon="Settings"
            :color="hex"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icon-tile.sizes')" :description="$t('pages.icon-tile.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-wrap items-end gap-4">
          <IconTile
            v-for="size in sizes"
            :key="size"
            :icon="CircleUser"
            :size="size"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icon-tile.themeSync')" :description="$t('pages.icon-tile.themeSyncHint')">
      <DocsPreview :code="themeSyncCode">
        <div class="flex flex-wrap items-center gap-3">
          <IconTile
            v-for="variant in variants"
            :key="variant"
            :icon="CircleUser"
            :variant="variant"
            theme-sync
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icon-tile.inList')" :description="$t('pages.icon-tile.inListHint')">
      <DocsPreview :code="listCode">
        <div class="flex flex-col gap-0.5 text-[15px] leading-6 text-[var(--ds-gray-1000)]">
          <span class="flex items-center gap-2.5 rounded-[8px] px-2 py-1">
            <IconTile :icon="CircleUser" variant="blue" />
            <span>{{ $t('pages.icon-tile.previewAvatar') }}</span>
          </span>
          <span class="flex items-center gap-2.5 rounded-[8px] px-2 py-1">
            <IconTile :icon="Smile" variant="amber" />
            <span>{{ $t('pages.icon-tile.previewIcons') }}</span>
          </span>
          <span class="flex items-center gap-2.5 rounded-[8px] px-2 py-1">
            <IconTile :icon="Palette" variant="pink" />
            <span>{{ $t('pages.icon-tile.previewColors') }}</span>
          </span>
          <span class="flex items-center gap-2.5 rounded-[8px] px-2 py-1">
            <IconTile :icon="Settings" variant="gray" />
            <span>{{ $t('pages.icon-tile.previewSettings') }}</span>
          </span>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icon-tile.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.icon-tile.bestPractice1') }}</li>
        <li>{{ $t('pages.icon-tile.bestPractice2') }}</li>
        <li>{{ $t('pages.icon-tile.bestPractice3') }}</li>
        <li>{{ $t('pages.icon-tile.bestPractice4') }}</li>
        <li>{{ $t('pages.icon-tile.bestPractice5') }}</li>
        <li>{{ $t('pages.icon-tile.bestPractice6') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
