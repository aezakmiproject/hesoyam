<script setup lang="ts">
import type { CalendarPreset, DateValue, RangeValue } from '@aezakmiproject/hesoyam'
import { Calendar } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

function startOfDay(value: Date) {
  const next = new Date(value)
  next.setHours(0, 0, 0, 0)
  return next
}

function endOfDay(value: Date) {
  const next = new Date(value)
  next.setHours(23, 59, 59, 999)
  return next
}

function daysAgo(days: number) {
  const next = new Date()
  next.setDate(next.getDate() - days)
  return startOfDay(next)
}

const now = new Date()
const minDate = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())
const maxDate = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate())
const tightMin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
const tightMax = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

const presets = computed<Record<string, CalendarPreset>>(() => ({
  'last-3-days': { text: t('pages.calendar.presetLast3Days'), start: daysAgo(3), end: endOfDay(now) },
  'last-7-days': { text: t('pages.calendar.presetLast7Days'), start: daysAgo(7), end: endOfDay(now) },
  'last-14-days': { text: t('pages.calendar.presetLast14Days'), start: daysAgo(14), end: endOfDay(now) },
  'last-month': { text: t('pages.calendar.presetLastMonth'), start: daysAgo(30), end: endOfDay(now) },
}))

const defaultRange = ref<RangeValue<DateValue>>()
const horizontalRange = ref<RangeValue<DateValue>>()
const smallRange = ref<RangeValue<DateValue>>()
const mediumRange = ref<RangeValue<DateValue>>()
const presetsRange = ref<RangeValue<DateValue>>()
const compactRange = ref<RangeValue<DateValue>>()
const stackedRange = ref<RangeValue<DateValue>>()
const presetDefaultRange = ref<RangeValue<DateValue>>()
const boundsRange = ref<RangeValue<DateValue>>()
const timezoneRange = ref<RangeValue<DateValue>>()

const defaultCode = `<Calendar
  allow-clear
  :value="range"
  :min-value="minDate"
  :max-value="maxDate"
  @change="range = $event"
/>`

const horizontalCode = `<Calendar
  allow-clear
  horizontal-layout
  :show-time-input="false"
  popover-alignment="center"
  :presets="presets"
  :value="range"
  @change="range = $event"
/>`

const sizesCode = `<Calendar size="small" allow-clear :value="range" @change="range = $event" />
<Calendar size="medium" allow-clear :value="range" @change="range = $event" />`

const presetsCode = `<Calendar
  :presets="presets"
  :value="range"
  @change="range = $event"
/>`

const compactCode = '<Calendar compact :presets="presets" :value="range" @change="range = $event" />'
const stackedCode = '<Calendar stacked :presets="presets" :value="range" @change="range = $event" />'

const presetIndexCode = `<Calendar
  stacked
  :preset-index="2"
  :presets="presets"
  :value="range"
  @change="range = $event"
/>`

const boundsCode = `<Calendar
  :min-value="tightMin"
  :max-value="tightMax"
  :value="range"
  @change="range = $event"
/>`

const timezoneCode = `<Calendar
  pinned-timezone="America/Los_Angeles"
  popover-alignment="center"
  :value="range"
  @change="range = $event"
/>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.calendar.title')"
      :description="$t('pages.calendar.description')"
    />

    <DocsSection :title="$t('pages.calendar.default')" :description="$t('pages.calendar.defaultHint')">
      <DocsPreview :code="defaultCode">
        <div class="flex min-h-[28rem] items-start justify-center">
          <Calendar
            allow-clear
            :value="defaultRange"
            :min-value="minDate"
            :max-value="maxDate"
            @change="defaultRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.horizontalLayout')" :description="$t('pages.calendar.horizontalLayoutHint')">
      <DocsPreview :code="horizontalCode">
        <div class="flex min-h-[28rem] items-start justify-center">
          <Calendar
            allow-clear
            horizontal-layout
            :show-time-input="false"
            popover-alignment="center"
            :presets="presets"
            :value="horizontalRange"
            @change="horizontalRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.sizes')" :description="$t('pages.calendar.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex min-h-[28rem] flex-wrap items-start justify-center gap-6">
          <Calendar
            size="small"
            allow-clear
            :min-value="minDate"
            :max-value="maxDate"
            :value="smallRange"
            @change="smallRange = $event"
          />
          <Calendar
            size="medium"
            allow-clear
            :min-value="minDate"
            :max-value="maxDate"
            :value="mediumRange"
            @change="mediumRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.presets')" :description="$t('pages.calendar.presetsHint')">
      <DocsPreview :code="presetsCode">
        <div class="flex min-h-[28rem] items-start justify-center">
          <Calendar
            :presets="presets"
            :value="presetsRange"
            @change="presetsRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.compact')" :description="$t('pages.calendar.compactHint')">
      <DocsPreview :code="compactCode">
        <div class="flex min-h-[28rem] items-start justify-center">
          <Calendar
            compact
            allow-clear
            :presets="presets"
            :value="compactRange"
            @change="compactRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.stacked')" :description="$t('pages.calendar.stackedHint')">
      <DocsPreview :code="stackedCode">
        <div class="flex min-h-[32rem] items-start justify-center">
          <Calendar
            stacked
            :presets="presets"
            :value="stackedRange"
            @change="stackedRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.presetDefault')" :description="$t('pages.calendar.presetDefaultHint')">
      <DocsPreview :code="presetIndexCode">
        <div class="flex min-h-[32rem] items-start justify-center">
          <Calendar
            stacked
            :preset-index="2"
            :presets="presets"
            :value="presetDefaultRange"
            @change="presetDefaultRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.minMaxDates')" :description="$t('pages.calendar.minMaxDatesHint')">
      <DocsPreview :code="boundsCode">
        <div class="flex min-h-[28rem] items-start justify-center">
          <Calendar
            :min-value="tightMin"
            :max-value="tightMax"
            :value="boundsRange"
            @change="boundsRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.pinnedTimezone')" :description="$t('pages.calendar.pinnedTimezoneHint')">
      <DocsPreview :code="timezoneCode">
        <div class="flex min-h-[28rem] items-start justify-center">
          <Calendar
            pinned-timezone="America/Los_Angeles"
            popover-alignment="center"
            :value="timezoneRange"
            @change="timezoneRange = $event"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.calendar.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.calendar.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.calendar.bestPractice2" tag="span">
            <template #preset7><code class="font-mono">{{ $t('pages.calendar.presetLast7Days') }}</code></template>
            <template #presetMonth><code class="font-mono">{{ $t('pages.calendar.presetLastMonth') }}</code></template>
            <template #stacked><code class="font-mono">stacked</code></template>
            <template #horizontal><code class="font-mono">horizontal-layout</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.calendar.bestPractice3" tag="span">
            <template #minValue><code class="font-mono">min-value</code></template>
            <template #maxValue><code class="font-mono">max-value</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.calendar.bestPractice4" tag="span">
            <template #value><code class="font-mono">value</code></template>
            <template #vModel><code class="font-mono">v-model:value</code></template>
            <template #change><code class="font-mono">@change</code></template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.calendar.bestPractice5" tag="span">
            <template #pinned><code class="font-mono">pinned-timezone</code></template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.calendar.bestPractice6') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
