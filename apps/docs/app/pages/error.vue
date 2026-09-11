<script setup lang="ts">
import { HesoyamError } from '@aezakmiproject/hesoyam'

const sizes = ['small', 'medium', 'large'] as const

const defaultCode = `<HesoyamError>This email address is already in use.</HesoyamError>`

const labelCode = `<HesoyamError label="Email Error">
  This email address is already in use.
</HesoyamError>`

const noLabelCode = `<HesoyamError :label="false">
  This email address is already in use.
</HesoyamError>`

const sizesCode = `<HesoyamError size="small">This email is in use.</HesoyamError>
<HesoyamError size="medium">This email is in use.</HesoyamError>
<HesoyamError size="large">This email is in use.</HesoyamError>`

const objectCode = `<HesoyamError
  :error="{
    message: 'The request failed.',
    action: 'Contact Us',
    link: 'https://vercel.com/contact',
  }"
/>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.error.title')"
      :description="$t('pages.error.description')"
    />

    <DocsSection :title="$t('pages.error.default')" :description="$t('pages.error.defaultHint')">
      <DocsPreview :code="defaultCode">
        <HesoyamError>
          {{ $t('pages.error.previewEmailInUse') }}
        </HesoyamError>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.error.customLabel')">
      <DocsPreview :code="labelCode">
        <HesoyamError :label="$t('pages.error.previewEmailError')">
          {{ $t('pages.error.previewEmailInUse') }}
        </HesoyamError>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.error.noLabel')" :description="$t('pages.error.noLabelHint')">
      <DocsPreview :code="noLabelCode">
        <HesoyamError :label="false">
          {{ $t('pages.error.previewEmailInUse') }}
        </HesoyamError>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.error.sizes')" :description="$t('pages.error.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-col gap-3">
          <HesoyamError
            v-for="size in sizes"
            :key="size"
            :size="size"
          >
            {{ $t('pages.error.previewEmailInUseShort') }}
          </HesoyamError>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.error.errorObject')" :description="$t('pages.error.errorObjectHint')">
      <DocsPreview :code="objectCode">
        <HesoyamError
          :error="{
            message: $t('pages.error.previewRequestFailed'),
            action: $t('pages.error.previewContactUs'),
            link: 'https://vercel.com/contact',
          }"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.error.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.error.bestPractice1" tag="span">
            <template #hesoyamError><code class="font-mono">HesoyamError</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.error.bestPractice2') }}</li>
        <li>
          <i18n-t keypath="pages.error.bestPractice3" tag="span">
            <template #example><code class="font-mono">Couldn't Load Deployments</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.error.bestPractice4" tag="span">
            <template #labelFalse><code class="font-mono">:label="false"</code></template>
            <template #label><code class="font-mono">label</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.error.bestPractice5" tag="span">
            <template #error><code class="font-mono">Error</code></template>
            <template #geistError><code class="font-mono">GeistError</code></template>
            <template #hesoyamError><code class="font-mono">HesoyamError</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.error.bestPractice6" tag="span">
            <template #ariaLive><code class="font-mono">aria-live="polite"</code></template>
            <template #roleAlert><code class="font-mono">role="alert"</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
