<script setup lang="ts">
import { Settings02Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import {
  Note,
  NoteAction,
  NoteContent,
  NoteLabel,
} from '@/components/ui/note'

const { t } = useI18n()

const variants = ['default', 'success', 'error', 'warning', 'secondary', 'violet', 'cyan'] as const

const copy = computed(() => ({
  default: t('pages.note.variantDefault'),
  success: t('pages.note.variantSuccess'),
  error: t('pages.note.variantError'),
  warning: t('pages.note.variantWarning'),
  secondary: t('pages.note.variantSecondary'),
  violet: t('pages.note.variantViolet'),
  cyan: t('pages.note.variantCyan'),
}))

const defaultCode = `<Note>This deployment is using Fluid compute.</Note>`

const typesCode = `<Note>This deployment is using Fluid compute.</Note>
<Note variant="success">The domain is verified.</Note>
<Note variant="error">The last deploy failed.</Note>
<Note variant="warning">This action cannot be undone.</Note>`

const fillCode = `<Note fill>This deployment is using Fluid compute.</Note>
<Note variant="success" fill>The domain is verified.</Note>`

const sizesCode = `<Note size="small">Bandwidth resets on the first of the month.</Note>
<Note>Bandwidth resets on the first of the month.</Note>`

const labelCode = `<Note>
  <NoteLabel>Note:</NoteLabel>
  Changes apply to new deployments only.
</Note>`

const actionCode = `<Note>
  <NoteContent>Upgrade to raise the concurrency limit.</NoteContent>
  <NoteAction>
    <Button size="small" variant="secondary">Upgrade</Button>
  </NoteAction>
</Note>`

const iconCode = `<Note :icon="Settings02Icon">Open project settings to change the region.</Note>
<Note :icon="null">No icon. Use this in a packed sidebar row.</Note>`

const disabledCode = `<Note disabled fill>This hint is not available on the current plan.</Note>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.note.title')"
      :description="$t('pages.note.description')"
    />

    <DocsSection :title="$t('pages.note.default')" :description="$t('pages.note.defaultHint')">
      <DocsPreview :code="defaultCode">
        <div class="w-full max-w-xl">
          <Note>
            {{ $t('pages.note.previewDefault') }}
          </Note>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.note.types')" :description="$t('pages.note.typesHint')">
      <DocsPreview :code="typesCode">
        <div class="flex w-full max-w-xl flex-col gap-3">
          <Note
            v-for="variant in variants"
            :key="variant"
            :variant="variant"
          >
            {{ copy[variant] }}
          </Note>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.note.fill')" :description="$t('pages.note.fillHint')">
      <DocsPreview :code="fillCode">
        <div class="flex w-full max-w-xl flex-col gap-3">
          <Note fill>
            {{ $t('pages.note.variantDefault') }}
          </Note>
          <Note variant="success" fill>
            {{ $t('pages.note.variantSuccess') }}
          </Note>
          <Note variant="error" fill>
            {{ $t('pages.note.variantError') }}
          </Note>
          <Note variant="warning" fill>
            {{ $t('pages.note.variantWarning') }}
          </Note>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.note.sizes')" :description="$t('pages.note.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex w-full max-w-xl flex-col gap-3">
          <Note size="small">
            {{ $t('pages.note.previewBandwidth') }}
          </Note>
          <Note>
            {{ $t('pages.note.previewBandwidth') }}
          </Note>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.note.label')" :description="$t('pages.note.labelHint')">
      <DocsPreview :code="labelCode">
        <div class="flex w-full max-w-xl flex-col gap-3">
          <Note>
            <NoteLabel>{{ $t('pages.note.previewNoteLabel') }}</NoteLabel>
            {{ $t('pages.note.previewChangesApply') }}
          </Note>
          <Note variant="error">
            <NoteLabel>{{ $t('pages.note.previewErrorLabel') }}</NoteLabel>
            {{ $t('pages.note.previewBuildExceeded') }}
          </Note>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.note.action')" :description="$t('pages.note.actionHint')">
      <DocsPreview :code="actionCode">
        <div class="w-full max-w-xl">
          <Note>
            <NoteContent>
              {{ $t('pages.note.previewUpgradeCopy') }}
            </NoteContent>
            <NoteAction>
              <Button size="small" variant="secondary">
                {{ $t('pages.note.previewUpgrade') }}
              </Button>
            </NoteAction>
          </Note>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.note.icon')" :description="$t('pages.note.iconHint')">
      <DocsPreview :code="iconCode">
        <div class="flex w-full max-w-xl flex-col gap-3">
          <Note :icon="Settings02Icon">
            {{ $t('pages.note.previewOpenSettings') }}
          </Note>
          <Note :icon="null">
            {{ $t('pages.note.previewNoIcon') }}
          </Note>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.note.disabled')">
      <DocsPreview :code="disabledCode">
        <div class="w-full max-w-xl">
          <Note disabled fill>
            {{ $t('pages.note.previewDisabled') }}
          </Note>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.note.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.note.bestPractice1') }}</li>
        <li>
          <code class="font-mono">error</code>
          {{ $t('pages.note.bestPractice2a') }}
          <code class="font-mono">warning</code>
          {{ $t('pages.note.bestPractice2b') }}
          <code class="font-mono">secondary</code>
          {{ $t('pages.note.bestPractice2c') }}
        </li>
        <li>{{ $t('pages.note.bestPractice3') }}</li>
        <li>
          {{ $t('pages.note.bestPractice4a') }}
          <code class="font-mono">NoteAction</code>
          {{ $t('pages.note.bestPractice4b') }}
        </li>
        <li>
          {{ $t('pages.note.bestPractice5a') }}
          <code class="font-mono">:icon="null"</code>
          {{ $t('pages.note.bestPractice5b') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
