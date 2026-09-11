<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const widthCode = '<Skeleton :width="160" />'
const boxHeightCode = '<Skeleton :width="160" :box-height="42" />'
const wrapCode = `<Skeleton>
  <Button size="small">Hidden by skeleton</Button>
</Skeleton>
<Skeleton :show="false">
  <Button size="small">Not hidden by skeleton</Button>
</Skeleton>`
const fixedCode = `<Skeleton width="100%" :height="100" />
<Skeleton width="100%" :height="100" :show="false">
  <Button size="small">Ready</Button>
</Skeleton>`
const shapesCode = `<Skeleton pill :width="48" :height="48" />
<Skeleton rounded :width="48" :height="48" />
<Skeleton squared :width="48" :height="48" />`
const noAnimCode = '<Skeleton :animated="false" width="100%" :height="100" />'
const buttonCode = `<Skeleton :width="120" :height="32">
  <Button size="small">Save</Button>
</Skeleton>
<Skeleton button :width="120" :height="32">
  <Button size="small">Save</Button>
</Skeleton>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.skeleton.title')"
      :description="$t('pages.skeleton.description')"
    />

    <DocsSection :title="$t('pages.skeleton.width')">
      <DocsPreview :code="widthCode">
        <Skeleton :width="160" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.skeleton.boxHeight')" :description="$t('pages.skeleton.boxHeightHint')">
      <DocsPreview :code="boxHeightCode">
        <Skeleton :width="160" :box-height="42" />
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.skeleton.wrappingChildren')"
      :description="$t('pages.skeleton.wrappingChildrenHint')"
    >
      <DocsPreview :code="wrapCode">
        <div class="flex flex-col items-start gap-4">
          <Skeleton>
            <Button size="small">{{ $t('pages.skeleton.hiddenBySkeleton') }}</Button>
          </Skeleton>
          <Skeleton :show="false">
            <Button size="small">{{ $t('pages.skeleton.notHiddenBySkeleton') }}</Button>
          </Skeleton>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.skeleton.fixedSize')" :description="$t('pages.skeleton.fixedSizeHint')">
      <DocsPreview :code="fixedCode">
        <div class="flex w-full max-w-sm flex-col gap-4">
          <Skeleton width="100%" :height="100" />
          <Skeleton width="100%" :height="100" :show="false">
            <Button size="small">{{ $t('pages.skeleton.ready') }}</Button>
          </Skeleton>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.skeleton.shapes')" :description="$t('pages.skeleton.shapesHint')">
      <DocsPreview :code="shapesCode">
        <div class="flex flex-wrap items-center gap-4">
          <Skeleton pill :width="48" :height="48" />
          <Skeleton rounded :width="48" :height="48" />
          <Skeleton squared :width="48" :height="48" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.skeleton.noAnimation')">
      <DocsPreview :code="noAnimCode">
        <div class="w-full max-w-sm">
          <Skeleton :animated="false" width="100%" :height="100" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.skeleton.button')" :description="$t('pages.skeleton.buttonHint')">
      <DocsPreview :code="buttonCode">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <p class="text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.skeleton.withoutButton') }}</p>
            <Skeleton :width="120" :height="32">
              <Button size="small">{{ $t('pages.skeleton.save') }}</Button>
            </Skeleton>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-[13px] text-[var(--ds-gray-900)]">{{ $t('pages.skeleton.withButton') }}</p>
            <Skeleton button :width="120" :height="32">
              <Button size="small">{{ $t('pages.skeleton.save') }}</Button>
            </Skeleton>
          </div>
          <div class="flex flex-wrap gap-3">
            <Skeleton button>
              <Button size="small">{{ $t('pages.skeleton.save') }}</Button>
            </Skeleton>
            <Skeleton button>
              <Button size="small" variant="secondary">{{ $t('pages.skeleton.cancel') }}</Button>
            </Skeleton>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.skeleton.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.skeleton.bestPractice1" tag="span">
            <template #loading>
              <code class="font-mono">loading</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.skeleton.bestPractice2" tag="span">
            <template #width>
              <code class="font-mono">width</code>
            </template>
            <template #height>
              <code class="font-mono">height</code>
            </template>
            <template #boxHeight>
              <code class="font-mono">box-height</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.skeleton.bestPractice3" tag="span">
            <template #pill>
              <code class="font-mono">pill</code>
            </template>
            <template #squared>
              <code class="font-mono">squared</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.skeleton.bestPractice4" tag="span">
            <template #show>
              <code class="font-mono">show</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.skeleton.bestPractice5" tag="span">
            <template #ariaBusy>
              <code class="font-mono">aria-busy="true"</code>
            </template>
            <template #ariaLive>
              <code class="font-mono">aria-live="polite"</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.skeleton.bestPractice6" tag="span">
            <template #prefersReducedMotion>
              <code class="font-mono">prefers-reduced-motion</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
