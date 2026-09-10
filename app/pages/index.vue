<script setup lang="ts">
import {
  Add01Icon,
  Copy01Icon,
  File01Icon,
  Globe02Icon,
  Notification03Icon,
  Search01Icon,
  Settings02Icon,
  Share01Icon,
} from '@hugeicons/core-free-icons'
import { Snippet } from '@/components/ui/snippet'

const iconRow = [
  Search01Icon,
  Add01Icon,
  Copy01Icon,
  Settings02Icon,
  Globe02Icon,
  Notification03Icon,
  Share01Icon,
  File01Icon,
]

const hues = [
  '--ds-gray-600',
  '--ds-blue-700',
  '--ds-purple-700',
  '--ds-pink-700',
  '--ds-amber-700',
  '--ds-green-700',
  '--ds-teal-700',
]
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader :title="$t('geist.brand')">
      <i18n-t keypath="geist.index.intro" tag="span">
        <template #ui>
          <code class="font-mono text-[13px]">app/components/ui</code>
        </template>
      </i18n-t>
    </DocsPageHeader>

    <DocsCells>
      <DocsCell href="/colors">
        <div class="mb-10 flex h-28 items-end gap-4">
          <span
            v-for="hue in hues"
            :key="hue"
            class="w-2 rounded-full"
            :class="hue === '--ds-gray-600' ? 'h-16' : 'h-24'"
            :style="{ background: `var(${hue})` }"
          />
        </div>
        <p class="text-[16px] font-medium text-[var(--ds-gray-1000)]">{{ $t('geist.index.colors') }}</p>
        <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
          {{ $t('geist.index.colorsBody') }}
        </p>
      </DocsCell>

      <DocsCell href="/icons">
        <div class="mb-10 grid h-28 grid-cols-4 content-center gap-x-8 gap-y-5 text-[var(--ds-gray-900)]">
          <Icon
            v-for="(icon, index) in iconRow"
            :key="index"
            :icon="icon"
            :size="18"
          />
        </div>
        <p class="text-[16px] font-medium text-[var(--ds-gray-1000)]">{{ $t('geist.index.icons') }}</p>
        <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
          {{ $t('geist.index.iconsBody') }}
        </p>
      </DocsCell>

      <DocsCell href="/blocks">
        <div class="mb-10 flex h-28 flex-col justify-center gap-3">
          <div class="flex h-9 items-center gap-2 rounded-[6px] border border-[var(--ds-gray-alpha-400)] px-3">
            <span class="text-[13px] text-[var(--ds-gray-900)]">{{ $t('geist.index.label') }}</span>
            <span class="ml-auto text-[13px] text-[var(--ds-gray-900)]">{{ $t('geist.index.value') }}</span>
          </div>
          <div class="flex gap-2">
            <span class="inline-flex h-8 items-center rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] px-3 text-[13px]">{{ $t('geist.index.secondary') }}</span>
            <span class="flex h-8 min-w-0 flex-1 items-center rounded-[6px] border border-[var(--ds-gray-alpha-400)] px-3 text-[13px] text-[var(--ds-gray-900)]">{{ $t('geist.index.search') }}</span>
          </div>
        </div>
        <p class="text-[16px] font-medium text-[var(--ds-gray-1000)]">{{ $t('geist.index.blocks') }}</p>
        <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
          {{ $t('geist.index.blocksBody') }}
        </p>
      </DocsCell>

      <DocsCell href="/materials">
        <div class="mb-10 flex h-28 items-center gap-3">
          <span class="h-10 w-10 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]" />
          <span class="h-12 w-16 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]" />
          <span class="h-14 w-20 rounded-[12px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]" />
        </div>
        <p class="text-[16px] font-medium text-[var(--ds-gray-1000)]">{{ $t('geist.index.materials') }}</p>
        <p class="mt-1.5 text-[15px] leading-6 text-[var(--ds-gray-900)]">
          {{ $t('geist.index.materialsBody') }}
        </p>
      </DocsCell>
    </DocsCells>

    <DocsSection :title="$t('geist.index.import')" :description="$t('geist.index.importDescription')">
      <Snippet
        :prompt="false"
        :text="[
          `import { Button } from '@/components/ui/button'`,
          `import { SearchInput } from '@/components/ui/search-input'`,
          `import { Menu, MenuButton, MenuContainer, MenuItem } from '@/components/ui/menu'`,
        ]"
      />
    </DocsSection>

    <DocsSection :title="$t('geist.index.rules')">
      <ul class="max-w-2xl list-disc space-y-2.5 pl-5 text-[16px] leading-7 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="geist.index.rulesDark" tag="span">
            <template #bg><code class="font-mono">--ds-background-100</code></template>
            <template #hex><code class="font-mono">#000</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="geist.index.rulesBlocks" tag="span">
            <template #blocks>
              <NuxtLink to="/blocks" class="underline underline-offset-2">{{ $t('geist.index.blocks') }}</NuxtLink>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="geist.index.rulesApi" tag="span">
            <template #size><code class="font-mono">size="small|medium|large"</code></template>
            <template #variant><code class="font-mono">variant="default|secondary|tertiary|error|warning"</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="geist.index.rulesHeight" tag="span">
            <template #small><code class="font-mono">small</code></template>
            <template #default><code class="font-mono">default</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="geist.index.rulesBorders" tag="span">
            <template #border><code class="font-mono">--ds-gray-alpha-400</code></template>
            <template #primary><code class="font-mono">--ds-gray-1000</code></template>
            <template #secondary><code class="font-mono">--ds-gray-900</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="geist.index.rulesIcons" tag="span">
            <template #icons><code class="font-mono">@hugeicons/core-free-icons</code></template>
            <template #icon><code class="font-mono">&lt;Icon&gt;</code></template>
            <template #vue><code class="font-mono">@hugeicons/vue</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="geist.index.rulesAliases" tag="span">
            <template #ghost><code class="font-mono">ghost</code></template>
            <template #outline><code class="font-mono">outline</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('geist.index.rulesLeftovers') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
