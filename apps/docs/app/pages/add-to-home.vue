<script setup lang="ts">
import { AddToHome } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

const labels = computed(() => ({
  name: t('pages.add-to-home.previewName'),
  url: t('pages.add-to-home.previewUrl'),
  shareLabel: t('pages.add-to-home.share'),
  addToHomeLabel: t('pages.add-to-home.addToHome'),
  addLabel: t('pages.add-to-home.add'),
  cancelLabel: t('pages.add-to-home.cancel'),
  copyLabel: t('pages.add-to-home.copy'),
  moreLabel: t('pages.add-to-home.more'),
  bookmarkLabel: t('pages.add-to-home.bookmark'),
  installLabel: t('pages.add-to-home.install'),
  installActionLabel: t('pages.add-to-home.installAction'),
  openInLabel: t('pages.add-to-home.openIn'),
  desktopSiteLabel: t('pages.add-to-home.desktopSite'),
  ariaLabel: t('pages.add-to-home.aria', { name: t('pages.add-to-home.previewName') }),
}))

const sizes = ['small', 'medium', 'large'] as const

const defaultCode = `<AddToHome name="Hesoyam" url="hesoyam.dev" />`

const androidCode = `<AddToHome
  platform="android"
  name="Hesoyam"
  url="hesoyam.dev"
/>`

const customCode = `<AddToHome name="Hesoyam" url="hesoyam.dev">
  <template #icon>
    <img src="/icon.png" alt="" />
  </template>
</AddToHome>`

const sizesCode = `<AddToHome size="small" name="Hesoyam" />
<AddToHome size="medium" name="Hesoyam" />
<AddToHome size="large" name="Hesoyam" />`

const stepCode = `<AddToHome step="home" name="Hesoyam" url="hesoyam.dev" />`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.add-to-home.title')"
      :description="$t('pages.add-to-home.description')"
    />

    <DocsSection :title="$t('pages.add-to-home.default')" :description="$t('pages.add-to-home.defaultHint')">
      <DocsPreview :code="defaultCode">
        <AddToHome v-bind="labels" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.add-to-home.android')" :description="$t('pages.add-to-home.androidHint')">
      <DocsPreview :code="androidCode">
        <AddToHome
          v-bind="labels"
          platform="android"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.add-to-home.custom')" :description="$t('pages.add-to-home.customHint')">
      <DocsPreview :code="customCode">
        <AddToHome v-bind="labels">
          <template #icon>
            <span>H</span>
          </template>
        </AddToHome>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.add-to-home.sizes')" :description="$t('pages.add-to-home.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-wrap items-end justify-center gap-6">
          <AddToHome
            v-for="size in sizes"
            :key="size"
            v-bind="labels"
            :size="size"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.add-to-home.step')" :description="$t('pages.add-to-home.stepHint')">
      <DocsPreview :code="stepCode">
        <AddToHome
          v-bind="labels"
          step="home"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.add-to-home.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.add-to-home.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.add-to-home.bestPractice2" tag="span">
            <template #name>
              <code class="font-mono">name</code>
            </template>
            <template #url>
              <code class="font-mono">url</code>
            </template>
            <template #icon>
              <code class="font-mono">icon</code>
            </template>
            <template #iconSrc>
              <code class="font-mono">icon</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.add-to-home.bestPractice3" tag="span">
            <template #pauseOnHover>
              <code class="font-mono">pause-on-hover</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.add-to-home.bestPractice4" tag="span">
            <template #step>
              <code class="font-mono">step</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.add-to-home.bestPractice5" tag="span">
            <template #reducedMotion>
              <code class="font-mono">prefers-reduced-motion</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.add-to-home.bestPractice6') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
