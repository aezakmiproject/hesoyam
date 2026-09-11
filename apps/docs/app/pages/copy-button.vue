<script setup lang="ts">
import { Button, CopyButton } from '@aezakmiproject/hesoyam'

const pinned = ref(false)

const preview = {
  default: `<CopyButton text-to-copy="pnpm add nuxt" label="Copy install command" />`,
  beside: `<div class="flex items-center gap-1">
  <code>dpl_7f3a91c2</code>
  <CopyButton text-to-copy="dpl_7f3a91c2" label="Copy deployment id" />
</div>`,
  disabled: `<CopyButton text-to-copy="sk_live_hidden" label="Copy secret" disabled />`,
  controlled: `<CopyButton
  text-to-copy="sk_live_example"
  label="Copy secret"
  :copied="pinned"
  @copy="pinned = true"
/>`,
}
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.copy-button.title')"
      :description="$t('pages.copy-button.description')"
    />

    <DocsSection :title="$t('pages.copy-button.default')">
      <DocsPreview :code="preview.default">
        <CopyButton
          text-to-copy="pnpm add nuxt"
          :label="$t('pages.copy-button.previewCopyInstall')"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.copy-button.beside')"
      :description="$t('pages.copy-button.besideHint')"
    >
      <DocsPreview :code="preview.beside">
        <div class="flex items-center gap-1">
          <code class="font-mono text-[13px] text-[var(--ds-gray-1000)]">dpl_7f3a91c2</code>
          <CopyButton
            text-to-copy="dpl_7f3a91c2"
            :label="$t('pages.copy-button.previewCopyDeploymentId')"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.copy-button.disabled')">
      <DocsPreview :code="preview.disabled">
        <CopyButton
          text-to-copy="sk_live_hidden"
          :label="$t('pages.copy-button.previewCopySecret')"
          disabled
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.copy-button.controlled')"
      :description="$t('pages.copy-button.controlledHint')"
    >
      <DocsPreview :code="preview.controlled">
        <div class="flex flex-wrap items-center gap-3">
          <CopyButton
            text-to-copy="sk_live_example"
            :label="$t('pages.copy-button.previewCopySecret')"
            :copied="pinned"
            @copy="pinned = true"
          />
          <Button size="small" variant="secondary" @click="pinned = false">
            {{ $t('pages.copy-button.previewReset') }}
          </Button>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.copy-button.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          <i18n-t keypath="pages.copy-button.bpPayload" tag="span">
            <template #textToCopy><code class="font-mono">textToCopy</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.copy-button.bpLabel" tag="span">
            <template #label><code class="font-mono">label</code></template>
            <template #ariaLabel><code class="font-mono">aria-label</code></template>
            <template #copy><code class="font-mono">Copy</code></template>
            <template #copyDeploymentId><code class="font-mono">Copy deployment id</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.copy-button.bpCopied" tag="span">
            <template #copied><code class="font-mono">copied</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.copy-button.bpDisable') }}</li>
        <li>
          <i18n-t keypath="pages.copy-button.bpRelated" tag="span">
            <template #snippet>Snippet</template>
            <template #codeBlock>Code Block</template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.copy-button.bpIcon') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
