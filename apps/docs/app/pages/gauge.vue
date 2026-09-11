<script setup lang="ts">
import { Gauge } from '@aezakmiproject/hesoyam'
import { Zap } from '@lucide/vue'

const sizes = ['tiny', 'small', 'medium', 'large'] as const

const pinkScale = {
  0: 'var(--ds-pink-100)',
  10: 'var(--ds-pink-200)',
  20: 'var(--ds-pink-300)',
  30: 'var(--ds-pink-400)',
  50: 'var(--ds-pink-500)',
  60: 'var(--ds-pink-600)',
  70: 'var(--ds-pink-700)',
  80: 'var(--ds-pink-800)',
  90: 'var(--ds-pink-900)',
  100: 'var(--ds-pink-1000)',
}

const sizesCode = `<Gauge size="tiny" :value="50" />
<Gauge size="small" :value="50" />
<Gauge size="medium" :value="50" />
<Gauge size="large" :value="50" />`

const valueCode = `<Gauge show-value size="tiny" :value="80" />
<Gauge show-value size="small" :value="80" />
<Gauge show-value size="medium" :value="80" />
<Gauge show-value size="large" :value="100" />`

const scaleCode = `<Gauge size="small" :value="14" />
<Gauge size="small" :value="34" />
<Gauge size="small" :value="68" />`

const rangeCode = `<Gauge
  size="small"
  :value="70"
  :colors="{
    0: 'var(--ds-pink-100)',
    50: 'var(--ds-pink-500)',
    100: 'var(--ds-pink-1000)',
  }"
/>`

const namedCode = `<Gauge
  size="medium"
  :value="50"
  :colors="{
    primary: 'var(--ds-blue-700)',
    secondary: 'var(--ds-blue-300)',
  }"
/>`

const arcCode = `<Gauge
  arc-priority="equal"
  show-value
  size="medium"
  :value="50"
  :colors="{
    primary: 'var(--ds-blue-700)',
    secondary: 'var(--ds-red-700)',
  }"
/>`

const indeterminateCode = `<Gauge indeterminate size="tiny" :value="25" />
<Gauge indeterminate size="small" :value="25" />
<Gauge indeterminate size="medium" :value="25" />
<Gauge indeterminate size="large" :value="25" />`

const overlayCode = `<Gauge size="medium" :value="72">
  <Icon :icon="Zap" :size="18" class="text-[var(--ds-gray-1000)]" />
</Gauge>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.gauge.title')"
      :description="$t('pages.gauge.description')"
    />

    <DocsSection :title="$t('pages.gauge.sizes')" :description="$t('pages.gauge.sizesHint')">
      <DocsPreview :code="sizesCode">
        <div class="flex flex-wrap items-center gap-8">
          <Gauge
            v-for="size in sizes"
            :key="size"
            :size="size"
            :value="50"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.gauge.value')" :description="$t('pages.gauge.valueHint')">
      <DocsPreview :code="valueCode">
        <div class="flex flex-wrap items-center gap-8">
          <Gauge show-value size="tiny" :value="80" />
          <Gauge show-value size="small" :value="80" />
          <Gauge show-value size="small" :value="100" />
          <Gauge show-value size="medium" :value="80" />
          <Gauge show-value size="medium" :value="100" />
          <Gauge show-value size="large" :value="80" />
          <Gauge show-value size="large" :value="100" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.gauge.defaultColorScale')" :description="$t('pages.gauge.defaultColorScaleHint')">
      <DocsPreview :code="scaleCode">
        <div class="flex flex-wrap items-center gap-8">
          <Gauge size="small" :value="14" />
          <Gauge size="small" :value="34" />
          <Gauge size="small" :value="68" />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.gauge.customColorRange')" :description="$t('pages.gauge.customColorRangeHint')">
      <DocsPreview :code="rangeCode">
        <div class="flex flex-wrap items-center gap-2">
          <Gauge
            v-for="value in [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
            :key="value"
            size="small"
            :value="value"
            :colors="pinkScale"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.gauge.namedColors')" :description="$t('pages.gauge.namedColorsHint')">
      <DocsPreview :code="namedCode">
        <Gauge
          size="medium"
          :value="50"
          :colors="{
            primary: 'var(--ds-blue-700)',
            secondary: 'var(--ds-blue-300)',
          }"
        />
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.gauge.arcPriority')" :description="$t('pages.gauge.arcPriorityHint')">
      <DocsPreview :code="arcCode">
        <div class="flex flex-wrap items-center gap-8">
          <Gauge
            arc-priority="primary"
            show-value
            size="medium"
            :value="50"
            :colors="{
              primary: 'var(--ds-blue-700)',
              secondary: 'var(--ds-red-700)',
            }"
          />
          <Gauge
            arc-priority="equal"
            show-value
            size="medium"
            :value="50"
            :colors="{
              primary: 'var(--ds-blue-700)',
              secondary: 'var(--ds-red-700)',
            }"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.gauge.indeterminate')" :description="$t('pages.gauge.indeterminateHint')">
      <DocsPreview :code="indeterminateCode">
        <div class="flex flex-wrap items-center gap-8">
          <Gauge
            v-for="size in sizes"
            :key="`ind-${size}`"
            indeterminate
            :size="size"
            :value="25"
          />
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.gauge.overlay')" :description="$t('pages.gauge.overlayHint')">
      <DocsPreview :code="overlayCode">
        <Gauge size="medium" :value="72">
          <Icon
            :icon="Zap"
            :size="18"
            class="text-[var(--ds-gray-1000)]"
          />
        </Gauge>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.gauge.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.gauge.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.gauge.bestPractice2" tag="span">
            <template #arcPriorityEqual>
              <code class="font-mono">arc-priority="equal"</code>
            </template>
            <template #primary>
              <code class="font-mono">primary</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.gauge.bestPractice3" tag="span">
            <template #colors>
              <code class="font-mono">colors</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.gauge.bestPractice4" tag="span">
            <template #showValue>
              <code class="font-mono">show-value</code>
            </template>
            <template #percent>
              <code class="font-mono">%</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.gauge.bestPractice5" tag="span">
            <template #indeterminate>
              <code class="font-mono">indeterminate</code>
            </template>
            <template #calculatingUsage>
              {{ $t('pages.gauge.calculatingUsage') }}
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.gauge.bestPractice6" tag="span">
            <template #roleProgressbar>
              <code class="font-mono">role="progressbar"</code>
            </template>
          </i18n-t>
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
