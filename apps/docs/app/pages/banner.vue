<script setup lang="ts">
import { Banner } from '@/components/ui/banner'

const defaultCode = `<Banner :button="{ href: '/', content: 'Read more' }" class="p-4">
  <b>Big News</b> – New components finally available
</Banner>`

const plainCode = `<Banner class="p-4">
  Scheduled maintenance starts Friday at 18:00 UTC.
</Banner>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.banner.title')"
      :description="$t('pages.banner.description')"
    />

    <DocsSection :title="$t('pages.banner.default')" :description="$t('pages.banner.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Banner :button="{ href: '/', content: $t('pages.banner.previewReadMore') }" class="p-4">
          <b>{{ $t('pages.banner.previewDefaultLead') }}</b> – {{ $t('pages.banner.previewDefaultTail') }}
        </Banner>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.banner.withoutAction')" :description="$t('pages.banner.withoutActionHint')">
      <DocsPreview :code="plainCode">
        <Banner class="p-4">
          {{ $t('pages.banner.previewPlainMessage') }}
        </Banner>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.banner.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.banner.bestPractice1') }}</li>
        <li>{{ $t('pages.banner.bestPractice2') }}</li>
        <li>
          {{ $t('pages.banner.bestPractice3') }}
          <code class="font-mono">{{ $t('pages.banner.previewReadMore') }}</code>,
          <code class="font-mono">{{ $t('pages.banner.previewViewChangelog') }}</code>.
        </li>
        <li>
          {{ $t('pages.banner.bestPractice4a') }}
          <code class="font-mono">button.href</code>
          {{ $t('pages.banner.bestPractice4b') }}
          <code class="font-mono">button.onClick</code>
          {{ $t('pages.banner.bestPractice4c') }}
        </li>
        <li>{{ $t('pages.banner.bestPractice5') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
