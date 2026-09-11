<script setup lang="ts">
import { Toggle } from '@aezakmiproject/hesoyam'
import { Lock, LockOpen } from '@lucide/vue'

const firewall = ref(false)
const protection = ref(true)
const customColor = ref(false)

const defaultCode = `<Toggle v-model="firewall">Password Protection</Toggle>
<Toggle v-model="protection">Auto-Cancel Builds</Toggle>`

const sizesCode = `<Toggle aria-label="Password Protection"></Toggle>
<Toggle size="medium" aria-label="Password Protection"></Toggle>
<Toggle size="large" aria-label="Password Protection"></Toggle>`

const disabledCode = `<Toggle disabled aria-label="Password Protection"></Toggle>
<Toggle disabled :checked="true" aria-label="Password Protection"></Toggle>`

const colorCode = `<Toggle v-model="customColor" color="amber">
  <template #icon-unchecked>
    <Icon :icon="LockOpen" :size="8" />
  </template>
  <template #icon-checked>
    <Icon :icon="Lock" :size="8" />
  </template>
</Toggle>`

const labelCode = `<Toggle v-model="firewall">Password Protection</Toggle>
<Toggle v-model="firewall" direction="switch-first">Password Protection</Toggle>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.toggle.title')"
      :description="$t('pages.toggle.description')"
    />

    <DocsSection :title="$t('pages.toggle.default')" :description="$t('pages.toggle.defaultHint')">
      <DocsPreview :code="defaultCode">
        <div class="flex flex-col items-start gap-4">
          <Toggle v-model="firewall">{{ $t('pages.toggle.previewPasswordProtection') }}</Toggle>
          <Toggle v-model="protection">{{ $t('pages.toggle.previewAutoCancelBuilds') }}</Toggle>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toggle.sizes')" :description="$t('pages.toggle.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-wrap items-center gap-6">
          <Toggle :aria-label="$t('pages.toggle.ariaPasswordProtection')" />
          <Toggle size="medium" :aria-label="$t('pages.toggle.ariaPasswordProtection')" />
          <Toggle size="large" :aria-label="$t('pages.toggle.ariaPasswordProtection')" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toggle.disabled')">
      <DocsPreview :code="disabledCode">
        <div class="flex flex-wrap items-center gap-6">
          <Toggle disabled :aria-label="$t('pages.toggle.ariaPasswordProtection')" />
          <Toggle disabled :checked="true" :aria-label="$t('pages.toggle.ariaPasswordProtection')" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toggle.color')" :description="$t('pages.toggle.colorHint')">
      <DocsPreview :code="colorCode">
        <div class="flex flex-wrap items-center gap-6">
          <Toggle
            v-model="customColor"
            color="amber"
            :aria-label="$t('pages.toggle.ariaMaintenanceWindow')"
          >
            <template #icon-unchecked>
              <Icon :icon="LockOpen" :size="8" />
            </template>
            <template #icon-checked>
              <Icon :icon="Lock" :size="8" />
            </template>
          </Toggle>
          <Toggle
            v-model="customColor"
            color="red"
            :aria-label="$t('pages.toggle.ariaKillSwitch')"
          >
            <template #icon-unchecked>
              <Icon :icon="LockOpen" :size="8" />
            </template>
            <template #icon-checked>
              <Icon :icon="Lock" :size="8" />
            </template>
          </Toggle>
          <Toggle
            v-model="customColor"
            color="amber"
            size="large"
            :aria-label="$t('pages.toggle.ariaMaintenanceWindow')"
          >
            <template #icon-unchecked>
              <Icon :icon="LockOpen" :size="12" />
            </template>
            <template #icon-checked>
              <Icon :icon="Lock" :size="12" />
            </template>
          </Toggle>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toggle.label')" :description="$t('pages.toggle.labelHint')">
      <DocsPreview :code="labelCode">
        <div class="flex flex-col items-start gap-4">
          <div class="flex flex-wrap items-center gap-6">
            <Toggle v-model="firewall">{{ $t('pages.toggle.previewPasswordProtection') }}</Toggle>
            <Toggle v-model="firewall" direction="switch-first">
              {{ $t('pages.toggle.previewPasswordProtection') }}
            </Toggle>
          </div>
          <div class="flex flex-wrap items-center gap-6">
            <Toggle v-model="firewall" size="large">{{ $t('pages.toggle.previewPasswordProtection') }}</Toggle>
            <Toggle v-model="firewall" size="large" direction="switch-first">
              {{ $t('pages.toggle.previewPasswordProtection') }}
            </Toggle>
          </div>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.toggle.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.toggle.practiceOnOff') }}</li>
        <li>{{ $t('pages.toggle.practiceLabelBefore') }} <code class="font-mono">{{ $t('pages.toggle.practiceLabelExample') }}</code>, {{ $t('pages.toggle.practiceLabelAfter') }}</li>
        <li>{{ $t('pages.toggle.practiceAccessibleBefore') }} <code class="font-mono">{{ $t('pages.toggle.practiceAriaLabel') }}</code>{{ $t('pages.toggle.practiceAccessibleMiddle') }} <code class="font-mono">{{ $t('pages.toggle.practiceAriaLabelledby') }}</code>{{ $t('pages.toggle.practiceAccessibleAfter') }}</li>
        <li>{{ $t('pages.toggle.practiceDisable') }}</li>
        <li>{{ $t('pages.toggle.practiceLabelCasingBefore') }} <code class="font-mono">{{ $t('pages.toggle.practiceLabelCasingValue') }}</code> {{ $t('pages.toggle.practiceLabelCasingAfter') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
