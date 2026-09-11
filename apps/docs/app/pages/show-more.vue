<script setup lang="ts">
import { ShowMore } from '@/components/ui/show-more'

const { t } = useI18n()

const branches = [
  'main',
  'feat/billing-invoices',
  'feat/proxy-health',
  'fix/session-cookie',
  'chore/geist-docs',
  'feat/audit-log',
  'fix/rate-limit',
  'feat/team-invites',
]

const visibleCount = 4
const expanded = ref(false)
const staticExpanded = ref(true)
const noBorderExpanded = ref(false)
const labeledExpanded = ref(false)

const visibleBranches = computed(() =>
  expanded.value ? branches : branches.slice(0, visibleCount),
)
const hiddenCount = branches.length - visibleCount
const toggleLabel = computed(() =>
  labeledExpanded.value
    ? t('pages.show-more.showLess')
    : t('pages.show-more.showMore', { count: hiddenCount }),
)

const defaultCode = `<ul id="branches">
  <li v-for="name in visible" :key="name">{{ name }}</li>
</ul>
<ShowMore
  :expanded="expanded"
  aria-controls="branches"
  @click="expanded = !expanded"
/>`

const customLabelCode = `<ShowMore :expanded="expanded" @click="expanded = !expanded">
  {{ expanded ? 'Show Less' : \`Show \${hiddenCount} More\` }}
</ShowMore>`

const expandedCode = '<ShowMore :expanded="true" />'
const noBorderCode = '<ShowMore no-border :expanded="expanded" @click="expanded = !expanded" />'
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.show-more.title')"
      :description="$t('pages.show-more.description')"
    />

    <DocsSection :title="$t('pages.show-more.default')" :description="$t('pages.show-more.defaultHint')">
      <DocsPreview :code="defaultCode">
        <div class="w-full max-w-sm">
          <ul
            id="branches"
            class="mb-3 space-y-1.5 text-[13px] leading-5 text-[var(--ds-gray-1000)]"
          >
            <li
              v-for="name in visibleBranches"
              :key="name"
              class="rounded-md border border-[var(--ds-gray-alpha-400)] px-3 py-1.5"
            >
              {{ name }}
            </li>
          </ul>
          <ShowMore
            :expanded="expanded"
            aria-controls="branches"
            @click="expanded = !expanded"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.show-more.expanded')" :description="$t('pages.show-more.expandedHint')">
      <DocsPreview :code="expandedCode">
        <div class="w-full max-w-sm">
          <ShowMore :expanded="staticExpanded" @click="staticExpanded = !staticExpanded" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.show-more.noBorder')" :description="$t('pages.show-more.noBorderHint')">
      <DocsPreview :code="noBorderCode">
        <div class="w-full max-w-sm">
          <ShowMore
            no-border
            :expanded="noBorderExpanded"
            @click="noBorderExpanded = !noBorderExpanded"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.show-more.customLabel')" :description="$t('pages.show-more.customLabelHint')">
      <DocsPreview :code="customLabelCode">
        <div class="w-full max-w-sm">
          <ShowMore :expanded="labeledExpanded" @click="labeledExpanded = !labeledExpanded">
            {{ toggleLabel }}
          </ShowMore>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.show-more.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.show-more.practice1') }}</li>
        <li>{{ $t('pages.show-more.practice2') }}</li>
        <li>
          {{ $t('pages.show-more.practice3Before') }}<code class="font-mono">{{ $t('pages.show-more.practice3ShowMore') }}</code>{{ $t('pages.show-more.practice3Middle') }}<code class="font-mono">{{ $t('pages.show-more.practice3ShowLess') }}</code>{{ $t('pages.show-more.practice3After') }}
        </li>
        <li>{{ $t('pages.show-more.practice4') }}</li>
        <li>{{ $t('pages.show-more.practice5') }}</li>
        <li>
          {{ $t('pages.show-more.practice6Before') }}<code class="font-mono">aria-controls</code>{{ $t('pages.show-more.practice6After') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
