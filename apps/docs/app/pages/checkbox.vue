<script setup lang="ts">
import { Checkbox } from '@aezakmiproject/hesoyam'

const option = ref(false)
const emails = ref(true)
const sms = ref(false)
const push = ref(true)

const selectedCount = computed(() => [emails.value, sms.value, push.value].filter(Boolean).length)
const allSelected = computed(() => selectedCount.value === 3)
const noneSelected = computed(() => selectedCount.value === 0)

function toggleAll(checked: boolean) {
  emails.value = checked
  sms.value = checked
  push.value = checked
}

const defaultCode = `<Checkbox :checked="option" @change="option = $event">
  Option 1
</Checkbox>`

const disabledCode = `<Checkbox disabled>Disabled</Checkbox>
<Checkbox checked disabled>Disabled Checked</Checkbox>
<Checkbox disabled indeterminate>Disabled Indeterminate</Checkbox>`

const indeterminateCode = `<Checkbox
  :checked="allSelected"
  :indeterminate="!allSelected && !noneSelected"
  @change="toggleAll"
>
  Notifications
</Checkbox>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.checkbox.title')"
      :description="$t('pages.checkbox.description')"
    />

    <DocsSection :title="$t('pages.checkbox.default')" :description="$t('pages.checkbox.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Checkbox :checked="option" @change="option = $event">
          {{ $t('pages.checkbox.previewOption1') }}
        </Checkbox>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.checkbox.disabled')">
      <DocsPreview :code="disabledCode">
        <div class="flex flex-col items-start gap-4">
          <Checkbox disabled>{{ $t('pages.checkbox.previewDisabled') }}</Checkbox>
          <Checkbox checked disabled>{{ $t('pages.checkbox.previewDisabledChecked') }}</Checkbox>
          <Checkbox disabled indeterminate>{{ $t('pages.checkbox.previewDisabledIndeterminate') }}</Checkbox>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.checkbox.indeterminate')" :description="$t('pages.checkbox.indeterminateHint')">
      <DocsPreview :code="indeterminateCode">
        <div class="flex flex-col items-start gap-4">
          <Checkbox
            :checked="allSelected"
            :indeterminate="!allSelected && !noneSelected"
            @change="toggleAll"
          >
            {{ $t('pages.checkbox.previewNotifications') }}
          </Checkbox>
          <div class="flex flex-col items-start gap-3 pl-6">
            <Checkbox v-model="emails">{{ $t('pages.checkbox.previewEmail') }}</Checkbox>
            <Checkbox v-model="sms">{{ $t('pages.checkbox.previewSms') }}</Checkbox>
            <Checkbox v-model="push">{{ $t('pages.checkbox.previewPush') }}</Checkbox>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.checkbox.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.checkbox.practiceMultiSelect') }}</li>
        <li>{{ $t('pages.checkbox.practiceIndeterminateBefore') }} <code class="font-mono">{{ $t('pages.checkbox.practiceIndeterminateExample') }}</code>.</li>
        <li>{{ $t('pages.checkbox.practiceRequiredAck') }}</li>
        <li>{{ $t('pages.checkbox.practiceDisable') }}</li>
        <li>{{ $t('pages.checkbox.practiceLabelBefore') }} <code class="font-mono">{{ $t('pages.checkbox.practiceAriaExample') }}</code>.</li>
        <li>{{ $t('pages.checkbox.practiceGroupLabelBefore') }} <code class="font-mono">{{ $t('pages.checkbox.practiceNotificationsExample') }}</code>. {{ $t('pages.checkbox.practiceGroupLabelAfter') }} <code class="font-mono">{{ $t('pages.checkbox.practiceAckExample') }}</code></li>
      </ul>
    </DocsSection>
  </div>
</template>
