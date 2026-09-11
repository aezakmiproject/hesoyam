<script setup lang="ts">
import { Button, ButtonLink, CustomButton } from '@aezakmiproject/hesoyam'
import { ArrowLeft, ArrowRight, ArrowUp } from '@lucide/vue'

const variants = ['default', 'secondary', 'tertiary', 'error', 'warning'] as const
const sizes = ['small', 'medium', 'large'] as const
const iconSizes = ['tiny', 'small', 'medium', 'large'] as const

const sizesCode = `<Button size="small">Upload</Button>
<Button size="medium">Upload</Button>
<Button size="large">Upload</Button>`

const variantsCode = `<Button variant="default">Upload</Button>
<Button variant="secondary">Upload</Button>
<Button variant="tertiary">Upload</Button>
<Button variant="error">Upload</Button>
<Button variant="warning">Upload</Button>`

const shapesCode = `<Button shape="square" size="small" svg-only aria-label="Upload">
  <Icon :icon="ArrowUp" :size="14" />
</Button>`

const prefixCode = `<Button size="small">
  <template #prefix>
    <Icon :icon="ArrowLeft" :size="14" />
  </template>
  Upload
</Button>`

const stateCode = `<Button size="small" loading>Upload</Button>
<Button size="small" disabled>Upload</Button>`

const linkCode = `<ButtonLink href="/" size="small">Sign Up</ButtonLink>`

const customCode = `<CustomButton
  :normal="{ foreground: '#fff', background: 'var(--ds-blue-700)', border: 'var(--ds-blue-700)' }"
  :hover="{ foreground: '#fff', background: '#0B7BFE', border: 'var(--ds-blue-700)' }"
  :active="{ foreground: '#fff', background: 'var(--ds-blue-700)', border: 'var(--ds-blue-700)' }"
>
  Upgrade to Pro
</CustomButton>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.button.title')"
      :description="$t('pages.button.description')"
    />

    <DocsSection :title="$t('pages.button.sizes')" :description="$t('pages.button.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-wrap items-center gap-3">
          <Button size="small">{{ $t('pages.button.upload') }}</Button>
          <Button size="medium">{{ $t('pages.button.upload') }}</Button>
          <Button size="large">{{ $t('pages.button.upload') }}</Button>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.button.variants')">
      <DocsPreview :code="variantsCode">
        <div class="flex flex-col gap-3">
          <div
            v-for="size in sizes"
            :key="size"
            class="flex flex-wrap items-center gap-3"
          >
            <Button
              v-for="variant in variants"
              :key="`${size}-${variant}`"
              :size="size"
              :variant="variant"
            >
              {{ $t('pages.button.upload') }}
            </Button>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.button.shapes')" :description="$t('pages.button.shapesHint')">
      <DocsPreview :code="shapesCode">
        <div class="flex flex-wrap items-center gap-3">
          <Button
            v-for="size in iconSizes"
            :key="`sq-${size}`"
            shape="square"
            :size="size"
            svg-only
            :aria-label="$t('pages.button.upload')"
          >
            <Icon :icon="ArrowUp" :size="size === 'tiny' ? 12 : 14" />
          </Button>
          <Button
            v-for="size in iconSizes"
            :key="`ci-${size}`"
            shape="circle"
            :size="size"
            svg-only
            :aria-label="$t('pages.button.upload')"
          >
            <Icon :icon="ArrowUp" :size="size === 'tiny' ? 12 : 14" />
          </Button>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.button.prefixAndSuffix')">
      <DocsPreview :code="prefixCode">
        <div class="flex flex-wrap items-center gap-3">
          <Button size="small">
            <template #prefix>
              <Icon :icon="ArrowLeft" :size="14" />
            </template>
            {{ $t('pages.button.upload') }}
          </Button>
          <Button size="small">
            {{ $t('pages.button.upload') }}
            <template #suffix>
              <Icon :icon="ArrowRight" :size="14" />
            </template>
          </Button>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.button.loadingAndDisabled')">
      <DocsPreview :code="stateCode">
        <div class="flex flex-wrap items-center gap-3">
          <Button size="small" loading>{{ $t('pages.button.upload') }}</Button>
          <Button size="small" disabled>{{ $t('pages.button.upload') }}</Button>
          <Button size="small" variant="secondary" disabled>{{ $t('pages.button.secondary') }}</Button>
          <Button size="small" variant="error" disabled>{{ $t('pages.button.error') }}</Button>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.button.link')">
      <DocsPreview :code="linkCode">
        <ButtonLink href="/" size="small">
          {{ $t('pages.button.signUp') }}
        </ButtonLink>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.button.custom')" :description="$t('pages.button.customHint')">
      <DocsPreview :code="customCode">
        <CustomButton
          :normal="{ foreground: '#fff', background: 'var(--ds-blue-700)', border: 'var(--ds-blue-700)' }"
          :hover="{ foreground: '#fff', background: '#0B7BFE', border: 'var(--ds-blue-700)' }"
          :active="{ foreground: '#fff', background: 'var(--ds-blue-700)', border: 'var(--ds-blue-700)' }"
        >
          {{ $t('pages.button.upgradeToPro') }}
        </CustomButton>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.button.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.button.bpStateVsLink') }}</li>
        <li>
          <i18n-t keypath="pages.button.bpVariants" tag="span">
            <template #primary><code class="font-mono">default</code></template>
            <template #supporting><code class="font-mono">secondary</code></template>
            <template #destructive><code class="font-mono">error</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.button.bpFormSubmit" tag="span">
            <template #submit><code class="font-mono">type-name="submit"</code></template>
            <template #variant><code class="font-mono">variant</code></template>
            <template #type><code class="font-mono">type</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.button.bpLoading" tag="span">
            <template #loading><code class="font-mono">loading</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.button.bpDisabled') }}</li>
        <li>
          <i18n-t keypath="pages.button.bpAliases" tag="span">
            <template #ghost><code class="font-mono">ghost</code></template>
            <template #outline><code class="font-mono">outline</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
