<script setup lang="ts">
import { Button, ContextCardTrigger } from '@aezakmiproject/hesoyam'

const { t } = useI18n()

const sides = ['top', 'bottom', 'left', 'right'] as const
const aligns = ['start', 'center', 'end'] as const

function sideLabel(side: typeof sides[number]) {
  return t(`pages.context-card.side${side.charAt(0).toUpperCase()}${side.slice(1)}`)
}

function alignLabel(align: typeof aligns[number]) {
  return t(`pages.context-card.align${align.charAt(0).toUpperCase()}${align.slice(1)}`)
}

function alignContent(align: typeof aligns[number]) {
  return t('pages.context-card.alignContent', { align: alignLabel(align) })
}

const preview = {
  sides: `<ContextCardTrigger content="Production · Ready · 2m ago" side="top">
  Top
</ContextCardTrigger>`,
  align: `<ContextCardTrigger
  align="start"
  side="bottom"
  content="Start alignment sits on the leading edge."
  as-child
>
  <Button size="small">Start</Button>
</ContextCardTrigger>`,
  rich: `<ContextCardTrigger side="top">
  dpl_7f3a
  <template #content>
    <div class="space-y-1">
      <p class="font-medium">Production</p>
      <p class="text-[var(--ds-gray-900)]">Ready · 2m ago</p>
    </div>
  </template>
</ContextCardTrigger>`,
  render: `<ContextCardTrigger
  render="a"
  href="/"
  side="top"
  content="Project metadata for this workspace."
>
  acme-web
</ContextCardTrigger>`,
}
</script>

<template>
  <div class="space-y-12">
    <DocsPageHeader
      :title="$t('pages.context-card.title')"
      :description="$t('pages.context-card.description')"
    />

    <DocsSection
      :title="$t('pages.context-card.sidesTitle')"
      :description="$t('pages.context-card.sidesDescription')"
    >
      <DocsPreview :code="preview.sides">
        <div class="flex min-h-28 w-full items-center justify-around text-[13px] text-[var(--ds-gray-1000)]">
          <ContextCardTrigger
            v-for="side in sides"
            :key="side"
            :side="side"
            :content="$t('pages.context-card.demoMetadata')"
          >
            <span class="capitalize">{{ sideLabel(side) }}</span>
          </ContextCardTrigger>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.context-card.alignmentTitle')"
      :description="$t('pages.context-card.alignmentDescription')"
    >
      <DocsPreview :code="preview.align">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <ContextCardTrigger
            v-for="align in aligns"
            :key="align"
            :align="align"
            side="bottom"
            :content="alignContent(align)"
            as-child
          >
            <Button size="small">
              <span class="capitalize">{{ alignLabel(align) }}</span>
            </Button>
          </ContextCardTrigger>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.context-card.richContentTitle')"
      :description="$t('pages.context-card.richContentDescription')"
    >
      <DocsPreview :code="preview.rich">
        <ContextCardTrigger side="top" class="text-[13px] text-[var(--ds-gray-1000)] underline decoration-[var(--ds-gray-alpha-400)] underline-offset-2">
          dpl_7f3a
          <template #content>
            <div class="space-y-1">
              <p class="font-medium">
                {{ $t('pages.context-card.demoProduction') }}
              </p>
              <p class="text-[var(--ds-gray-900)]">
                {{ $t('pages.context-card.demoReady') }}
              </p>
              <p class="text-[var(--ds-gray-900)]">
                {{ $t('pages.context-card.demoOwner') }}
              </p>
            </div>
          </template>
        </ContextCardTrigger>
      </DocsPreview>
    </DocsSection>

    <DocsSection
      :title="$t('pages.context-card.customElementTitle')"
      :description="$t('pages.context-card.customElementDescription')"
    >
      <DocsPreview :code="preview.render">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <ContextCardTrigger
            render="a"
            href="/"
            side="top"
            :content="$t('pages.context-card.demoProjectMetadata')"
            class="text-[13px] text-[var(--ds-blue-700)] underline underline-offset-2"
          >
            acme-web
          </ContextCardTrigger>
          <ContextCardTrigger
            as-child
            side="top"
            :content="$t('pages.context-card.demoDefaultWrapperContent')"
          >
            <Button size="small" variant="secondary">
              {{ $t('pages.context-card.demoDefaultWrapperButton') }}
            </Button>
          </ContextCardTrigger>
        </div>
      </DocsPreview>
    </DocsSection>

    <DocsSection :title="$t('pages.context-card.bestPracticesTitle')">
      <ul class="max-w-2xl list-disc space-y-2 pl-5 text-[13px] leading-5 text-[var(--ds-gray-900)]">
        <li>{{ $t('pages.context-card.bestPractice1') }}</li>
        <li>
          {{ $t('pages.context-card.bestPractice2a') }}<code class="font-mono">ContextCard</code>{{ $t('pages.context-card.bestPractice2b') }}
        </li>
        <li>
          {{ $t('pages.context-card.bestPractice3a') }}<code class="font-mono">Label: value</code>{{ $t('pages.context-card.bestPractice3b') }}<code class="font-mono">N/A</code>.
        </li>
        <li>{{ $t('pages.context-card.bestPractice4') }}</li>
        <li>{{ $t('pages.context-card.bestPractice5') }}</li>
        <li>
          <code class="font-mono">ContextCardTrigger</code>{{ $t('pages.context-card.bestPractice6a') }}<code class="font-mono">ContextCard</code>{{ $t('pages.context-card.bestPractice6b') }}<code class="font-mono">ContextCardContent</code>{{ $t('pages.context-card.bestPractice6c') }}
        </li>
      </ul>
    </DocsSection>
  </div>
</template>
