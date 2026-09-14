<script setup lang="ts">
import { Spinner } from '@aezakmiproject/hesoyam'

const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const

const defaultCode = '<Spinner />'
const circleCode = '<Spinner circle />'
const sizesCode = `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
<Spinner size="2xl" />
<Spinner size="3xl" />
<Spinner size="4xl" />
<Spinner :size="28" />`
const colorsCode = `<Spinner />
<Spinner class="text-[var(--ds-red-700)]" />
<Spinner class="text-[var(--ds-green-700)]" />
<Spinner class="text-[var(--ds-blue-700)]" />`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.spinner.title')"
      :description="$t('pages.spinner.description')"
    />

    <DocsSection :title="$t('pages.spinner.default')" :description="$t('pages.spinner.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Spinner />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.spinner.circle')" :description="$t('pages.spinner.circleHint')">
      <DocsPreview :code="circleCode">
        <Spinner circle />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.spinner.sizes')" :description="$t('pages.spinner.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-wrap items-end gap-4">
          <Spinner
            v-for="size in sizes"
            :key="size"
            :size="size"
          />
          <Spinner :size="28" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.spinner.colors')" :description="$t('pages.spinner.colorsHint')">
      <DocsPreview :code="colorsCode">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-4">
            <span class="w-20 text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.spinner.colorDefault') }}</span>
            <Spinner />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-20 text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.spinner.colorRed') }}</span>
            <Spinner class="text-[var(--ds-red-700)]" />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-20 text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.spinner.colorGreen') }}</span>
            <Spinner class="text-[var(--ds-green-700)]" />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-20 text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.spinner.colorBlue') }}</span>
            <Spinner class="text-[var(--ds-blue-700)]" />
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.spinner.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.spinner.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.spinner.bestPractice2" tag="span">
            <template #loading>
              <code class="font-mono">loading</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.spinner.bestPractice3') }}</li>
        <li>{{ $t('pages.spinner.bestPractice4') }}</li>
        <li>{{ $t('pages.spinner.bestPractice5') }}</li>
        <li>
          <i18n-t keypath="pages.spinner.bestPractice6" tag="span">
            <template #ariaBusy>
              <code class="font-mono">aria-busy="true"</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
