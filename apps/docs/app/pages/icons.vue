<script setup lang="ts">
import {
  Add01Icon,
  Copy01Icon,
  Delete02Icon,
  Search01Icon,
  Settings02Icon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import { Snippet } from '@/components/ui/snippet'

const samples = [
  { name: 'Search01Icon', icon: Search01Icon },
  { name: 'Add01Icon', icon: Add01Icon },
  { name: 'Copy01Icon', icon: Copy01Icon },
  { name: 'Settings02Icon', icon: Settings02Icon },
  { name: 'Delete02Icon', icon: Delete02Icon },
]

const sizesCode = `<Icon :icon="Search01Icon" :size="12" />
<Icon :icon="Search01Icon" :size="14" />
<Icon :icon="Search01Icon" :size="16" />
<Icon :icon="Search01Icon" :size="20" />`

const buttonCode = `<Button size="small">
  <template #prefix>
    <Icon :icon="Add01Icon" :size="14" />
  </template>
  Add New
</Button>`

const importLines = [
  "import { Search01Icon } from '@hugeicons/core-free-icons'",
  "import { HugeiconsIcon } from '@hugeicons/vue'",
  '',
  '// Preferred in product UI',
  '<Icon :icon="Search01Icon" :size="14" />',
]
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader :title="$t('pages.icons.title')">
      <i18n-t keypath="pages.icons.description" tag="span">
        <template #core>
          <code class="font-mono text-[13px]">@hugeicons/core-free-icons</code>
        </template>
        <template #icon>
          <code class="font-mono text-[13px]">&lt;Icon&gt;</code>
        </template>
        <template #hugeiconsIcon>
          <code class="font-mono text-[13px]">HugeiconsIcon</code>
        </template>
      </i18n-t>
    </DocsPageHeader>

    <DocsSection :title="$t('pages.icons.import')">
      <DocsCallout>
        <i18n-t keypath="pages.icons.importCallout" tag="span">
          <template #vue>
            <code class="font-mono">@hugeicons/vue</code>
          </template>
        </i18n-t>
      </DocsCallout>
      <Snippet
        class="mt-3"
        :prompt="false"
        :text="importLines"
      />
    </DocsSection>

    <DocsSection :title="$t('pages.icons.sizes')" :description="$t('pages.icons.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex items-center gap-4 text-[var(--ds-gray-1000)]">
          <Icon :icon="Search01Icon" :size="12" />
          <Icon :icon="Search01Icon" :size="14" />
          <Icon :icon="Search01Icon" :size="16" />
          <Icon :icon="Search01Icon" :size="20" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icons.inButton')">
      <DocsPreview :code="buttonCode">
        <Button size="small">
          <template #prefix>
            <Icon :icon="Add01Icon" :size="14" />
          </template>
          {{ $t('pages.icons.addNew') }}
        </Button>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icons.catalog')">
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <div
          v-for="item in samples"
          :key="item.name"
          class="flex flex-col items-center gap-2 rounded-[8px] border border-[var(--ds-gray-alpha-400)] px-3 py-4"
        >
          <Icon :icon="item.icon" :size="18" />
          <span class="font-mono text-[11px] text-[var(--ds-gray-900)]">{{ item.name }}</span>
        </div>
      </div>
    </DocsSection>
  </div>
</template>
