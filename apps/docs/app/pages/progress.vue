<script setup lang="ts">
import { Progress } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

const types = ['success', 'error', 'warning', 'secondary'] as const

const quotaColors = {
  0: 'var(--ds-blue-700)',
  40: 'var(--ds-amber-700)',
  80: 'var(--ds-red-700)',
}

const demoStops = computed(() => [
  { value: 25, tooltip: t('pages.progress.warmup') },
  { value: 75, tooltip: t('pages.progress.softLimit') },
])

const defaultCode = `<Progress :value="40" />
<Progress :model-value="80" />`

const typesCode = `<Progress :value="70" type="success" />
<Progress :value="70" type="error" />
<Progress :value="70" type="warning" />
<Progress :value="70" type="secondary" />`

const colorsCode = `<Progress
  :value="85"
  :colors="{
    0: 'var(--ds-blue-700)',
    40: 'var(--ds-amber-700)',
    80: 'var(--ds-red-700)',
  }"
/>`

const stopsCode = `<Progress
  :value="50"
  :stops="[
    { value: 25, tooltip: 'Warmup' },
    { value: 75, tooltip: 'Soft limit' },
  ]"
/>`

const sizeCode = `<Progress :value="60" :width="200" />
<Progress :value="60" :height="8" />`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.progress.title')"
      :description="$t('pages.progress.description')"
    />

    <DocsSection :title="$t('pages.progress.default')" :description="$t('pages.progress.defaultHint')">
      <DocsPreview :code="defaultCode">
        <div class="flex w-full max-w-md flex-col gap-4">
          <Progress :value="40" />
          <Progress :model-value="80" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.progress.types')" :description="$t('pages.progress.typesHint')">
      <DocsPreview :code="typesCode">
        <div class="flex w-full max-w-md flex-col gap-4">
          <Progress
            v-for="type in types"
            :key="type"
            :value="70"
            :type="type"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.progress.colors')" :description="$t('pages.progress.colorsHint')">
      <DocsPreview :code="colorsCode">
        <div class="flex w-full max-w-md flex-col gap-4">
          <Progress :value="25" :colors="quotaColors" />
          <Progress :value="55" :colors="quotaColors" />
          <Progress :value="85" :colors="quotaColors" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.progress.stops')" :description="$t('pages.progress.stopsHint')">
      <DocsPreview :code="stopsCode">
        <div class="w-full max-w-md">
          <Progress
            :value="50"
            :stops="demoStops"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.progress.size')" :description="$t('pages.progress.sizeHint')">
      <DocsPreview :code="sizeCode">
        <div class="flex w-full max-w-md flex-col items-start gap-4">
          <Progress :value="60" :width="200" />
          <Progress :value="60" :height="8" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.progress.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.progress.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.progress.bestPractice2" tag="span">
            <template #example>
              <code class="font-mono">873 MB / 10 GB</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.progress.bestPractice3" tag="span">
            <template #type>
              <code class="font-mono">type</code>
            </template>
            <template #colors>
              <code class="font-mono">colors</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.progress.bestPractice4') }}</li>
        <li>{{ $t('pages.progress.bestPractice5') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
