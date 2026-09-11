<script setup lang="ts">
import { Button, Toast, useToasts } from '@aezakmiproject/hesoyam'
import { h } from 'vue'

const { t } = useI18n()
const { message, success, warning, error } = useToasts()

const samples = computed(() => [
  { id: 1, type: 'message' as const, text: t('pages.toast.previewDomainAdded') },
  { id: 2, type: 'success' as const, text: t('pages.toast.previewProjectArchived') },
  { id: 3, type: 'warning' as const, text: t('pages.toast.previewPoolNearCapacity') },
  { id: 4, type: 'error' as const, text: t('pages.toast.previewVerifyDomainError') },
])

const defaultCode = `const { message } = useToasts()

<Button size="small" @click="message({ text: 'Domain added' })">
  Show Toast
</Button>`

const typesCode = `success('Project archived')
warning('Pool is near capacity')
error('Couldn't verify domain. Try again.')`

const previewCode = `<Toast :toast="{ id: 1, type: 'success', text: 'Project archived' }" />`

const multiCode = `message({
  text: 'Warm pool restarted in IAD. Sticky sessions keep the same egress IP for the next 30 minutes.',
})`

const preserveCode = `message({
  text: 'Copy this token now. It will not be shown again.',
  preserve: true,
})`

const actionCode = `message({
  text: 'Invite sent to alex@example.com',
  action: 'View',
  onAction: () => {},
})`

const undoCode = `message({
  text: 'Endpoint removed',
  onUndoAction: () => {},
})`

const richCode = `message({
  text: h('span', [
    h('span', { class: 'font-medium' }, 'iad.proxy'),
    ' is live in IAD.',
  ]),
  preserve: true,
})`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.toast.title')"
      :description="$t('pages.toast.description')"
    />

    <DocsSection :title="$t('pages.toast.default')" :description="$t('pages.toast.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Button size="small" @click="message({ text: $t('pages.toast.previewDomainAdded') })">
          {{ $t('pages.toast.showToast') }}
        </Button>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toast.types')" :description="$t('pages.toast.typesHint')">
      <DocsPreview :code="typesCode">
        <div class="flex flex-wrap items-center gap-3">
          <Button size="small" @click="success($t('pages.toast.previewProjectArchived'))">
            {{ $t('pages.toast.success') }}
          </Button>
          <Button size="small" variant="secondary" @click="warning($t('pages.toast.previewPoolNearCapacity'))">
            {{ $t('pages.toast.warning') }}
          </Button>
          <Button size="small" variant="error" @click="error($t('pages.toast.previewVerifyDomainError'))">
            {{ $t('pages.toast.error') }}
          </Button>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toast.preview')" :description="$t('pages.toast.previewHint')">
      <DocsPreview :code="previewCode">
        <div class="flex w-full flex-col items-start gap-2">
          <Toast
            v-for="item in samples"
            :key="item.id"
            :toast="item"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toast.multiLine')">
      <DocsPreview :code="multiCode">
        <Button
          size="small"
          @click="message({
            text: $t('pages.toast.previewWarmPool'),
          })"
        >
          {{ $t('pages.toast.showToast') }}
        </Button>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toast.preserve')" :description="$t('pages.toast.preserveHint')">
      <DocsPreview :code="preserveCode">
        <Button
          size="small"
          @click="message({
            text: $t('pages.toast.previewCopyToken'),
            preserve: true,
          })"
        >
          {{ $t('pages.toast.showToast') }}
        </Button>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toast.action')" :description="$t('pages.toast.actionHint')">
      <DocsPreview :code="actionCode">
        <Button
          size="small"
          @click="message({
            text: $t('pages.toast.previewInviteSent'),
            action: $t('pages.toast.view'),
            onAction: () => {},
          })"
        >
          {{ $t('pages.toast.showToast') }}
        </Button>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toast.undo')" :description="$t('pages.toast.undoHint')">
      <DocsPreview :code="undoCode">
        <Button
          size="small"
          @click="message({
            text: $t('pages.toast.previewEndpointRemoved'),
            onUndoAction: () => {},
          })"
        >
          {{ $t('pages.toast.showToast') }}
        </Button>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toast.richText')" :description="$t('pages.toast.richTextHint')">
      <DocsPreview :code="richCode">
        <Button
          size="small"
          @click="message({
            text: h('span', [
              h('span', { class: 'font-medium' }, $t('pages.toast.previewIadProxy')),
              $t('pages.toast.previewIsLiveInIad'),
            ]),
            preserve: true,
          })"
        >
          {{ $t('pages.toast.showToast') }}
        </Button>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toast.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>
          {{ $t('pages.toast.bestPractice1a') }}
          <code class="font-mono">{{ $t('pages.toast.previewDomainAdded') }}</code>{{ $t('pages.toast.bestPractice1b') }}
          <code class="font-mono">{{ $t('pages.toast.previewProjectArchived') }}</code>{{ $t('pages.toast.bestPractice1c') }}
        </li>
        <li>{{ $t('pages.toast.bestPractice2') }}</li>
        <li>
          {{ $t('pages.toast.bestPractice3a') }}
          <code class="font-mono">message</code>{{ $t('pages.toast.bestPractice3b') }}
          <code class="font-mono">success</code>{{ $t('pages.toast.bestPractice3c') }}
          <code class="font-mono">warning</code>{{ $t('pages.toast.bestPractice3d') }}
        </li>
        <li>
          {{ $t('pages.toast.bestPractice4a') }}
          <code class="font-mono">preserve</code>{{ $t('pages.toast.bestPractice4b') }}
        </li>
        <li>{{ $t('pages.toast.bestPractice5') }}</li>
        <li>
          {{ $t('pages.toast.bestPractice6a') }}
          <code class="font-mono">{{ $t('pages.toast.previewBlobDeleted') }}</code>{{ $t('pages.toast.bestPractice6b') }}
        </li>
        <li>
          {{ $t('pages.toast.bestPractice7a') }}
          <code class="font-mono">{{ $t('pages.toast.previewVerifyDomainError') }}</code>
        </li>
        <li>
          {{ $t('pages.toast.bestPractice8a') }}
          <code class="font-mono">{{ $t('pages.toast.previewProjectDeleted') }}</code>{{ $t('pages.toast.bestPractice8b') }}
        </li>
        <li>
          {{ $t('pages.toast.bestPractice9a') }}
          <code class="font-mono">Undo</code>{{ $t('pages.toast.bestPractice9b') }}
        </li>
        <li>{{ $t('pages.toast.bestPractice10') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
