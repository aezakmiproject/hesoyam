<script setup lang="ts">
import { Badge, Marquee } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

const chips = computed(() => [
  { label: t('pages.marquee.chipEdge'), variant: 'blue' as const },
  { label: t('pages.marquee.chipServerless'), variant: 'green' as const },
  { label: t('pages.marquee.chipIsr'), variant: 'purple' as const },
  { label: t('pages.marquee.chipMiddleware'), variant: 'amber' as const },
  { label: t('pages.marquee.chipImages'), variant: 'pink' as const },
  { label: t('pages.marquee.chipAnalytics'), variant: 'teal' as const },
])

const defaultCode = `<Marquee>
  <Badge variant="blue">Edge</Badge>
  <Badge variant="green">Serverless</Badge>
</Marquee>`

const reverseCode = `<Marquee reverse>
  <Badge variant="blue">Edge</Badge>
</Marquee>`

const durationCode = `<Marquee :duration="20">
  <Badge variant="blue">Edge</Badge>
</Marquee>`

const pauseCode = `<Marquee :pause-on-hover="false">
  <Badge variant="blue">Edge</Badge>
</Marquee>`

const textCode = `<Marquee>
  <span>Deploy preview is live. Checks passed.</span>
</Marquee>`
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.marquee.title')"
      :description="$t('pages.marquee.description')"
    />

    <DocsSection :title="$t('pages.marquee.default')" :description="$t('pages.marquee.defaultHint')">
      <DocsPreview :code="defaultCode">
        <Marquee class="w-full">
          <Badge
            v-for="chip in chips"
            :key="chip.label"
            :variant="chip.variant"
          >
            {{ chip.label }}
          </Badge>
        </Marquee>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.marquee.reverse')" :description="$t('pages.marquee.reverseHint')">
      <DocsPreview :code="reverseCode">
        <Marquee reverse class="w-full">
          <Badge
            v-for="chip in chips"
            :key="`rev-${chip.label}`"
            :variant="chip.variant"
          >
            {{ chip.label }}
          </Badge>
        </Marquee>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.marquee.duration')" :description="$t('pages.marquee.durationHint')">
      <DocsPreview :code="durationCode">
        <Marquee :duration="20" class="w-full">
          <Badge
            v-for="chip in chips"
            :key="`fast-${chip.label}`"
            :variant="chip.variant"
          >
            {{ chip.label }}
          </Badge>
        </Marquee>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.marquee.pauseOnHover')" :description="$t('pages.marquee.pauseOnHoverHint')">
      <DocsPreview :code="pauseCode">
        <Marquee :pause-on-hover="false" class="w-full">
          <Badge
            v-for="chip in chips"
            :key="`run-${chip.label}`"
            :variant="chip.variant"
          >
            {{ chip.label }}
          </Badge>
        </Marquee>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.marquee.text')" :description="$t('pages.marquee.textHint')">
      <DocsPreview :code="textCode">
        <Marquee class="w-full text-[13px] text-[var(--ds-gray-1000)]">
          <span>{{ $t('pages.marquee.textCopy') }}</span>
        </Marquee>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.marquee.bestPractices')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.marquee.bestPractice1') }}</li>
        <li>
          <i18n-t keypath="pages.marquee.bestPractice2" tag="span">
            <template #pauseOnHover>
              <code class="font-mono">pause-on-hover</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.marquee.bestPractice3') }}</li>
        <li>
          <i18n-t keypath="pages.marquee.bestPractice4" tag="span">
            <template #duration>
              <code class="font-mono">duration</code>
            </template>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="pages.marquee.bestPractice5" tag="span">
            <template #reducedMotion>
              <code class="font-mono">prefers-reduced-motion</code>
            </template>
          </i18n-t>
        </li>
        <li>{{ $t('pages.marquee.bestPractice6') }}</li>
      </ul>
    </DocsSection>
  </div>
</template>
