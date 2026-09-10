<script setup lang="ts">
import { GitBranchIcon, GithubIcon, GitlabIcon } from '@hugeicons/core-free-icons'
import { h } from 'vue'
import Icon from '@/components/Icon.vue'
import { Tabs } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'

const { t } = useI18n()

const fruit = ref('apple')
const disabledAll = ref('apple')
const disabledOne = ref('apple')
const git = ref('github')
const secondary = ref('github')
const section = ref('overview')

const fruitTabs = computed(() => [
  { title: t('pages.tabs.apple'), value: 'apple' },
  { title: t('pages.tabs.orange'), value: 'orange' },
  { title: t('pages.tabs.mango'), value: 'mango' },
])

const lockedTabs = computed(() => [
  { title: t('pages.tabs.apple'), value: 'apple' },
  { title: t('pages.tabs.orange'), value: 'orange' },
  { title: t('pages.tabs.mango'), value: 'mango', disabled: true, tooltip: t('pages.tabs.mangoNotAllowed') },
])

const gitTabs = computed(() => [
  { title: t('pages.tabs.github'), value: 'github', icon: h(Icon, { icon: GithubIcon, size: 16 }) },
  { title: t('pages.tabs.gitlab'), value: 'gitlab', icon: h(Icon, { icon: GitlabIcon, size: 16 }) },
  { title: t('pages.tabs.branch'), value: 'branch', icon: h(Icon, { icon: GitBranchIcon, size: 16 }) },
])

const secondaryTabs = computed(() => [
  { title: t('pages.tabs.github'), value: 'github' },
  { title: t('pages.tabs.gitlab'), value: 'gitlab' },
  { title: t('pages.tabs.branch'), value: 'branch' },
])

const badgeTabs = computed(() => [
  { title: t('pages.tabs.overview'), value: 'overview' },
  { title: t('pages.tabs.logs'), value: 'logs', badge: 12 },
  { title: t('pages.tabs.settings'), value: 'settings' },
])

const defaultCode = `<Tabs
  v-model="fruit"
  :tabs="[
    { title: 'Apple', value: 'apple' },
    { title: 'Orange', value: 'orange' },
    { title: 'Mango', value: 'mango' },
  ]"
/>`

const secondaryCode = `<Tabs
  v-model="git"
  variant="secondary"
  :tabs="[
    { title: 'GitHub', value: 'github' },
    { title: 'GitLab', value: 'gitlab' },
    { title: 'Branch', value: 'branch' },
  ]"
/>`

const disabledCode = `<Tabs
  v-model="fruit"
  disabled
  :tabs="fruitTabs"
/>`

const lockedCode = `<Tabs
  v-model="fruit"
  :tabs="[
    { title: 'Apple', value: 'apple' },
    { title: 'Orange', value: 'orange' },
    { title: 'Mango', value: 'mango', disabled: true, tooltip: 'Mangos are not allowed.' },
  ]"
/>`

const iconCode = `import { h } from 'vue'
import Icon from '@/components/Icon.vue'
import { GithubIcon } from '@hugeicons/core-free-icons'

<Tabs
  v-model="git"
  :tabs="[
    { title: 'GitHub', value: 'github', icon: h(Icon, { icon: GithubIcon, size: 16 }) },
  ]"
/>`

const badgeCode = `<Tabs
  v-model="section"
  :tabs="[
    { title: 'Overview', value: 'overview' },
    { title: 'Logs', value: 'logs', badge: 12 },
    { title: 'Settings', value: 'settings' },
  ]"
/>`
</script>

<template>
  <TooltipProvider>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.tabs.title')"
      :description="$t('pages.tabs.description')"
    />

    <DocsSection :title="$t('pages.tabs.default')" :description="$t('pages.tabs.defaultDescription')">
      <DocsPreview :code="defaultCode">
        <div class="w-full">
          <Tabs v-model="fruit" :tabs="fruitTabs" />
          <p class="mt-4 text-[13px] leading-5 text-[var(--ds-gray-900)]">
            {{ $t('pages.tabs.showing', { value: fruit }) }}
          </p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tabs.secondary')" :description="$t('pages.tabs.secondaryDescription')">
      <DocsPreview :code="secondaryCode">
        <Tabs
          v-model="secondary"
          variant="secondary"
          :tabs="secondaryTabs"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tabs.disabled')" :description="$t('pages.tabs.disabledDescription')">
      <DocsPreview :code="disabledCode">
        <Tabs v-model="disabledAll" disabled :tabs="fruitTabs" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tabs.disableTab')" :description="$t('pages.tabs.disableTabDescription')">
      <DocsPreview :code="lockedCode">
        <Tabs v-model="disabledOne" :tabs="lockedTabs" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tabs.icons')" :description="$t('pages.tabs.iconsDescription')">
      <DocsPreview :code="iconCode">
        <Tabs v-model="git" :tabs="gitTabs" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tabs.badge')" :description="$t('pages.tabs.badgeDescription')">
      <DocsPreview :code="badgeCode">
        <Tabs v-model="section" :tabs="badgeTabs" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tabs.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          {{ $t('pages.tabs.bestPractice1a') }}<code class="font-mono">{{ $t('pages.tabs.overview') }}</code>{{ $t('pages.tabs.bestPractice1b') }}<code class="font-mono">{{ $t('pages.tabs.logs') }}</code>{{ $t('pages.tabs.bestPractice1c') }}<code class="font-mono">{{ $t('pages.tabs.settings') }}</code>{{ $t('pages.tabs.bestPractice1d') }}
        </li>
        <li>{{ $t('pages.tabs.bestPractice2') }}</li>
        <li>
          {{ $t('pages.tabs.bestPractice3a') }}<code class="font-mono">Switch</code>{{ $t('pages.tabs.bestPractice3b') }}
        </li>
        <li>{{ $t('pages.tabs.bestPractice4') }}</li>
        <li>
          <code class="font-mono">title</code>{{ $t('pages.tabs.bestPractice5b') }}<code class="font-mono">View Logs</code>{{ $t('pages.tabs.bestPractice5c') }}
        </li>
        <li>
          {{ $t('pages.tabs.bestPractice6a') }}<code class="font-mono">tooltip</code>{{ $t('pages.tabs.bestPractice6b') }}
        </li>
        <li>
          {{ $t('pages.tabs.bestPractice7a') }}<code class="font-mono">badge</code>{{ $t('pages.tabs.bestPractice7b') }}
        </li>
        <li>
          {{ $t('pages.tabs.bestPractice8a') }}<code class="font-mono">aria-label</code>{{ $t('pages.tabs.bestPractice8b') }}<code class="font-mono">Sections</code>{{ $t('pages.tabs.bestPractice8c') }}
        </li>
        <li>{{ $t('pages.tabs.bestPractice9') }}</li>
      </ul>
    </DocsSection>
  </div>
  </TooltipProvider>
</template>
