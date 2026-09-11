<script setup lang="ts">
import { Button, CodeBlock } from '@aezakmiproject/hesoyam'
import { Copy, Globe, Plus, Search, Settings, Trash2 } from '@lucide/vue'

const samples = [
  { name: 'Search', icon: Search },
  { name: 'Plus', icon: Plus },
  { name: 'Copy', icon: Copy },
  { name: 'Settings', icon: Settings },
  { name: 'Trash2', icon: Trash2 },
  { name: 'Globe', icon: Globe },
]

const importCode = `import { Search } from '@lucide/vue'

// Preferred in product UI
<Icon :icon="Search" :size="14" />`

const sizesCode = `<Icon :icon="Search" :size="12" />
<Icon :icon="Search" :size="14" />
<Icon :icon="Search" :size="16" />
<Icon :icon="Search" :size="20" />`

const buttonCode = `<Button size="small">
  <template #prefix>
    <Icon :icon="Plus" :size="14" />
  </template>
  Add New
</Button>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader :title="$t('pages.icons.title')">
      <i18n-t keypath="pages.icons.description" tag="span">
        <template #core>
          <code class="font-mono text-[13px]">@lucide/vue</code>
        </template>
        <template #icon>
          <code class="font-mono text-[13px]">&lt;Icon&gt;</code>
        </template>
      </i18n-t>
    </DocsPageHeader>

    <DocsSection :title="$t('pages.icons.import')">
      <DocsCallout>
        <i18n-t keypath="pages.icons.importCallout" tag="span">
          <template #icon>
            <code class="font-mono">&lt;Icon&gt;</code>
          </template>
        </i18n-t>
      </DocsCallout>
      <CodeBlock language="vue" class="mt-3">{{ importCode }}</CodeBlock>
    </DocsSection>

    <DocsSection :title="$t('pages.icons.sizes')" :description="$t('pages.icons.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex items-center gap-4 text-[var(--ds-gray-1000)]">
          <Icon :icon="Search" :size="12" />
          <Icon :icon="Search" :size="14" />
          <Icon :icon="Search" :size="16" />
          <Icon :icon="Search" :size="20" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icons.inButton')">
      <DocsPreview :code="buttonCode">
        <Button size="small">
          <template #prefix>
            <Icon :icon="Plus" :size="14" />
          </template>
          {{ $t('pages.icons.addNew') }}
        </Button>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.icons.catalog')">
      <DocsCells inset :columns="3">
        <DocsCell
          v-for="item in samples"
          :key="item.name"
        >
          <div class="flex flex-col items-center gap-2">
            <Icon :icon="item.icon" :size="18" />
            <span class="font-mono text-[11px] text-[var(--ds-gray-900)]">{{ item.name }}</span>
          </div>
        </DocsCell>
      </DocsCells>
    </DocsSection>
  </div>
</template>
