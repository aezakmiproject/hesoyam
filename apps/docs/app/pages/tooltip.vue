<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/keyboard-input'
import { Tooltip } from '@/components/ui/tooltip'

const { t } = useI18n()

const positions = ['top', 'bottom', 'left', 'right'] as const

function positionLabel(position: typeof positions[number]) {
  return t(`pages.tooltip.position${position.charAt(0).toUpperCase()}${position.slice(1)}`)
}

const positionCode = `<Tooltip text="Applies to this project only">
  <span>Top</span>
</Tooltip>
<Tooltip position="bottom" text="Applies to this project only">
  <span>Bottom</span>
</Tooltip>`

const noDelayCode = `<Tooltip :delay="false" text="Applies to this project only">
  <span>Top</span>
</Tooltip>`

const boxAlignCode = `<Tooltip position="bottom" box-align="left" text="Applies to this project only">
  <span>Bottom / Left</span>
</Tooltip>`

const typeCode = `<Tooltip type="success" text="Build passed">
  <span>Success</span>
</Tooltip>
<Tooltip type="error" text="Deploy failed">
  <span>Error</span>
</Tooltip>`

const customTextCode = `<Tooltip>
  <span>Shortcut</span>
  <template #text>
    Search
    <Kbd small>/</Kbd>
  </template>
</Tooltip>`

const tipCode = `<Tooltip :tip="false" text="Applies to this project only">
  No arrow
</Tooltip>
<Tooltip :center="false" text="Retention is 14 days on the Hobby plan.">
  Left-aligned
</Tooltip>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.tooltip.title')"
      :description="$t('pages.tooltip.description')"
    />

    <DocsSection :title="$t('pages.tooltip.position')" :description="$t('pages.tooltip.positionHint')">
      <DocsPreview :code="positionCode">
        <div class="flex flex-wrap items-center justify-center gap-10 py-8">
          <Tooltip
            v-for="position in positions"
            :key="position"
            :position="position"
            :text="$t('pages.tooltip.appliesToProject')"
          >
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ positionLabel(position) }}</span>
          </Tooltip>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tooltip.noDelay')" :description="$t('pages.tooltip.noDelayHint')">
      <DocsPreview :code="noDelayCode">
        <div class="flex flex-wrap items-center justify-center gap-10 py-8">
          <Tooltip
            v-for="position in positions"
            :key="`nd-${position}`"
            :delay="false"
            :position="position"
            :text="$t('pages.tooltip.appliesToProject')"
          >
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ positionLabel(position) }}</span>
          </Tooltip>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tooltip.boxAlign')" :description="$t('pages.tooltip.boxAlignHint')">
      <DocsPreview :code="boxAlignCode">
        <div class="flex flex-wrap items-center justify-center gap-10 py-8">
          <Tooltip
            position="bottom"
            box-align="left"
            :text="$t('pages.tooltip.appliesToProject')"
          >
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.bottomLeft') }}</span>
          </Tooltip>
          <Tooltip position="bottom" :text="$t('pages.tooltip.appliesToProject')">
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.bottomCenter') }}</span>
          </Tooltip>
          <Tooltip
            position="bottom"
            box-align="right"
            :text="$t('pages.tooltip.appliesToProject')"
          >
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.bottomRight') }}</span>
          </Tooltip>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tooltip.type')">
      <DocsPreview :code="typeCode">
        <div class="flex flex-wrap items-center justify-center gap-10 py-8">
          <Tooltip type="success" :text="$t('pages.tooltip.buildPassed')">
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.success') }}</span>
          </Tooltip>
          <Tooltip type="error" position="bottom" :text="$t('pages.tooltip.deployFailed')">
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.error') }}</span>
          </Tooltip>
          <Tooltip type="warning" position="left" :text="$t('pages.tooltip.quotaAlmostGone')">
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.warning') }}</span>
          </Tooltip>
          <Tooltip type="violet" position="right" :text="$t('pages.tooltip.proFeature')">
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.violet') }}</span>
          </Tooltip>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tooltip.customText')" :description="$t('pages.tooltip.customTextHint')">
      <DocsPreview :code="customTextCode">
        <div class="flex flex-wrap items-center justify-center gap-10 py-8">
          <Tooltip position="bottom" :text="$t('pages.tooltip.appliesToProject')">
            <Button size="small" variant="secondary">{{ $t('pages.tooltip.project') }}</Button>
          </Tooltip>
          <Tooltip position="left" :text="$t('pages.tooltip.teamWideLimit')">
            <Badge size="small" variant="blue">{{ $t('pages.tooltip.limit') }}</Badge>
          </Tooltip>
          <Tooltip>
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.shortcut') }}</span>
            <template #text>
              {{ $t('pages.tooltip.search') }}
              <Kbd small>/</Kbd>
            </template>
          </Tooltip>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tooltip.tipAndAlignment')" :description="$t('pages.tooltip.tipAndAlignmentHint')">
      <DocsPreview :code="tipCode">
        <div class="flex flex-wrap items-center justify-center gap-10 py-8">
          <Tooltip :tip="false" :text="$t('pages.tooltip.appliesToProject')">
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.noArrow') }}</span>
          </Tooltip>
          <Tooltip :center="false" :text="$t('pages.tooltip.retentionHobby')">
            <span class="text-[13px] text-[var(--ds-gray-1000)]">{{ $t('pages.tooltip.leftAligned') }}</span>
          </Tooltip>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.tooltip.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.tooltip.bestPractice1') }}</li>
        <li>{{ $t('pages.tooltip.bestPractice2') }}</li>
        <li>{{ $t('pages.tooltip.bestPractice3') }}</li>
        <li>
          <i18n-t keypath="pages.tooltip.bestPractice4" tag="span">
            <template #ariaLabel>
              <code class="font-mono">aria-label</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.tooltip.bestPractice5') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
