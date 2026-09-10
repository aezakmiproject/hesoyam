<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const defaultCode = `<Label value="This is a label" />`

const withInputCode = `<Label
  html-for="email-address"
  value="Email Address"
  with-input
/>
<Input
  id="email-address"
  placeholder="name@example.com"
/>`

const casingCode = `<Label
  html-for="email-raw"
  value="Email address"
  bypass-casing
  with-input
/>
<Input
  id="email-raw"
  placeholder="name@example.com"
/>`

const slotCode = `<Label html-for="token" with-input>
  Access token
  <span class="text-[var(--ds-gray-900)]"> (optional)</span>
</Label>`

const onInputCode = `<Input label="Project Name" placeholder="my-awesome-project" />`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.label.title')"
      :description="$t('pages.label.description')"
    />

    <DocsSection :title="$t('pages.label.default')" :description="$t('pages.label.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Label :value="$t('pages.label.previewDefaultLabel')" />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.label.withInput')" :description="$t('pages.label.withInputHint')">
      <DocsPreview :code="withInputCode">
        <div class="w-full max-w-md">
          <Label
            html-for="email-address"
            :value="$t('pages.label.previewEmailAddress')"
            with-input
          />
          <Input
            id="email-address"
            placeholder="name@example.com"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.label.bypassCasing')" :description="$t('pages.label.bypassCasingHint')">
      <DocsPreview :code="casingCode">
        <div class="flex w-full max-w-md flex-col gap-6">
          <div>
            <Label
              html-for="email-titled"
              :value="$t('pages.label.previewEmailLower')"
              with-input
            />
            <Input
              id="email-titled"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <Label
              html-for="email-raw"
              :value="$t('pages.label.previewEmailBypass')"
              bypass-casing
              with-input
            />
            <Input
              id="email-raw"
              placeholder="name@example.com"
            />
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.label.slot')" :description="$t('pages.label.slotHint')">
      <DocsPreview :code="slotCode">
        <div class="w-full max-w-md">
          <Label html-for="token" with-input>
            {{ $t('pages.label.previewAccessToken') }}
            <span class="font-normal text-[var(--ds-gray-900)]">{{ $t('pages.label.previewOptional') }}</span>
          </Label>
          <Input id="token" placeholder="vercel_…" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.label.onInput')" :description="$t('pages.label.onInputHint')">
      <DocsPreview :code="onInputCode">
        <div class="w-full max-w-md">
          <Input :label="$t('pages.label.previewProjectName')" :placeholder="$t('pages.label.placeholderProject')" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.label.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.label.practiceVisibleLabel') }}</li>
        <li>
          <i18n-t keypath="pages.label.practiceHtmlFor" tag="span">
            <template #htmlFor><code class="font-mono">html-for</code></template>
            <template #id><code class="font-mono">id</code></template>
            <template #ariaLabelledby><code class="font-mono">aria-labelledby</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.label.practiceShortCopy') }}</li>
        <li>
          <i18n-t keypath="pages.label.practiceBypassCasing" tag="span">
            <template #bypassCasing><code class="font-mono">bypass-casing</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.label.practicePreferInput" tag="span">
            <template #input><code class="font-mono">Input</code></template>
            <template #label><code class="font-mono">label</code></template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
