<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.separator.title')"
      :description="$t('pages.separator.description')"
    />

    <DocsSection :title="$t('pages.separator.horizontal')">
      <DocsPreview :code="`<div>
  <h3>Section 1</h3>
  <p>First block of copy.</p>
</div>
<Separator />
<div>
  <h3>Section 2</h3>
  <p>Second block of copy.</p>
</div>`">
        <div class="w-full max-w-md space-y-4">
          <div>
            <h3 class="text-[16px] font-medium text-[var(--ds-gray-1000)]">
              {{ $t('pages.separator.previewSection1') }}
            </h3>
            <p class="mt-1 text-[14px] leading-5 text-[var(--ds-gray-900)]">
              {{ $t('pages.separator.previewSection1Copy') }}
            </p>
          </div>
          <Separator />
          <div>
            <h3 class="text-[16px] font-medium text-[var(--ds-gray-1000)]">
              {{ $t('pages.separator.previewSection2') }}
            </h3>
            <p class="mt-1 text-[14px] leading-5 text-[var(--ds-gray-900)]">
              {{ $t('pages.separator.previewSection2Copy') }}
            </p>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.separator.vertical')" :description="$t('pages.separator.verticalHint')">
      <DocsPreview :code="`<div class='flex h-8 items-center gap-4'>
  <p>Home</p>
  <Separator orientation='vertical' />
  <p>About</p>
</div>`">
        <div class="flex h-8 items-center gap-4 text-[14px] text-[var(--ds-gray-1000)]">
          <p>{{ $t('pages.separator.previewHome') }}</p>
          <Separator orientation="vertical" />
          <p>{{ $t('pages.separator.previewAbout') }}</p>
          <Separator orientation="vertical" />
          <p>{{ $t('pages.separator.previewServices') }}</p>
          <Separator orientation="vertical" />
          <p>{{ $t('pages.separator.previewContact') }}</p>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.separator.orientation')">
      <DocsPreview :code="`<Separator orientation='horizontal' />
<Separator orientation='vertical' />`">
        <div class="flex w-full max-w-md flex-col gap-8">
          <div class="space-y-2">
            <p class="text-[13px] font-medium text-[var(--ds-gray-1000)]">
              {{ $t('pages.separator.horizontal') }}
            </p>
            <p class="text-[14px] text-[var(--ds-gray-900)]">
              {{ $t('pages.separator.previewContentAbove') }}
            </p>
            <Separator orientation="horizontal" />
            <p class="text-[14px] text-[var(--ds-gray-900)]">
              {{ $t('pages.separator.previewContentBelow') }}
            </p>
          </div>
          <div class="space-y-2">
            <p class="text-[13px] font-medium text-[var(--ds-gray-1000)]">
              {{ $t('pages.separator.vertical') }}
            </p>
            <div class="flex h-6 items-center gap-2 text-[14px] text-[var(--ds-gray-1000)]">
              <span>{{ $t('pages.separator.previewLeft') }}</span>
              <Separator orientation="vertical" />
              <span>{{ $t('pages.separator.previewCenter') }}</span>
              <Separator orientation="vertical" />
              <span>{{ $t('pages.separator.previewRight') }}</span>
            </div>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.separator.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.separator.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.separator.bestPractice2" tag="span">
            <template #decorative>
              <code class="font-mono">decorative</code>
            </template>
            <template #decorativeFalse>
              <code class="font-mono">:decorative="false"</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.separator.bestPractice3') }}</li>
        <li>
          <i18n-t keypath="pages.separator.bestPractice4" tag="span">
            <template #color>
              <code class="font-mono">--ds-gray-alpha-400</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.separator.bestPractice5') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
