<script setup lang="ts">
import { SparklesIcon } from '@hugeicons/core-free-icons'
import { SearchInput } from '@/components/ui/search-input'

const query = ref('')
const cmdkQuery = ref('')
const loadingQuery = ref('Project A')
const prefixQuery = ref('')
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.search-input.title')"
      :description="$t('pages.search-input.description')"
    />

    <DocsSection :title="$t('pages.search-input.default')" :description="$t('pages.search-input.defaultHint')">
      <DocsPreview :code="`<SearchInput
  v-model='query'
  aria-label='Search'
  placeholder='Search projects…'
/>`">
        <SearchInput
          v-model="query"
          class="max-w-sm"
          :aria-label="$t('pages.search-input.ariaSearch')"
          :placeholder="$t('pages.search-input.placeholderSearchProjects')"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.search-input.sizes')" :description="$t('pages.search-input.sizesHint')">
      <DocsPreview :code="`<SearchInput size='small' placeholder='Search…' aria-label='Small' />
<SearchInput size='default' placeholder='Search…' aria-label='Default' />
<SearchInput size='large' placeholder='Search…' aria-label='Large' />`">
        <div class="flex w-full max-w-sm flex-col gap-3">
          <SearchInput
            size="small"
            :placeholder="$t('pages.search-input.placeholderSearch')"
            :aria-label="$t('pages.search-input.ariaSmallSearch')"
          />
          <SearchInput
            size="default"
            :placeholder="$t('pages.search-input.placeholderSearch')"
            :aria-label="$t('pages.search-input.ariaDefaultSearch')"
          />
          <SearchInput
            size="large"
            :placeholder="$t('pages.search-input.placeholderSearch')"
            :aria-label="$t('pages.search-input.ariaLargeSearch')"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.search-input.commandHint')" :description="$t('pages.search-input.commandHintDescription')">
      <DocsPreview :code="`<SearchInput
  v-model='cmdkQuery'
  cmdk
  aria-label='Search'
  placeholder='Search projects…'
/>`">
        <SearchInput
          v-model="cmdkQuery"
          cmdk
          class="max-w-sm"
          :aria-label="$t('pages.search-input.ariaSearch')"
          :placeholder="$t('pages.search-input.placeholderSearchProjects')"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.search-input.loading')" :description="$t('pages.search-input.loadingHint')">
      <DocsPreview :code="`<SearchInput
  v-model='loadingQuery'
  loading
  aria-label='Search'
  placeholder='Search projects…'
/>`">
        <SearchInput
          v-model="loadingQuery"
          loading
          class="max-w-sm"
          :aria-label="$t('pages.search-input.ariaSearch')"
          :placeholder="$t('pages.search-input.placeholderSearchProjects')"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.search-input.disabled')">
      <DocsPreview :code="`<SearchInput
  disabled
  cmdk
  aria-label='Search'
  placeholder='Search projects…'
/>`">
        <SearchInput
          disabled
          cmdk
          class="max-w-sm"
          :aria-label="$t('pages.search-input.ariaSearch')"
          :placeholder="$t('pages.search-input.placeholderSearchProjects')"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.search-input.customPrefix')" :description="$t('pages.search-input.customPrefixHint')">
      <DocsPreview :code="`<SearchInput v-model='prefixQuery' aria-label='Ask' placeholder='Ask the assistant…'>
  <template #prefix>
    <Icon :icon='SparklesIcon' :size='16' />
  </template>
</SearchInput>`">
        <SearchInput
          v-model="prefixQuery"
          class="max-w-sm"
          :aria-label="$t('pages.search-input.ariaAsk')"
          :placeholder="$t('pages.search-input.placeholderAskAssistant')"
        >
          <template #prefix>
            <Icon :icon="SparklesIcon" :size="16" />
          </template>
        </SearchInput>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.search-input.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.search-input.bp1" tag="span">
            <template #ariaLabel><code class="font-mono">aria-label</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.search-input.bp2" tag="span">
            <template #searchProjects><code class="font-mono">Search projects…</code></template>
            <template #search><code class="font-mono">Search</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.search-input.bp3" tag="span">
            <template #loading><code class="font-mono">loading</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.search-input.bp4" tag="span">
            <template #cmdk><code class="font-mono">cmdk</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.search-input.bp5') }}</li>
        <li>
          <i18n-t keypath="pages.search-input.bp6" tag="span">
            <template #input><code class="font-mono">Input</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
