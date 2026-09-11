<script setup lang="ts">
import { LoadingDots } from '@aezakmiproject/hesoyam'

const sizesCode = `<LoadingDots size="sm" />
<LoadingDots size="md" />
<LoadingDots size="lg" />
<LoadingDots :size="10" />`

const textCode = `<LoadingDots size="md">
  <span class="text-[13px] text-[var(--ds-gray-900)]">Loading</span>
</LoadingDots>`

const colorCode = `<LoadingDots class="text-[var(--ds-gray-1000)]" />
<LoadingDots class="text-[var(--ds-blue-700)]" />
<LoadingDots class="text-[var(--ds-red-700)]" />`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.loading-dots.title')"
      :description="$t('pages.loading-dots.description')"
    />

    <DocsSection :title="$t('pages.loading-dots.sizes')" :description="$t('pages.loading-dots.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-col items-start gap-6">
          <LoadingDots size="sm" />
          <LoadingDots size="md" />
          <LoadingDots size="lg" />
          <LoadingDots :size="10" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.loading-dots.withText')" :description="$t('pages.loading-dots.withTextHint')">
      <DocsPreview :code="textCode">
        <div class="flex flex-col items-start gap-4">
          <LoadingDots size="md">
            <span class="text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.loading-dots.loading') }}</span>
          </LoadingDots>
          <LoadingDots size="md">
            <span class="text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.loading-dots.saving') }}</span>
          </LoadingDots>
          <LoadingDots size="md">
            <span class="text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.loading-dots.deploying') }}</span>
          </LoadingDots>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.loading-dots.color')" :description="$t('pages.loading-dots.colorHint')">
      <DocsPreview :code="colorCode">
        <div class="flex flex-wrap items-center gap-6">
          <LoadingDots class="text-[var(--ds-gray-1000)]" />
          <LoadingDots class="text-[var(--ds-blue-700)]" />
          <LoadingDots class="text-[var(--ds-red-700)]" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.loading-dots.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.loading-dots.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.loading-dots.bestPractice2" tag="span">
            <template #loading>
              <code class="font-mono">loading</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.loading-dots.bestPractice3" tag="span">
            <template #saved>
              <code class="font-mono">Saved</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.loading-dots.bestPractice4" tag="span">
            <template #ariaLive>
              <code class="font-mono">aria-live="polite"</code>
            </template>
            <template #ariaLabel>
              <code class="font-mono">aria-label</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.loading-dots.bestPractice5" tag="span">
            <template #size>
              <code class="font-mono">size</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
